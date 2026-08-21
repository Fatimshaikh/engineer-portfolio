
export type CaseStudy = {
    problem: string;
    architecture: string[];
    howItWorks: string[];
    techDecisions?: { decision: string; reason: string }[];
    challenges?: { title: string; description: string }[];
    result: string;
    lessons?: string[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
    "ecommerce-cdc-lakehouse": {
        problem:
            "Most ETL projects move data in scheduled batch dumps. This project simulates a real e-commerce company's data infrastructure the way companies like Netflix, Uber, and Airbnb actually do it: an operational database takes live orders, and every change is captured, streamed, transformed, quality-checked, and made analytics-ready automatically, with zero manual steps once running.",
        architecture: [
            "PostgreSQL (logical replication enabled) — operational source database",
            "Debezium — captures every row-level change as a CDC event",
            "Apache Kafka — streams CDC events",
            "MinIO + Delta Lake — lands events into a Bronze / Silver / Gold medallion lakehouse",
            "dbt-core — transforms Silver into business-ready Gold models",
            "Apache Airflow — orchestrates the pipeline end-to-end with automated data quality gates",
            "Kubernetes + Jenkins — deployment and CI/CD",
        ],
        howItWorks: [
            "A traffic generator continuously writes orders into PostgreSQL, simulating live customer activity.",
            "Debezium captures every insert/update as a change event and publishes it to Kafka.",
            "A consumer writes raw events untouched into the Bronze layer in Delta Lake.",
            "dbt models clean and type the data into Silver, then aggregate it into business-ready Gold tables.",
            "Airflow orchestrates the full run on a schedule and runs a custom DuckDB-based data quality gate before data is considered trustworthy.",
        ],
        techDecisions: [
            {
                decision: "Debezium for CDC instead of periodic polling",
                reason:
                    "Log-based CDC captures every change with no polling lag and no missed updates between polls — the same pattern used in production streaming platforms.",
            },
            {
                decision: "Delta Lake over plain Parquet files",
                reason:
                    "ACID transactions and schema enforcement on the lakehouse layer, which plain object storage doesn't give you.",
            },
            {
                decision: "Custom DuckDB quality gate before Airflow considers a run successful",
                reason:
                    "Catches data issues (like orphaned foreign keys) automatically instead of letting bad data reach downstream tables silently.",
            },
        ],
        challenges: [
            {
                title: "Numeric columns arrived as base64-encoded garbage",
                description:
                    "Debezium's default Postgres connector encodes NUMERIC columns as raw bytes, which serialize to base64 strings in JSON instead of numbers. Fixed by setting decimal.handling.mode to double in the Debezium connector config.",
            },
            {
                title: "dbt silently used the wrong AWS credential chain",
                description:
                    "DuckDB's S3 secret system falls back through a credential discovery chain if no provider is explicitly set — it was quietly hitting AWS's EC2 metadata endpoint instead of using the MinIO keys provided. dbt debug still passed because it only tests a trivial connection, not an authenticated read. Fixed by adding an explicit provider: config to the DuckDB S3 secret block.",
            },
            {
                title: "Kafka repeatedly failed to restart after ungraceful shutdown",
                description:
                    "Zookeeper retains broker registration state across ungraceful shutdowns, so Kafka refused to start with a duplicate broker ID. Fixed with a full volume reset, and adopted a habit of shutting Kafka down gracefully to avoid the issue going forward.",
            },
            {
                title: "Kubernetes hit a real resource ceiling, not a config bug",
                description:
                    "Running the full stack — Kubernetes control plane, 5 services, plus Airflow's webserver, scheduler, and metadata DB — simultaneously exceeded available memory on a single laptop, causing Airflow to be OOM-killed on startup. The same Airflow setup runs fine under Docker Compose, confirming this was a local resource-scaling limit, not a defect in the Kubernetes manifests.",
            },
        ],
        result:
            "5 of 7 services (Postgres, MinIO, Zookeeper, Kafka, Debezium Connect) deploy and run cleanly on a local Kubernetes cluster, verified via kubectl. Airflow's manifests are complete and correct but hit a local memory ceiling when run alongside the rest of the stack on one machine. A Jenkinsfile defines the full CI/CD pipeline. The complete pipeline — CDC through to Gold tables with automated quality gates — runs end-to-end via Docker Compose.",
        lessons: [
            "Credential fallback chains can silently succeed against the wrong backend — always set an explicit provider.",
            "A passing connection test isn't the same as a passing authenticated read.",
            "A resource ceiling on one laptop running an entire distributed stack at once isn't the same as a design flaw — it's worth being able to tell the difference and explain it.",
        ],
    },

    "flink-kafka-streaming": {
        problem:
            "Earlier projects covered batch ETL and CDC — both fundamentally bounded problems. This project fills the remaining gap: true stateful stream processing over an unbounded stream, with windowed aggregations and a real Flink cluster deployment, not just Kafka used as a transport layer.",
        architecture: [
            "Python producer — simulates live e-commerce orders into Kafka",
            "Apache Kafka + Zookeeper — message broker",
            "Apache Flink (standalone JobManager/TaskManager cluster, custom Docker image with PyFlink) — windowed stream aggregation",
            "Kafka (second topic) — receives aggregated results",
            "FastAPI + WebSocket — bridges Kafka to the browser in real time",
        ],
        howItWorks: [
            "A Python producer sends randomized order events to Kafka at irregular intervals, mimicking real traffic.",
            "A PyFlink job, deployed on an actual Flink cluster, consumes the stream, groups orders by category, and computes 10-second tumbling window aggregations.",
            "Aggregated results are written back to a second Kafka topic.",
            "A FastAPI service consumes that topic in a background thread and broadcasts results instantly to any connected browser over WebSocket.",
        ],
        techDecisions: [
            {
                decision: "A real standalone Flink cluster instead of a local test runner",
                reason:
                    "Running an actual JobManager/TaskManager cluster (visible in Flink's own dashboard) demonstrates real distributed stream processing, not a simulated one.",
            },
            {
                decision: "Custom Docker image extending the official Flink image",
                reason:
                    "The official Flink image only includes Java, not Python — PyFlink jobs running inside the cluster need Python installed in the container itself.",
            },
            {
                decision: "Separate requirements-ci.txt for CI",
                reason:
                    "apache-flink depends on pemja, a native-compiled Java bridge that isn't needed to test transformation logic in isolation, and slows CI down with fragile native build steps.",
            },
        ],
        challenges: [
            {
                title: "Job submission hung indefinitely with no errors",
                description:
                    "Confirmed via ps aux that the process was alive, not crashed, and cross-referenced Flink's own logs to find the job never even reached the dispatcher. Root cause was a leftover Windows host path in add_jars() that doesn't exist inside the Linux container, which blocked indefinitely instead of failing fast. Fixed by removing add_jars() entirely and baking the Kafka connector JAR directly into the custom image.",
            },
            {
                title: "Kafka clients inside vs. outside Docker got redirected to unreachable addresses",
                description:
                    "Kafka's ADVERTISED_LISTENERS was set to a single address, so a client inside the Docker network got redirected to localhost — which inside that container means itself, not the real broker — causing an infinite reconnect loop. Fixed by configuring separate internal and external listeners.",
            },
            {
                title: "Dashboard showed $0 despite the backend actually working",
                description:
                    "Verified each hop of the pipeline independently (Kafka topic, then the consumer thread directly) before finding the real cause: uvicorn --reload was watching the entire project directory including node_modules, so unrelated file changes silently restarted the server and killed the background Kafka consumer thread without the browser knowing.",
            },
        ],
        result:
            "The full pipeline runs end-to-end locally: the Flink Dashboard shows the job actively running on the real cluster, and aggregated results are delivered live to the browser over WebSocket.",
        lessons: [
            "When a real-time pipeline 'shows nothing,' verify each hop independently rather than assuming the newest or most visible layer is at fault.",
            "A hanging process with no errors is a signal to check whether it's alive or silently stuck — not necessarily a networking problem.",
        ],
    },

    "finance-pii-scrubber": {
        problem:
            "Scrub sensitive identifiers from real-world bank and wallet statements across multiple file formats (PDF, DOCX, CSV, TXT) and inconsistent international formats, then generate AI budgeting insights that can actually be trusted rather than taken at face value.",
        architecture: [
            "File readers — parse PDF, DOCX, CSV, and TXT statements",
            "Regex + label-based PII scrubbing engine — removes sensitive identifiers",
            "PostgreSQL — persists scrubbed statements",
            "Groq (openai/gpt-oss-20b) — generates AI budgeting analysis",
            "Independent ground-truth calculator — verifies overall totals without relying on the AI",
            "Grounded chat — answers follow-up questions using the verified data",
        ],
        howItWorks: [
            "The user uploads a statement file; the scrubbing engine removes identifiers using regex for structured formats (IBAN, CNIC, SSN, card numbers) plus label-based detection for identifiers whose format varies by country but whose field labels are consistent.",
            "The scrubbed statement is analyzed by Groq's LLM for a budgeting breakdown.",
            "A separate, non-AI calculator independently computes ground-truth totals directly from the data.",
            "The chat feature always defers to these verified totals for overall figures, and explicitly flags AI-estimated category or merchant figures as unverified.",
        ],
        techDecisions: [
            {
                decision: "Label-based detection alongside regex",
                reason:
                    "Pure shape-based regex caused false positives on ordinary English words and false negatives on unlabeled international formats. Detecting fields by their label (e.g. 'IFSC:', 'Address:') proved more precise.",
            },
            {
                decision: "An independent, non-AI ground-truth totals calculator",
                reason:
                    "Small, fast LLMs can hallucinate financial figures. Rather than trusting the model's totals, a separate calculation verifies spend, receive, and net figures directly from the data, and the chat feature defers to it for anything load-bearing.",
            },
        ],
        challenges: [
            {
                title: "Shape-based regex alone wasn't precise enough",
                description:
                    "Pure pattern matching produced false positives on ordinary words and false negatives on international identifier formats that don't follow a consistent shape. Solved by adding label-based detection as a second signal alongside regex.",
            },
        ],
        result:
            "A working local FastAPI service: upload a statement, get scrubbed output, an AI budgeting breakdown paired with an independently verified totals box, and grounded follow-up chat.",
        lessons: [
            "Regex shape-matching alone is insufficient for PII that varies by country — pairing it with label-based detection catches what pure regex misses.",
            "LLM outputs shouldn't be trusted for figures that need to be exactly right — an independent verification layer is worth the extra engineering.",
        ],
    },

    "smart-order-system": {
        problem:
            "Build a production-style e-commerce order management backend with a scalable, modular architecture, rather than a single monolithic script.",
        architecture: [
            "FastAPI — REST APIs for user, product, and order management",
            "PostgreSQL + SQLAlchemy — relational data management",
            "Redis — caching for product data",
            "RabbitMQ — asynchronous order processing via worker services",
            "Docker + Docker Compose — containerized, consistent deployment",
        ],
        howItWorks: [
            "FastAPI exposes REST endpoints for users, products, and orders, built with a service-layer design.",
            "Product data is cached in Redis to reduce database load and speed up responses.",
            "Orders are handed off to RabbitMQ and processed asynchronously by worker services rather than blocking the request.",
            "The full stack runs via Docker Compose for consistent local deployment.",
        ],
        result:
            "A working backend with a modular, layered architecture: API layer, service layer, caching layer, and async processing layer, each with a clear responsibility.",
    },

    "ecommerce-api": {
        problem:
            "Build a secure e-commerce backend supporting user, product, cart, and order management with proper authentication and authorization.",
        architecture: [
            "FastAPI — REST API layer",
            "PostgreSQL + SQLAlchemy — database and ORM",
            "JWT authentication — token-based auth",
            "bcrypt — password hashing",
        ],
        howItWorks: [
            "Users authenticate and receive a JWT token, used to access protected routes.",
            "Role-based access control separates admin and regular user permissions.",
            "CRUD operations for products, carts, and orders run through SQLAlchemy against a PostgreSQL schema built for transactional workflows.",
            "Passwords are hashed with bcrypt before storage.",
        ],
        result:
            "A working REST API with authentication, authorization, and full CRUD for the core e-commerce entities, documented via Swagger UI.",
    },

    "django-multivendor-platform": {
        problem:
            "Build a multivendor e-commerce backend platform where multiple vendors can each manage their own products and sales within one system.",
        architecture: [
            "Django — MVC-style web framework",
            "PostgreSQL — relational database",
            "Django ORM — data access layer",
        ],
        howItWorks: [
            "Vendors and admins have separate role-based authentication and permissions.",
            "Vendors manage their own products through the Django ORM.",
            "Customers use shopping cart and order management functionality built on top of the same data models.",
            "Admin and vendor dashboards are separated by role.",
        ],
        result:
            "A working multivendor platform with vendor/admin role separation, product management, and order flow, built end-to-end with Django.",
    },

    "pyspark-log-pipeline": {
        problem:
            "Process and analyze large-scale log data at scale, using a layered architecture rather than a single ad-hoc script.",
        architecture: [
            "PySpark — distributed data processing",
            "Parquet — columnar storage format at each layer",
            "Bronze → Silver → Gold — layered ETL architecture",
        ],
        howItWorks: [
            "Bronze layer ingests raw log files and stores them as structured Parquet, preserving the original data.",
            "Silver layer parses timestamps, extracts log levels and messages, and removes duplicates and null records.",
            "Gold layer aggregates log metrics such as daily error counts and the most frequent error messages.",
        ],
        result:
            "A modular, layered log-processing pipeline that turns raw logs into aggregated, analysis-ready metrics using PySpark and Parquet.",
    },

    "mlops-end-to-end": {
        problem:
            "Cover the full lifecycle of a machine learning model — training, tracking, serving, and deployment — rather than just a training script.",
        architecture: [
            "FastAPI — serves prediction endpoints",
            "MLflow — experiment tracking, model versioning, and model registry",
            "Docker — containerized deployment",
            "GitHub Actions — CI/CD automation",
        ],
        howItWorks: [
            "Model experiments are tracked and versioned through MLflow's tracking and registry features.",
            "FastAPI serves the trained model behind prediction endpoints.",
            "A CI/CD pipeline via GitHub Actions automates the deployment process.",
            "The application is containerized with Docker for consistent deployment across environments.",
        ],
        result:
            "An end-to-end MLOps pipeline covering experiment tracking, model serving, and automated deployment, not just a standalone training script.",
    },

    "cloud-compliance-checker": {
        problem:
            "Automate the process of checking cloud infrastructure configuration against a recognized security compliance framework, rather than a manual audit.",
        architecture: [
            "Python — core automation logic",
            "NIST Cybersecurity Framework (CSF) — compliance framework mapped against",
            "pandas + openpyxl — report generation",
        ],
        howItWorks: [
            "Analyzes GCP IAM policies to detect least-privilege violations and overprivileged accounts.",
            "Checks encryption, firewall rules, and monitoring/alerting configuration against NIST CSF controls.",
            "Automates risk scoring and compliance gap identification across cloud resources.",
            "Generates a detailed Excel report with findings and remediation recommendations.",
        ],
        result:
            "A working compliance checker that maps real GCP infrastructure configuration against NIST CSF and produces an actionable Excel report.",
    },

    "n8n-automation-projects": {
        problem:
            "Automate real business processes — lead capture, follow-up communication, and reporting — end to end, combining workflow automation with an AI agent rather than static rules alone.",
        architecture: [
            "n8n — workflow automation engine",
            "Google Gemini AI — LLM-based response generation and decision-making",
            "Webhooks + REST APIs — event-driven triggers",
            "Gmail API + Google Sheets API — communication and data storage",
        ],
        howItWorks: [
            "A webhook receives a form submission and triggers the workflow.",
            "Lead data is saved to Google Sheets automatically.",
            "Google Gemini AI generates a personalized response based on the submitted data.",
            "Gmail API sends the AI-generated response automatically to the lead.",
        ],
        result:
            "A working automated lead-capture-to-response pipeline: webhook, Google Sheets, an LLM-based agent, and Gmail all connected end-to-end.",
    },

    "flyrank-llm-triage": {
        problem:
            "Build a support-message triage endpoint backed by a real LLM provider that is actually reliable in production — not just a happy-path demo. The model must never invent a category, never leak the prompt, and the system must survive bad responses, timeouts, and provider outages gracefully.",
        architecture: [
            "FastAPI - the triage endpoint",
            "Groq (llama-3.1-8b-instant) - OpenAI-compatible LLM provider",
            "Pydantic - strict output schema validation",
            "Repair-then-quarantine pipeline - handles invalid model output",
            "Cost and eval logging - logs/cost.jsonl and a scored eval set",
        ],
        howItWorks: [
            "A support message is sent to the endpoint and validated (empty or oversized text is rejected before any model call).",
            "The model classifies it into a strict category, urgency, and suggested team, returning structured JSON.",
            "If the model's output fails schema validation, one repair retry is attempted with the error included in the prompt.",
            "If the repair also fails, the request is quarantined - logged in full with the input, error, and prompt version - and the caller gets a clear 422, never a silent failure.",
            "Every successful call logs its cost: model, token counts, duration, and whether a repair was needed.",
        ],
        techDecisions: [
            {
                decision: "Manual retry policy instead of the SDK's built-in retries",
                reason:
                    "The SDK's own retries were disabled (max_retries=0) in favor of an explicit policy: retries only on timeout, 429, and 5xx, with exponential backoff plus jitter, capped at 3 attempts - so a bad API key (401) fails immediately instead of retrying a request that can never succeed.",
            },
            {
                decision: "A kill switch environment variable (LLM_ENABLED=false)",
                reason:
                    "Returns an immediate deterministic fallback with zero model calls - lets the system degrade safely if the provider needs to be disabled without a code change.",
            },
            {
                decision: "Three environment variables to swap providers entirely",
                reason:
                    "LLM_BASE_URL, LLM_API_KEY, and LLM_MODEL are the only provider-specific values - the rest of the code has no hard dependency on Groq specifically.",
            },
        ],
        challenges: [
            {
                title: "Proving the repair and quarantine paths actually work",
                description:
                    "Rather than trusting the happy path, both failure modes were deliberately forced: an invalid category outside the enum on the first attempt (confirmed the repair retry corrected it and returned 200), and a forced total validation failure on both attempts (confirmed a readable 422 and a full logged entry in logs/quarantine.jsonl).",
            },
            {
                title: "A bad API key surfaces as a generic 500",
                description:
                    "AuthenticationError is not currently special-cased, so a bad key returns a generic 500 instead of a distinct status code. Documented as a known gap and a clear next step rather than hidden.",
            },
            {
                title: "One eval case failed and the likely cause was traced, not guessed",
                description:
                    "A clear feature request (\"add CSV export\") was misclassified as \"other\". The prompt's few-shot examples didn't include an unambiguous feature-request case - the closest example was deliberately vague and correctly maps to \"other\" - so the model likely under-recognized the pattern. Fix identified: add one canonical feature-request example and re-run the eval.",
            },
        ],
        result:
            "Scored 7/8 (88%) on the eval set. Verified end-to-end: valid and invalid requests, the repair path, the quarantine path, and the kill switch all behave as designed. Cost measured directly from real logs: about $0.0000287 per call, projecting to roughly $8.60/month at 10,000 requests/day.",
        lessons: [
            "Testing only the happy path hides failure-handling bugs - deliberately forcing both failure paths was what actually proved the reliability claims true.",
            "Prompt example coverage directly affects real-world accuracy - a missing example category was the traceable root cause of the one eval failure, not a vague model limitation.",
        ],
    },

    "flyrank-capstone-widget-platform": {
        problem:
            "Build a backend platform that lets a business create an embeddable lead-capture widget, install it on any website with a single script tag, and safely accept submissions from the public internet - validated, spam-filtered, geo-enriched, and rate-limited, with zero paid infrastructure.",
        architecture: [
            "Node.js + Express (ES Modules) - API layer",
            "PostgreSQL 16 (Docker) - persistence",
            "Zod - request validation",
            "bcrypt + JWT - authentication",
            "express-rate-limit - abuse protection",
            "Layered structure: routes -> controllers -> services -> repositories",
        ],
        howItWorks: [
            "A widget owner registers, logs in, and creates a widget through JWT-authenticated endpoints - receiving an embeddable script snippet.",
            "A customer website embeds that one script tag, which fetches the widget's config from a CORS-enabled public endpoint and renders a form.",
            "A visitor submits the form. The request is Zod-validated, checked against a honeypot field for spam, geo-enriched through a two-provider fallback chain, and stored - all before a rate limit of 10 requests per minute per IP kicks in.",
            "A non-critical confirmation \"email\" is triggered (console-logged in this build) - and a failure here never blocks a successful submission.",
            "The widget owner views submissions and aggregated stats on a tenant-scoped dashboard.",
        ],
        techDecisions: [
            {
                decision: "A strict routes -> controllers -> services -> repositories layering",
                reason:
                    "Repositories are the only layer allowed to write raw SQL - meaning swapping Postgres for another database only touches that one layer, nothing else in the app changes.",
            },
            {
                decision: "A two-provider geo enrichment fallback chain with no API key required",
                reason:
                    "ip-api.com as primary, ipapi.co as fallback - if both fail, the submission is still stored rather than rejected, since geo data is enrichment, not a requirement.",
            },
            {
                decision: "A honeypot field instead of a CAPTCHA",
                reason:
                    "A hidden form field real users never fill in, but bots often do - simple, invisible spam filtering with no user friction.",
            },
        ],
        challenges: [
            {
                title: "Making sure a failing email provider never blocks a real submission",
                description:
                    "The confirmation email step is intentionally non-critical - what's tested is that its failure never prevents a 201 response to the visitor, not actual email deliverability. Verified explicitly and documented as a deliberate scope boundary.",
            },
            {
                title: "Proving tenant isolation actually holds",
                description:
                    "A widget owner requesting another tenant's widget by ID must get a 404, not the data. Covered directly in the automated test suite rather than assumed from the auth middleware alone.",
            },
            {
                title: "Proving the geo fallback chain fires under real conditions",
                description:
                    "Rather than trusting the fallback logic by inspection, the provider fallback was captured firing during the automated test run itself, with the evidence kept as part of the test documentation.",
            },
        ],
        result:
            "14 automated tests passing, covering registration, duplicate email rejection, input validation, login success and failure, widget CRUD, tenant isolation, CORS preflight handling, malformed and oversized payload rejection, and honeypot spam detection. Full manual evidence documented for every requirement, including rate-limit bursts and email failure-tolerance.",
        lessons: [
            "A layered architecture is only proven by actually swapping a dependency - moving from an in-memory repository to Postgres in an earlier assignment without touching the service layer validated the same principle used here.",
            "Designing for graceful degradation (geo enrichment, email confirmation) up front is simpler than retrofitting it - both were built to fail safely from the start rather than patched in later.",
        ],
    },
};

