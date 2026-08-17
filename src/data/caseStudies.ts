
export type CaseStudy = {
    problem: string;
    architecture: string[];
    howItWorks: string[];
    techDecisions: { decision: string; reason: string }[];
    challenges: { title: string; description: string }[];
    result: string;
    lessons: string[];
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
};
