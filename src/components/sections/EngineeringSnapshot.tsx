"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SNAPSHOT_AREAS } from "@/data/snapshot";
import { cn } from "@/lib/utils";

const domainStyles = {
  default: "border-border text-text-primary bg-surface",
  data: "border-data/30 text-data bg-data/5",
  accent: "border-accent/30 text-accent bg-accent/5",
};

export function EngineeringSnapshot() {
  const [featured, ...rest] = SNAPSHOT_AREAS;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="What I Build With"
          title="Engineering across the full stack"
          description="Domains I've worked hands-on across — not just listed, actually built with."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Featured area - spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className={cn(
              "flex flex-col justify-between gap-6 rounded-lg border p-8 md:col-span-2 md:row-span-2",
              domainStyles[featured.domain]
            )}
          >
            <featured.icon size={32} strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-project-h font-semibold text-text-primary">
                {featured.title}
              </h3>
              <p className="mt-2 font-body text-text-secondary">
                {featured.description}
              </p>
            </div>
          </motion.div>

          {/* Remaining areas - supporting grid */}
          {rest.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
              className={cn(
                "flex flex-col gap-4 rounded-lg border p-6",
                domainStyles[area.domain]
              )}
            >
              <area.icon size={24} strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-base font-semibold text-text-primary">
                  {area.title}
                </h3>
                <p className="mt-1 font-body text-sm text-text-secondary">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
