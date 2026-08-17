import Link from "next/link";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  icon?: IconComponent;
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon: Icon,
  className,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center gap-2 rounded-md px-5 py-3 font-body text-sm font-medium transition-colors duration-200",
    variant === "primary" &&
      "bg-primary text-white hover:bg-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    variant === "ghost" &&
      "border border-border text-text-primary hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
        {Icon && <Icon size={16} />}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
}
