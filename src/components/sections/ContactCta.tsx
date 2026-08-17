import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function ContactCta() {
  return (
    <section className="border-t border-border bg-surface-alt py-20 md:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-section-h font-semibold text-text-primary">
          Let&apos;s build something.
        </h2>
        <p className="max-w-md font-body text-text-secondary">
          Open to backend, data engineering, and AI engineering roles and
          collaborations.
        </p>
        <Button href="/contact" variant="primary" icon={ArrowRight}>
          Get in Touch
        </Button>
      </Container>
    </section>
  );
}
