import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FacultyCard } from './FacultyCard';
import { TeamGraph } from './TeamGraph';
import { ProfileModal } from './ProfileModal';
import { coreCommittee, leadsAndCoLeads } from '@/data/team';
export function Team() {
    const revealRef = useScrollReveal();
    return (_jsxs("section", { id: "team", className: "bg-surface-page py-30 px-6 md:px-16", children: [_jsxs("div", { className: "max-w-5xl mx-auto", ref: revealRef, children: [_jsx(SectionHeader, { code: "SEC.03", label: "TEAM", title: "Community Structure" }), _jsx(FacultyCard, {}), _jsx(TeamGraph, {}), _jsxs("div", { className: "md:hidden space-y-10", children: [_jsxs("div", { children: [_jsx("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-4", children: "Core Committee" }), _jsx("ul", { className: "space-y-3", children: coreCommittee.map((m) => (_jsxs("li", { className: "flex items-center gap-3", children: [_jsx("img", { src: m.photo, alt: m.name, className: "h-10 w-10 rounded-full object-cover", style: { filter: 'grayscale(35%)' } }), _jsx("span", { className: "text-body-sm text-text-primary", children: m.name }), _jsxs("span", { className: "text-caption text-text-muted", children: ["\u2014 ", m.role] })] }, m.id))) })] }), _jsxs("div", { children: [_jsx("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-4", children: "Leads & Co-Leads" }), _jsx("ul", { className: "space-y-3", children: leadsAndCoLeads.map((m) => (_jsxs("li", { className: "flex items-center gap-3", children: [_jsx("img", { src: m.photo, alt: m.name, className: "h-10 w-10 rounded-full object-cover", style: { filter: 'grayscale(35%)' } }), _jsx("span", { className: "text-body-sm text-text-primary", children: m.name }), _jsxs("span", { className: "text-caption text-text-muted", children: ["\u2014 ", m.role] })] }, m.id))) })] })] })] }), _jsx(ProfileModal, {})] }));
}
