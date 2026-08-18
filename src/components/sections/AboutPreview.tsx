import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <span className="font-body text-sm font-medium uppercase tracking-wider text-accent">
          About
        </span>
        <h2 className="mt-3 font-display text-section-h font-semibold text-text-primary">
          I build across the stack, not just around one part of it.
        </h2>
        <p className="mt-4 font-body text-text-secondary">
          BS in Software Engineering, with hands-on experience across backend,
          data engineering, and AI. I intentionally explore multiple domains
          because understanding how systems work end-to-end makes me a
          stronger engineer.
        </p>
        <Button href="/about" variant="ghost" icon={ArrowRight} className="mt-6">
          More about me
        </Button>
      </Container>
    </section>
  );
}
