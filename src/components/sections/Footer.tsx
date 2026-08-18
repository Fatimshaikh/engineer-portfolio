import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <p className="font-body text-sm text-text-secondary">
          &copy; {year} Fatima Shaikh
        </p>
        <div className="flex items-center gap-5">
          <a href="mailto:fshaikhh15@gmail.com" aria-label="Email" className="text-text-secondary transition-colors hover:text-text-primary">
            <Mail size={18} />
          </a>
          <a href="https://github.com/Fatimshaikh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-secondary transition-colors hover:text-text-primary">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/fatima-shaikh-392087150/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary transition-colors hover:text-text-primary">
            <LinkedinIcon size={18} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
