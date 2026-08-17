import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function SelectedProjects() {
  const selected = PROJECTS.filter((p) => p.featured);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects built end-to-end"
          description="A few systems I've designed and built from scratch — architecture, implementation, and the debugging in between."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {selected.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/projects" variant="ghost" icon={ArrowRight}>
            View all projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
