import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
import { coreCommittee, leadsAndCoLeads } from '@/data/team';

const allMembers = [...coreCommittee, ...leadsAndCoLeads];

export function ProfileModal() {
  const selectedMemberId = useUIStore((s) => s.selectedMemberId);
  const closeMemberProfile = useUIStore((s) => s.closeMemberProfile);
  const member = allMembers.find((m) => m.id === selectedMemberId) ?? null;

  return (
    <Modal open={!!member} onClose={closeMemberProfile}>
      {member && (
        <div className="text-center">
          <img
            src={member.photo}
            alt={member.name}
            className="h-28 w-28 rounded-full object-cover mx-auto mb-4"
            style={{ filter: 'grayscale(15%) contrast(1.05)' }}
          />
          <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-1">
            {member.tier === 'core' ? 'Core Committee' : 'Leads & Co-Leads'}
          </p>
          <h3 className="text-h5 font-heading font-semibold text-text-primary mb-1">{member.name}</h3>
          <p className="text-body-sm text-text-secondary mb-4">{member.role}</p>
          <Button variant="ghost" onClick={closeMemberProfile}>Close</Button>
        </div>
      )}
    </Modal>
  );
}
