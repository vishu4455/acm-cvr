import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
import { coreCommittee, leadsAndCoLeads } from '@/data/team';
const allMembers = [...coreCommittee, ...leadsAndCoLeads];
export function ProfileModal() {
    const selectedMemberId = useUIStore((s) => s.selectedMemberId);
    const closeMemberProfile = useUIStore((s) => s.closeMemberProfile);
    const member = allMembers.find((m) => m.id === selectedMemberId) ?? null;
    return (_jsx(Modal, { open: !!member, onClose: closeMemberProfile, children: member && (_jsxs("div", { className: "text-center", children: [_jsx("img", { src: member.photo, alt: member.name, className: "h-28 w-28 rounded-full object-cover mx-auto mb-4", style: { filter: 'grayscale(15%) contrast(1.05)' } }), _jsx("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-1", children: member.tier === 'core' ? 'Core Committee' : 'Leads & Co-Leads' }), _jsx("h3", { className: "text-h5 font-heading font-semibold text-text-primary mb-1", children: member.name }), _jsx("p", { className: "text-body-sm text-text-secondary mb-4", children: member.role }), _jsx(Button, { variant: "ghost", onClick: closeMemberProfile, children: "Close" })] })) }));
}
