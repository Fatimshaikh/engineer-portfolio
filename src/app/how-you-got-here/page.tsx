"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RecordCard } from "@/components/sections/RecordCard";
import { DNS_STEPS, BEFORE_AFTER } from "@/data/dnsJourney";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowYouGotHerePage() {
  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 75%", "end 60%"],
  });

  const statusLines = ["DNS resolved", "HTTPS established", "Vercel reached", "Next.js served", "You are here"];

  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <span className="font-body text-sm font-medium uppercase tracking-wider text-accent">
          A Small Engineering Story
        </span>

        <h1 className="mt-4 font-display text-hero font-semibold leading-tight text-text-primary">
          How you got here
        </h1>

        <div className="mt-6 rounded-lg border border-border bg-surface-alt px-5 py-4 font-body text-sm text-text-secondary">
          You typed <span className="font-medium text-text-primary">fatimashaikh.vercel.app</span> into a browser. Here is exactly what happened between that keystroke and this sentence.
        </div>

        <div ref={stepsRef} className="relative mt-16">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-5 top-2 bottom-2 w-px origin-top bg-accent"
          />

          <div className="flex flex-col gap-10">
            {DNS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-5"
              >
                <div className="flex w-10 shrink-0 justify-center">
                  <span className="font-display text-2xl font-semibold text-text-primary">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-text-primary">{item.title}</p>
                  <p className="mt-1 font-body text-text-secondary">{item.text}</p>
                  {item.step === "04" && (
                    <div className="mt-5">
                      <RecordCard />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 rounded-lg border border-accent/30 bg-accent/5 p-6">
          {statusLines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-accent" />
              <span className="font-body text-sm text-text-primary">{line}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 font-body text-sm italic text-text-secondary">
          This page is part of the system it just explained. You are not reading about a hypothetical website — you are reading this walkthrough on the same deployment it describes.
        </p>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-project-h font-semibold text-text-primary">What I thought before I deployed this</h2>
          <p className="mt-4 font-body text-text-secondary">I assumed DNS was roughly:</p>
          <p className="mt-2 rounded-md bg-surface-alt px-4 py-3 font-body text-sm text-text-secondary">{BEFORE_AFTER.before}</p>
          <p className="mt-4 font-body text-text-secondary">Not wrong, exactly — just missing the actual machinery underneath it.</p>

          <h2 className="mt-10 font-display text-project-h font-semibold text-text-primary">What I understand now</h2>
          <p className="mt-4 rounded-md bg-surface-alt px-4 py-3 font-body text-sm text-text-secondary">{BEFORE_AFTER.after}</p>
          <p className="mt-4 font-body text-text-secondary">Same shape as everything else on this site: get stuck, look underneath, understand it properly, ship it.</p>
        </div>

        <div className="mt-14">
          <Button href="/projects" variant="primary" icon={ArrowRight}>Back to Projects</Button>
        </div>
      </Container>
    </main>
  );
}
