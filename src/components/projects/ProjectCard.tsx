import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

const domainTagMap = {
  backend: "default",
  data: "data",
  ai: "data",
  infra: "accent",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const tagDomain = domainTagMap[project.domain];

  return (
    <div
      className={cn(
        "group flex flex-col justify-between gap-6 rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary md:p-8",
        project.featured && "md:col-span-2"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <Tag domain={tagDomain}>{project.category}</Tag>
          <a
          
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"View " + project.name + " on GitHub"}
            className="text-text-secondary transition-colors hover:text-text-primary"
          >
            <GithubIcon size={20} />
          </a>
        </div>

        <h3 className="font-display text-project-h font-semibold text-text-primary">
          {project.name}
        </h3>

        <p className="font-body text-sm text-text-secondary md:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>

      <Link
        href={"/projects/" + project.slug}
        className="inline-flex items-center gap-1 font-body text-sm font-medium text-primary transition-colors group-hover:text-signal"
      >
        View case study
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
