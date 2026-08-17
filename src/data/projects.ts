export type Project = {
  slug: string;
  name: string;
  category: string;
  domain: "backend" | "data" | "ai" | "infra";
  description: string;
  technologies: string[];
  github: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "ecommerce-cdc-lakehouse",
    name: "E-commerce CDC Lakehouse",
    category: "Data Engineering / Lakehouse",
    domain: "data",
    description:
      "A production-style data engineering platform that captures live changes from an OLTP e-commerce database through CDC, streams them through Kafka, lands them into Delta Lake Bronze/Silver/Gold layers, transforms them with dbt, and orchestrates the workflow with Airflow.",
    technologies: [
      "PostgreSQL",
      "Debezium",
      "Kafka",
      "Delta Lake",
      "dbt",
      "Airflow",
      "Kubernetes",
      "Jenkins",
    ],
    github: "https://github.com/Fatimshaikh/ecommerce-cdc-lakehouse",
    featured: true,
  },
  {
    slug: "flink-kafka-streaming",
    name: "Flink Kafka Streaming",
    category: "Real-Time Data Engineering",
    domain: "data",
    description:
      "Real-time streaming pipeline: Kafka plus an Apache Flink cluster, a WebSocket bridge, and an animated React dashboard. Fully documented with real debugging logs.",
    technologies: ["Kafka", "Apache Flink", "WebSocket", "React", "Docker"],
    github: "https://github.com/Fatimshaikh/flink-kafka-streaming",
    featured: true,
  },
  {
    slug: "finance-pii-scrubber",
    name: "Finance PII Scrubber",
    category: "Backend + AI",
    domain: "ai",
    description:
      "FastAPI service that scrubs PII from financial statements, persists structured data to PostgreSQL, and generates AI budgeting analysis with grounded chat via Groq.",
    technologies: ["FastAPI", "PostgreSQL", "Groq", "Python"],
    github: "https://github.com/Fatimshaikh/finance-pii-scrubber",
    featured: true,
  },
  {
    slug: "dimensional-warehouse-dbt",
    name: "Dimensional Warehouse + dbt",
    category: "Data Engineering",
    domain: "data",
    description:
      "Kimball-style star schema with SCD Type 2 history tracking, built with dbt and DuckDB, tested and run through CI via GitHub Actions.",
    technologies: ["dbt", "DuckDB", "GitHub Actions"],
    github: "https://github.com/Fatimshaikh/dimensional-warehouse-dbt",
    featured: false,
  },
  {
    slug: "crypto-mongo-dagster-pipeline",
    name: "Crypto Mongo Dagster Pipeline",
    category: "Data Engineering",
    domain: "data",
    description:
      "End-to-end data pipeline: CoinGecko API into Dagster (Bronze/Silver/Gold layers) into MongoDB Atlas, with pytest and GitHub Actions CI.",
    technologies: ["CoinGecko API", "Dagster", "MongoDB Atlas", "pytest", "GitHub Actions"],
    github: "https://github.com/Fatimshaikh/crypto-mongo-dagster-pipeline",
    featured: false,
  },
  {
    slug: "smart-order-system",
    name: "Smart Order Management System",
    category: "Backend Engineering",
    domain: "backend",
    description:
      "Backend order management system with a service-layer architecture: FastAPI and PostgreSQL for core persistence, Redis for caching, and RabbitMQ with a worker process for async background jobs.",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "RabbitMQ", "Docker"],
    github: "https://github.com/Fatimshaikh/smart-order-system",
    featured: false,
  },
  {
    slug: "ecommerce-api",
    name: "E-commerce API",
    category: "Backend Engineering",
    domain: "backend",
    description:
      "REST API with authentication, authorization and roles, products, carts, and orders, with protected routes and Swagger documentation.",
    technologies: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "bcrypt"],
    github: "https://github.com/Fatimshaikh/ecommerce-api",
    featured: false,
  },
  {
    slug: "django-multivendor-platform",
    name: "Django Multivendor Platform",
    category: "Backend / Full Stack",
    domain: "backend",
    description:
      "Multivendor e-commerce platform: vendors, products, shopping cart, and orders, with authentication, vendor/admin dashboards, and test coverage.",
    technologies: ["Django", "Python", "PostgreSQL"],
    github: "https://github.com/Fatimshaikh/django-multivendor-platform",
    featured: false,
  },
  {
    slug: "pyspark-log-pipeline",
    name: "PySpark Log Pipeline",
    category: "Data Engineering",
    domain: "data",
    description:
      "Bronze to Silver to Gold log data ETL pipeline built with PySpark, writing out to Parquet at each layer.",
    technologies: ["Python", "PySpark", "Parquet"],
    github: "https://github.com/Fatimshaikh/pyspark-log-pipeline",
    featured: false,
  },
  {
    slug: "mlops-end-to-end",
    name: "MLOps End-to-End",
    category: "Machine Learning / MLOps",
    domain: "ai",
    description:
      "An end-to-end MLOps workflow covering the full model lifecycle rather than a single training script.",
    technologies: ["Python", "MLOps"],
    github: "https://github.com/Fatimshaikh/mlops-end-to-end",
    featured: false,
  },
  {
    slug: "cloud-compliance-checker",
    name: "Cloud Compliance Checker",
    category: "Cloud / Infrastructure",
    domain: "infra",
    description:
      "A tool for checking cloud infrastructure configuration against compliance rules.",
    technologies: ["Python"],
    github: "https://github.com/Fatimshaikh/cloud-compliance-checker",
    featured: false,
  },
  {
    slug: "n8n-automation-projects",
    name: "n8n Automation Projects",
    category: "Automation",
    domain: "infra",
    description:
      "n8n workflow automation projects covering webhooks, AI integration, and Google Sheets.",
    technologies: ["n8n", "Webhooks", "Google Sheets API"],
    github: "https://github.com/Fatimshaikh/n8n-automation-projects",
    featured: false,
  },
];
