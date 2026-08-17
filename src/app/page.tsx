import { Hero } from "@/components/sections/Hero";
import { EngineeringSnapshot } from "@/components/sections/EngineeringSnapshot";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { EngineeringPhilosophy } from "@/components/sections/EngineeringPhilosophy";
import { TechnicalStack } from "@/components/sections/TechnicalStack";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCta } from "@/components/sections/ContactCta";
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
      <SectionReveal direction="up">
        <EngineeringPhilosophy />
      </SectionReveal>
      <SectionReveal direction="right" delay={0.05}>
        <TechnicalStack />
      </SectionReveal>
      <SectionReveal direction="up">
        <AboutPreview />
      </SectionReveal>
      <SectionReveal direction="up">
        <ContactCta />
      </SectionReveal>
    </main>
  );
}
