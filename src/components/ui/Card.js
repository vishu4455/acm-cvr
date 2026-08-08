import { jsx as _jsx } from "react/jsx-runtime";
import { useCursorStore } from '@/store/cursorStore';
export function Card({ children, interactive, onClick, className = '' }) {
    const setMode = useCursorStore((s) => s.setMode);
    const interactiveStyles = interactive
        ? 'hover:bg-surface-raised hover:border-border-strong hover:-translate-y-0.5 cursor-pointer'
        : '';
    return (_jsx("div", { className: `bg-surface-card border border-border-subtle rounded-sm p-6 transition-all duration-200 ease-power2-out ${interactiveStyles} ${className}`, onClick: onClick, onMouseEnter: () => interactive && setMode('button'), onMouseLeave: () => setMode('default'), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, onKeyDown: (e) => {
            if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onClick();
            }
        }, children: children }));
}
