import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="font-body text-sm font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-section-h font-semibold text-text-primary">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "font-body text-text-secondary max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
