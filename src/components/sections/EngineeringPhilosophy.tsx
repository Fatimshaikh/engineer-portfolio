"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PHASES = [
  { label: "Build", detail: "Start with a real architecture." },
  { label: "Break", detail: "Something always breaks eventually." },
  { label: "Debug", detail: "Isolate the layer, check every hop." },
  { label: "Learn", detail: "Understand why the fix worked." },
  { label: "Improve", detail: "Ship a stronger version of the system." },
];

export function EngineeringPhilosophy() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="How I Work"
          title="Build. Break. Debug. Learn. Improve."
          description="Every project on this site followed this cycle at least once — the debugging is documented in the case studies, not hidden from them."
          align="center"
          className="mb-14"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-0">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-1 flex-col items-center gap-2 border-t-2 border-border px-4 py-6 text-center transition-colors duration-300 hover:border-accent md:border-l-2 md:border-t-0 md:first:border-l-0"
            >
              <span className="font-display text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg font-semibold text-text-primary">
                {phase.label}
              </p>
              <p className="font-body text-sm text-text-secondary">
                {phase.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
