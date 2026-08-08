import { jsx as _jsx } from "react/jsx-runtime";
import { useCursorStore } from '@/store/cursorStore';
const base = 'inline-flex items-center justify-center rounded-sm px-6 py-3 font-body text-body-sm transition-colors duration-150 ease-power2-out focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-surface-base';
const variants = {
    primary: 'bg-brand-primary text-text-inverse font-semibold uppercase tracking-wide hover:bg-[hsl(191,38%,60%)] active:bg-[hsl(191,38%,47%)]',
    secondary: 'bg-transparent border border-border-strong text-text-primary font-medium hover:bg-surface-hover hover:border-brand-primary active:bg-surface-active',
    ghost: 'bg-transparent text-text-secondary font-medium hover:text-text-primary hover:bg-surface-card active:bg-surface-active px-4',
};
export function Button({ children, variant = 'primary', href, onClick, disabled }) {
    const setMode = useCursorStore((s) => s.setMode);
    const className = `${base} ${variants[variant]} ${disabled ? 'bg-text-disabled text-text-muted pointer-events-none' : ''}`;
    const handlers = {
        onMouseEnter: () => setMode(disabled ? 'disabled' : 'button'),
        onMouseLeave: () => setMode('default'),
    };
    if (href) {
        return (_jsx("a", { href: href, className: className, target: href.startsWith('http') ? '_blank' : undefined, rel: "noreferrer", ...handlers, children: children }));
    }
    return (_jsx("button", { className: className, onClick: onClick, disabled: disabled, ...handlers, children: children }));
}
