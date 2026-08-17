import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { Mail, ArrowUpRight } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";

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
];

export default function ContactPage() {
  return (
    <main className="py-20 md:py-28">
      <Container className="max-w-2xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          description="Open to backend, data engineering, and AI engineering roles and collaborations. The fastest way to reach me is email."
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
      </Container>
    </main>
  );
}
