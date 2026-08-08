import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FacultyCard } from './FacultyCard';
import { TeamGraph } from './TeamGraph';
import { ProfileModal } from './ProfileModal';
import { coreCommittee, leadsAndCoLeads } from '@/data/team';

export function Team() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="team" className="bg-surface-page py-30 px-6 md:px-16">
      <div className="max-w-5xl mx-auto" ref={revealRef}>
        <SectionHeader code="SEC.03" label="TEAM" title="Community Structure" />
        <FacultyCard />
        <TeamGraph />

        {/* mobile fallback — grouped list, no graph geometry, per team-network spec §1 */}
        <div className="md:hidden space-y-10">
          <div>
            <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-4">Core Committee</p>
            <ul className="space-y-3">
              {coreCommittee.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <img src={m.photo} alt={m.name} className="h-10 w-10 rounded-full object-cover" style={{ filter: 'grayscale(35%)' }} />
                  <span className="text-body-sm text-text-primary">{m.name}</span>
                  <span className="text-caption text-text-muted">— {m.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-4">Leads &amp; Co-Leads</p>
            <ul className="space-y-3">
              {leadsAndCoLeads.map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <img src={m.photo} alt={m.name} className="h-10 w-10 rounded-full object-cover" style={{ filter: 'grayscale(35%)' }} />
                  <span className="text-body-sm text-text-primary">{m.name}</span>
                  <span className="text-caption text-text-muted">— {m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProfileModal />
    </section>
  );
}
