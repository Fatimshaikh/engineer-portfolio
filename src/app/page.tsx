import { Hero } from "@/components/sections/Hero";
import { EngineeringSnapshot } from "@/components/sections/EngineeringSnapshot";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionReveal direction="up">
        <EngineeringSnapshot />
      </SectionReveal>
      <SectionReveal direction="left" delay={0.05}>
        <SelectedProjects />
      </SectionReveal>
    </main>
  );
}
