import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useUIStore } from '@/store/uiStore';
export function NavLink({ id, label, href }) {
    const activeSection = useUIStore((s) => s.activeSection);
    const isActive = activeSection === id;
    return (_jsxs(Link, { to: `/${href}`, className: `relative font-body text-body-sm transition-[color,letter-spacing] duration-150
        ${isActive ? 'text-brand-primary' : 'text-text-secondary hover:text-brand-primary hover:tracking-wide'}`, children: [label, isActive && (_jsx("span", { className: "absolute -bottom-1 left-0 h-[2px] w-full bg-circuit-trace-active" }))] }));
}
