import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ArrowRight } from "lucide-react";
import { EXPERIENCE } from "@/data/snapshot";

export const metadata = {
  title: "About — Fatima Shaikh",
  description:
    "Software engineer with a BS in Software Engineering, exploring backend, data engineering, and AI hands-on.",
};

const DOMAINS = [
  "Backend systems",
  "Data engineering",
  "ETL pipelines",
  "AI and AI agents",
  "Cloud-native development",
  "Containers and orchestration",
  "CI/CD",
  "System design",
];

const MINDSET_STEPS = [
  { step: "Build", detail: "Start with a real architecture, not a toy example." },
  { step: "Get stuck", detail: "Something breaks — a config, a connector, a dependency." },
  { step: "Debug", detail: "Isolate the layer, check the logs, verify each hop." },
  { step: "Fix", detail: "Apply the fix, understand why it worked." },
  { step: "Learn", detail: "Document it — the debugging is part of the record." },
  { step: "Ship", detail: "The system runs end-to-end." },
];

export default function AboutPage() {
  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <SectionHeader
          eyebrow="About"
          title="Fatima Shaikh"
          description="Software Engineer — Backend, Data Engineering, and AI"
        />

        <div className="mt-10 flex flex-col gap-6 font-body text-text-secondary">
          <p>
            I have a BS in Software Engineering, and since then I have deliberately
            explored multiple domains of engineering to gain real, hands-on experience
            with them rather than simply listing technologies on a resume.
          </p>
          <p>
            I&apos;m drawn to backend engineering, data engineering, and AI in equal
            measure — not one at the expense of the others. Building across all three
            has taught me how systems actually connect: how an API decision affects a
            downstream pipeline, how a data model shapes what an AI system can reliably
            do, and how infrastructure choices affect all of it in production.
          </p>
          <p>
            I intentionally explore different areas of engineering because
            understanding how systems work end-to-end makes me a stronger engineer.
            When something breaks — and in distributed systems, something always
            breaks — I keep debugging until it works, and I keep a record of what
            actually went wrong and why.
          </p>
          <p>
            I can also work with frontend technologies when a project requires it,
            but my core focus is on the systems underneath the interface.
          </p>
        </div>

        <div className="mt-14 rounded-lg border border-border bg-surface-alt p-8">
          <h2 className="font-display text-project-h font-semibold text-text-primary">
            Domains I&apos;ve worked hands-on across
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {DOMAINS.map((domain) => (
              <span
                key={domain}
                className="rounded-full border border-border bg-surface px-4 py-2 font-body text-sm text-text-primary"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-project-h font-semibold text-text-primary">
            Build. Get stuck. Debug. Fix. Learn. Ship.
          </h2>
          <p className="mt-3 font-body text-text-secondary">
            This is the actual cycle behind every project on this site — not a
            slogan. Real debugging logs from real projects are documented in the
            case studies.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {MINDSET_STEPS.map((item, i) => (
              <div
                key={item.step}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <span className="font-display text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-display font-semibold text-text-primary">
                  {item.step}
                </p>
                <p className="mt-1 font-body text-sm text-text-secondary">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <h2 className="font-display text-project-h font-semibold text-text-primary">
            Experience
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {EXPERIENCE.map((exp) => (
              <div key={exp.role + exp.company} className="border-l-2 border-accent pl-5">
                <p className="font-display font-semibold text-text-primary">
                  {exp.role} — {exp.company}
                </p>
                <p className="mt-1 font-body text-sm text-text-secondary">{exp.period}</p>
                <p className="mt-2 font-body text-sm text-text-secondary">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/projects" variant="primary" icon={ArrowRight}>
            View Projects
          </Button>
          <Button href="https://github.com/Fatimshaikh" variant="ghost">
            <GithubIcon size={16} />
            GitHub
          </Button>
        </div>
      </Container>
    </main>
  );
}
