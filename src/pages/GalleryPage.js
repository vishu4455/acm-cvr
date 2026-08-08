import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { pastEvents } from '@/data/pastEvents';
// No R3F/GSAP-heavy imports here on purpose — this route is code-split away
// from the WebGL/animation bundle entirely. See project-architecture §2.
export default function GalleryPage() {
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-6 md:px-16 py-30", children: [_jsx(SectionHeader, { code: "SEC.02.B", label: "EVENTS / GALLERY", title: "Past Events & Milestones" }), _jsx("p", { className: "text-body-md text-text-secondary mb-16 max-w-2xl", children: "Highlights and memories from our chapter's technical initiatives, inaugural ceremonies, and coding competitions." }), _jsx("div", { className: "flex flex-col gap-16", children: pastEvents.map((event) => (_jsxs(Card, { className: "p-0 overflow-hidden", children: [event.image && (_jsx("img", { src: event.image, alt: event.imageAlt, className: "w-full aspect-video object-cover" })), _jsxs("div", { className: "p-6 md:p-8", children: [_jsxs("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-2", children: [event.tag, " \u00B7 ", event.date] }), _jsx("h3", { className: "text-h4 font-heading font-semibold text-text-primary mb-4", children: event.title }), event.description.map((para, i) => (_jsx("p", { className: "text-body-md text-text-secondary mb-4 last:mb-0", children: para }, i)))] })] }, event.id))) })] }));
}
