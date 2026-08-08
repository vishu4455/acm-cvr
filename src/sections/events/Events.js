import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { eventLinks } from '@/data/events';
import { EventLinkCard } from './EventLinkCard';
export function Events() {
    const revealRef = useScrollReveal({ stagger: 0.08 });
    return (_jsx("section", { id: "events", className: "py-30 px-6 md:px-16", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx(SectionHeader, { code: "SEC.02", label: "EVENTS", title: "Explore Our Events & Activities" }), _jsx("div", { ref: revealRef, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: eventLinks.map((event) => (_jsx(EventLinkCard, { event: event }, event.id))) })] }) }));
}
