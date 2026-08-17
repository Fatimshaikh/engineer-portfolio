import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";

export const metadata = {
  title: "Projects — Fatima Shaikh",
  description:
    "Backend, data engineering, and AI projects built end-to-end, from architecture through deployment.",
};

export default function ProjectsPage() {
  return (
    <main className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="All Projects"
          title="Systems I've designed and built"
          description="Each project below includes real architecture, real technology decisions, and real engineering challenges — not just a list of tools."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </main>
  );
}
