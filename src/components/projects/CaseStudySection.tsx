type CaseStudySectionProps = {
  title: string;
  children: React.ReactNode;
};

export function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <div className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-project-h font-semibold text-text-primary">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
