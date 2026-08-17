import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { CASE_STUDIES } from "@/data/caseStudies";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return PROJECTS.map(function (p) {
    return { slug: p.slug };
  });
}

export default async function ProjectDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = params.slug;
  const project = PROJECTS.find(function (p) {
    return p.slug === slug;
  });

  if (!project) {
    notFound();
  }

  const caseStudy = CASE_STUDIES[slug];
  const tagDomain =
    project.domain === "backend"
      ? "default"
      : project.domain === "infra"
        ? "accent"
        : "data";

  return (
    <main className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <Button href="/projects" variant="ghost" icon={ArrowLeft} className="mb-10">
          All Projects
        </Button>

        <Tag domain={tagDomain}>{project.category}</Tag>

        <h1 className="mt-4 font-display text-hero font-semibold leading-tight text-text-primary">
          {project.name}
        </h1>

        <p className="mt-4 font-body text-lg text-text-secondary">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map(function (tech) {
            return <Tag key={tech}>{tech}</Tag>;
          })}
        </div>


        <a href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 font-body text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
        >
          <GithubIcon size={16} />
          View on GitHub
        </a>

        {caseStudy ? (
          <div className="mt-14">
            <CaseStudySection title="The Problem">
              <p className="font-body text-text-secondary">{caseStudy.problem}</p>
            </CaseStudySection>

            <CaseStudySection title="The Architecture">
              <ul className="flex flex-col gap-2">
                {caseStudy.architecture.map(function (item, i) {
                  return (
                    <li key={i} className="font-body text-text-secondary">
                      <span className="mr-2 text-accent">-</span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="How It Works">
              <ol className="flex flex-col gap-3">
                {caseStudy.howItWorks.map(function (step, i) {
                  return (
                    <li key={i} className="flex gap-3 font-body text-text-secondary">
                      <span className="font-display font-semibold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  );
                })}
              </ol>
            </CaseStudySection>

            <CaseStudySection title="Technology Decisions">
              <div className="flex flex-col gap-5">
                {caseStudy.techDecisions.map(function (td, i) {
                  return (
                    <div key={i}>
                      <p className="font-body font-semibold text-text-primary">
                        {td.decision}
                      </p>
                      <p className="mt-1 font-body text-sm text-text-secondary">
                        {td.reason}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CaseStudySection>

            <CaseStudySection title="Challenges">
              <div className="flex flex-col gap-6">
                {caseStudy.challenges.map(function (c, i) {
                  return (
                    <div key={i} className="rounded-lg border border-border bg-surface-alt p-5">
                      <p className="font-display font-semibold text-signal">{c.title}</p>
                      <p className="mt-2 font-body text-sm text-text-secondary">
                        {c.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CaseStudySection>

            <CaseStudySection title="Result">
              <p className="font-body text-text-secondary">{caseStudy.result}</p>
            </CaseStudySection>

            <CaseStudySection title="Lessons Learned">
              <ul className="flex flex-col gap-2">
                {caseStudy.lessons.map(function (lesson, i) {
                  return (
                    <li key={i} className="font-body text-text-secondary">
                      <span className="mr-2 text-accent">*</span>
                      {lesson}
                    </li>
                  );
                })}
              </ul>
            </CaseStudySection>
          </div>
        ) : (
          <p className="mt-14 border-t border-border pt-10 font-body text-text-secondary">
            Full case study coming soon. In the meantime, check out the source code on GitHub above.
          </p>
        )}
      </Container>
    </main>
  );
}
