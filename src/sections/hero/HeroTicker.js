import { jsx as _jsx } from "react/jsx-runtime";
const ITEMS = [
    'Hackathons', 'Workshops', 'Coding Contests', 'Guest Lectures',
    'Project Showcases', 'Industry Talks', 'Open Source Sprints', 'Research Colloquia',
];
export function HeroTicker() {
    return (_jsx("div", { className: "border-y border-border-subtle py-3 overflow-hidden", "aria-hidden": "true", children: _jsx("div", { className: "flex gap-8 font-mono text-caption uppercase tracking-widest text-text-muted whitespace-nowrap animate-[scroll_30s_linear_infinite]", children: [...ITEMS, ...ITEMS].map((item, i) => (_jsx("span", { children: item }, i))) }) }));
}
