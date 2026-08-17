"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: SectionRevealProps) {
  const clipFrom =
    direction === "up"
      ? "inset(12% 0% 0% 0% round 12px)"
      : direction === "left"
      ? "inset(0% 12% 0% 0% round 12px)"
      : "inset(0% 0% 0% 12% round 12px)";

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: clipFrom, y: direction === "up" ? 24 : 0 }}
      whileInView={{
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        y: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
