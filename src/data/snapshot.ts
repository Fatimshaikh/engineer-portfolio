import { Server, Database, Sparkles, Container as ContainerIcon, Network } from "lucide-react";

export const SNAPSHOT_AREAS = [
  {
    title: "Backend Engineering",
    description:
      "REST APIs, service layers, auth, and data persistence — built with FastAPI, Django, and PostgreSQL.",
    icon: Server,
    domain: "default" as const,
  },
  {
    title: "Data Engineering",
    description:
      "Streaming and batch pipelines across Kafka, Flink, Spark, dbt, Airflow, and Dagster — Bronze to Gold.",
    icon: Database,
    domain: "data" as const,
  },
  {
    title: "AI Systems",
    description:
      "LLM-backed applications, grounded chat, and AI agents built on real production-style backends.",
    icon: Sparkles,
    domain: "data" as const,
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Containerized services orchestrated with Docker, Kubernetes, Jenkins, and GitHub Actions CI/CD.",
    icon: ContainerIcon,
    domain: "accent" as const,
  },
  {
    title: "System Design",
    description:
      "Designing systems end-to-end — from schema design to service boundaries to deployment topology.",
    icon: Network,
    domain: "accent" as const,
  },
];

export const EXPERIENCE = [
  {
    role: "Backend & AI Engineering Intern",
    company: "FlyRank",
    period: "July 2026 – August 2026",
    description:
      "Backend and AI engineering track, building hands-on fluency across backend systems and applied AI engineering.",
  },
  {
    role: "Web Developer Intern",
    company: "Symits",
    period: "2024",
    description:
      "Web development internship, building hands-on experience with real-world web projects.",
  },
];
