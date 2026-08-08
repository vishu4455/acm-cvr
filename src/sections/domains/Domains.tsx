import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { domains } from '@/data/domains';
import { DomainCard } from './DomainCard';

export function Domains() {
  const revealRef = useScrollReveal<HTMLDivElement>({ stagger: 0.07 });

  return (
    <section id="domains" className="bg-surface-page py-30 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <SectionHeader code="SEC.04" label="DOMAINS" title="Pick your path." />
        <div ref={revealRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {domains.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
