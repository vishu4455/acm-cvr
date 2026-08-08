import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card } from '@/components/ui/Card';
export function DomainCard({ domain, index }) {
    return (_jsxs(Card, { children: [_jsxs("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-3", children: ["U", index + 1, " \u2014 ", domain.id.toUpperCase()] }), _jsx("div", { className: "text-2xl mb-3", "aria-hidden": "true", children: domain.icon }), _jsx("h3", { className: "text-h5 font-heading font-semibold text-text-primary mb-2", children: domain.label }), _jsx("p", { className: "text-body-sm text-text-secondary", children: domain.description })] }));
}
