import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { domains } from '@/data/domains';
import { DomainCard } from './DomainCard';
export function Domains() {
    const revealRef = useScrollReveal({ stagger: 0.07 });
    return (_jsx("section", { id: "domains", className: "bg-surface-page py-30 px-6 md:px-16", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsx(SectionHeader, { code: "SEC.04", label: "DOMAINS", title: "Pick your path." }), _jsx("div", { ref: revealRef, className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: domains.map((domain, i) => (_jsx(DomainCard, { domain: domain, index: i }, domain.id))) })] }) }));
}
