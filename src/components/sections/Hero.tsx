"use client";

import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";

// TODO: replace with Fatima's real GitHub profile URL
const GITHUB_URL = "https://github.com/Fatimshaikh";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <Container className="flex flex-col items-start gap-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-sm font-medium uppercase tracking-wider text-accent"
        >
          Software Engineer — Backend · Data · AI
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-display text-hero font-semibold text-text-primary"
        >
          Building practical systems across backend, data, and AI
          <span className="animate-blink text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl font-body text-lg text-text-secondary"
        >
          I design and build end-to-end engineering systems — APIs, data
          pipelines, and AI-driven applications — and I get hands-on with
          every layer of the stack, from container orchestration to query
          optimization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button href="/projects" variant="primary" icon={ArrowRight}>
            View Projects
          </Button>
          <Button href={GITHUB_URL} variant="ghost" icon={GithubIcon}>
            GitHub
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-x-8 gap-y-2 pt-4 font-body text-sm text-text-secondary"
        >
          <span>{PROJECTS.length}+ engineering projects</span>
          <span>Backend · Data Engineering · AI Systems</span>
        </motion.div>
      </Container>
    </section>
  );
}
