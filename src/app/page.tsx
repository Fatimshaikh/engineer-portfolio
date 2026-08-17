import { Hero } from "@/components/sections/Hero";
import { EngineeringSnapshot } from "@/components/sections/EngineeringSnapshot";
import { SectionReveal } from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionReveal direction="up">
        <EngineeringSnapshot />
      </SectionReveal>
    </main>
  );
}
