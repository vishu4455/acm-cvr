import { Card } from '@/components/ui/Card';
import { Domain } from '@/data/domains';

export function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  return (
    <Card>
      <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-3">
        U{index + 1} — {domain.id.toUpperCase()}
      </p>
      <div className="text-2xl mb-3" aria-hidden="true">{domain.icon}</div>
      <h3 className="text-h5 font-heading font-semibold text-text-primary mb-2">{domain.label}</h3>
      <p className="text-body-sm text-text-secondary">{domain.description}</p>
    </Card>
  );
}
