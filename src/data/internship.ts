export type TimelineItem = {
  code: string;
  title: string;
  summary: string;
  technologies: string[];
  github: string;
  caseStudySlug?: string;
};

export const INTERNSHIP_TIMELINE: TimelineItem[] = [
  {
    code: "BE-01",
    title: "Task API",
    summary:
      "An in-memory CRUD task API built with FastAPI - the starting point before persistence entered the picture.",
    technologies: ["Python", "FastAPI"],
    github: "https://github.com/Fatimshaikh/flyrank-be01-crud-api",
  },
  {
    code: "BE-02",
    title: "Connecting to a Database",
    summary:
      "The same API rebuilt on SQLite with raw parameterized SQL, so data finally survives a server restart.",
    technologies: ["Python", "FastAPI", "SQLite"],
    github: "https://github.com/Fatimshaikh/flyrank-be02-sqlite-db",
  },
  {
    code: "BE-04",
    title: "Containerize with Postgres",
    summary:
      "The API moved into Docker alongside Postgres, proving a layered architecture by swapping storage without touching route or service logic.",
    technologies: ["Docker", "PostgreSQL", "FastAPI"],
    github: "https://github.com/Fatimshaikh/flyrank-be04-containerize",
  },
  {
    code: "BE-03",
    title: "Auth: Login & Protect",
    summary:
      "A real authentication flow using Supabase Auth - signup, login, logout, and JWT-protected routes.",
    technologies: ["FastAPI", "Supabase Auth", "JWT"],
    github: "https://github.com/Fatimshaikh/flyrank-be03-auth-login-protect",
  },
  {
    code: "BE-09",
    title: "The Polite Scraper",
    summary:
      "A rate-limited, cache-aware scraper built with explicit ethics: robots.txt checked, a real user agent, retry policy, and a deliberately broken URL to prove failure handling works.",
    technologies: ["Python", "requests", "BeautifulSoup", "Pydantic"],
    github: "https://github.com/Fatimshaikh/flyrank-be09-scraper",
  },
  {
    code: "BE-17",
    title: "LLM Triage Endpoint",
    summary:
      "A production-minded LLM reliability layer: schema validation, repair-then-quarantine handling, retry policy, a kill switch, and real per-call cost tracking.",
    technologies: ["FastAPI", "Groq", "Pydantic"],
    github: "https://github.com/Fatimshaikh/flyrank-be17-llm-endpoint",
    caseStudySlug: "flyrank-llm-triage",
  },
  {
    code: "BE-18",
    title: "AI Decision Flow",
    summary:
      "A visual workflow builder where each node is a real durable LLM decision step - React Flow for the canvas, Inngest for execution, Groq for the YES/NO calls.",
    technologies: ["Next.js", "React Flow", "Inngest", "Groq"],
    github: "https://github.com/Fatimshaikh/flyrank-be18-ai-flow",
  },
];

export const CAPSTONE = {
  code: "CAPSTONE",
  title: "Embeddable Widget & Lead-Capture Platform",
  summary:
    "A multi-tenant backend platform for embeddable lead-capture widgets - JWT auth, tenant isolation, spam filtering, geo enrichment with a fallback chain, rate limiting, and a submissions dashboard.",
  technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Zod", "Docker"],
  github: "https://github.com/Fatimshaikh/flyrank-capstone-widget-platform",
  caseStudySlug: "flyrank-capstone-widget-platform",
};
