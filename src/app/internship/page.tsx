import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { INTERNSHIP_TIMELINE, CAPSTONE } from "@/data/internship";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "FlyRank Internship - Fatima Shaikh",
  description:
    "A week-by-week backend and AI engineering internship track at FlyRank, from an in-memory API to a multi-tenant capstone platform.",
};

export default function InternshipPage() {
  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <SectionHeader
          eyebrow="FlyRank Internship"
          title="Backend & AI Engineering Track"
          description="Eight weeks, building forward each time: in-memory storage, real databases, authentication, containers, ethical scraping, LLM reliability engineering, and a full capstone platform."
        />

        <div className="relative mt-16">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {INTERNSHIP_TIMELINE.map((item, i) => (
              <div key={item.code} className="flex gap-5">
                <div className="flex w-10 shrink-0 justify-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface font-display text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-body text-xs font-medium uppercase tracking-wider text-accent">
                    {item.code}
                  </span>
                  <p className="mt-1 font-display text-lg font-semibold text-text-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-body text-sm text-text-secondary transition-colors hover:text-primary">
                      <GithubIcon size={14} />
                      View code
                    </a>
                    {item.caseStudySlug && (
                      <Link href={"/projects/" + item.caseStudySlug} className="inline-flex items-center gap-1 font-body text-sm font-medium text-primary transition-colors hover:text-signal">
                        Full case study
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-primary/30 bg-primary/5 p-8">
          <span className="font-body text-xs font-medium uppercase tracking-wider text-accent">
            {CAPSTONE.code}
          </span>
          <p className="mt-2 font-display text-2xl font-semibold text-text-primary">
            {CAPSTONE.title}
          </p>
          <p className="mt-3 font-body text-text-secondary">
            {CAPSTONE.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CAPSTONE.technologies.map((tech) => (
              <Tag key={tech} domain="accent">{tech}</Tag>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a href={CAPSTONE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-body text-sm text-text-secondary transition-colors hover:text-primary">
              <GithubIcon size={14} />
              View code
            </a>
            <Link href={"/projects/" + CAPSTONE.caseStudySlug} className="inline-flex items-center gap-1 font-body text-sm font-medium text-primary transition-colors hover:text-signal">
              Full case study
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
