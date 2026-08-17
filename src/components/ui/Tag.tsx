import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  domain?: "default" | "data" | "accent" | "signal";
  className?: string;
};

export function Tag({ children, domain = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium font-body",
        domain === "default" && "border-border text-text-secondary bg-surface-alt",
        domain === "data" && "border-data/30 text-data bg-data/5",
        domain === "accent" && "border-accent/30 text-accent bg-accent/5",
        domain === "signal" && "border-signal/30 text-signal bg-signal/5",
        className
      )}
    >
      {children}
    </span>
  );
}
