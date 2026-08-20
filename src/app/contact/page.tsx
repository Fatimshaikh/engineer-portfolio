import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact — Fatima Shaikh",
  description: "Get in touch with Fatima Shaikh — Software Engineer.",
};

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "fshaikhh15@gmail.com",
    href: "mailto:fshaikhh15@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Fatimshaikh",
    href: "https://github.com/Fatimshaikh",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/fatima-shaikh",
    href: "https://www.linkedin.com/in/fatima-shaikh-392087150/",
    icon: LinkedinIcon,
  },
  {
    label: "Resume",
    value: "Download .pdf",
    href: "/Fatima_Shaikh_Resume.pdf",
    icon: FileText,
  },
];

export default function ContactPage() {
  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          description="Open to backend, data engineering, and AI engineering roles and collaborations. I'm not currently taking scheduled calls, but send your requirements below or by email and I'll follow up."
        />

        <div className="mt-12 flex flex-col gap-4">
          {CONTACT_LINKS.map((link) => (

            <a key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <link.icon size={24} className="text-primary" />
                <div>
                  <p className="font-body text-sm text-text-secondary">
                    {link.label}
                  </p>
                  <p className="font-display font-semibold text-text-primary">
                    {link.value}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-text-secondary transition-colors group-hover:text-primary"
              />
            </a>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-14">
          <h2 className="font-display text-project-h font-semibold text-text-primary">
            Or send your requirements directly
          </h2>
          <p className="mt-2 font-body text-sm text-text-secondary">
            Tell me what you need built — I&apos;ll reply by email.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
