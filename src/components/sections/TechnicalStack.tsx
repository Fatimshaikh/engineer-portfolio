import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { TECH_STACK } from "@/data/stack";

export function TechnicalStack() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Stack"
          title="Technologies, grouped by what they're for"
          description="Not a logo wall — tools grouped by the problem they solve."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {TECH_STACK.map((group) => (
            <div
              key={group.domain}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-display text-base font-semibold text-text-primary">
                {group.domain}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
