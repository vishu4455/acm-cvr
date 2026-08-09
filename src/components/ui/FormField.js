import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCursorStore } from '@/store/cursorStore';
const fieldBase = 'w-full bg-surface-card border border-border-subtle rounded-sm px-4 py-3 text-body-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 ease-power2-out focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-focus-ring';
export function Input({ label, id, ...props }) {
    const setMode = useCursorStore((s) => s.setMode);
    return (_jsxs("label", { htmlFor: id, className: "block", children: [_jsx("span", { className: "block font-mono text-label uppercase tracking-widest text-text-muted mb-2", children: label }), _jsx("input", { id: id, className: fieldBase, onMouseEnter: () => setMode('text'), onMouseLeave: () => setMode('default'), ...props })] }));
}
export function Textarea({ label, id, ...props }) {
    const setMode = useCursorStore((s) => s.setMode);
    return (_jsxs("label", { htmlFor: id, className: "block", children: [_jsx("span", { className: "block font-mono text-label uppercase tracking-widest text-text-muted mb-2", children: label }), _jsx("textarea", { id: id, className: `${fieldBase} resize-none`, onMouseEnter: () => setMode('text'), onMouseLeave: () => setMode('default'), ...props })] }));
}
