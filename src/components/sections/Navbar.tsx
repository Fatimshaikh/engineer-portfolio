"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Internship", href: "/internship" },
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b transition-colors duration-200", scrolled || mobileOpen ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-transparent")}>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="signature font-display text-lg font-semibold" onClick={() => setMobileOpen(false)}>
          Fatima<span className="text-accent">.</span>Shaikh
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="font-body text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/Fatima_Shaikh_Resume.pdf" variant="ghost">
            Resume
          </Button>
          <Button href="/contact" variant="primary">
            Let's Connect
          </Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} className="inline-flex items-center justify-center text-text-primary md:hidden">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-3 font-body text-base font-medium text-text-primary transition-colors hover:bg-surface-alt">
              {link.label}
            </Link>
          ))}
          <a href="/Fatima_Shaikh_Resume.pdf" className="rounded-md px-2 py-3 font-body text-base font-medium text-text-primary transition-colors hover:bg-surface-alt">
            Resume
          </a>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 rounded-md bg-primary px-4 py-3 text-center font-body text-sm font-medium text-white">
            Let's Connect
          </Link>
        </nav>
      )}
    </header>
  );
}
