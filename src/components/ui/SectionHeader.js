import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function SectionHeader({ code, label, title }) {
    return (_jsxs("div", { className: "mb-12", children: [_jsxs("p", { className: "font-mono text-label uppercase tracking-widest text-text-muted mb-3", children: [code, " \u2014 ", label] }), _jsx("h2", { className: "text-h2 font-heading font-semibold text-text-primary", children: title })] }));
}
