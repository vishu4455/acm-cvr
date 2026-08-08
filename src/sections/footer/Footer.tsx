export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-page py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-2">
            Stay Connected
          </p>
          <p className="text-body-md text-text-primary">CVR ACM Student Chapter</p>
          <p className="text-body-sm text-text-secondary">CVR College of Engineering · Hyderabad</p>
          <a href="mailto:acmcvrsc@gmail.com" className="text-body-sm text-brand-primary hover:underline">
            acmcvrsc@gmail.com
          </a>
        </div>
        <div className="flex gap-6 text-body-sm text-text-secondary">
          <a href="https://instagram.com/acm_cvr" className="hover:text-brand-primary">Instagram</a>
          <a href="https://linkedin.com" className="hover:text-brand-primary">LinkedIn</a>
          <a href="https://github.com/acmcvrsc" className="hover:text-brand-primary">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
