interface SectionHeaderProps {
  code: string;   // e.g. "SEC.02"
  label: string;  // e.g. "TEAM"
  title: string;
}

export function SectionHeader({ code, label, title }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-3">
        {code} — {label}
      </p>
      <h2 className="text-h2 font-heading font-semibold text-text-primary">{title}</h2>
    </div>
  );
}
