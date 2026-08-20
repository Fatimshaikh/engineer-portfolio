import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ARTICLES } from "@/data/articles";
import { ArrowUpRight, PenLine } from "lucide-react";

export const metadata = {
  title: "Articles - Fatima Shaikh",
  description: "Writing on backend engineering, data engineering, and AI systems.",
};

export default function ArticlesPage() {
  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <SectionHeader
          eyebrow="Writing"
          title="Articles"
          description="Notes on backend engineering, data engineering, and AI systems - written up in more detail than a project README allows."
        />

        {ARTICLES.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-4 rounded-lg border border-dashed border-border p-14 text-center">
            <PenLine size={28} className="text-text-secondary" />
            <p className="font-display text-lg font-semibold text-text-primary">
              First article in progress
            </p>
            <p className="max-w-sm font-body text-sm text-text-secondary">
              Nothing published yet - check back soon, or explore the project
              case studies in the meantime.
            </p>
            <Button href="/projects" variant="ghost">
              View Projects
            </Button>
          </div>
        ) : (
          <div className="mt-14 flex flex-col gap-4">
            {ARTICLES.map((article) => (
              <a key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-text-primary">
                    {article.title}
                  </p>
                  <p className="mt-2 font-body text-sm text-text-secondary">
                    {article.description}
                  </p>
                  <p className="mt-3 font-body text-xs text-text-secondary">
                    {article.date}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-text-secondary transition-colors group-hover:text-primary"
                />
              </a>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
