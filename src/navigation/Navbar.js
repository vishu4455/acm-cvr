import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '@/data/nav';
import { NavLink } from './NavLink';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
export function Navbar() {
    const navScrolled = useUIStore((s) => s.navScrolled);
    const setNavScrolled = useUIStore((s) => s.setNavScrolled);
    const setActiveSection = useUIStore((s) => s.setActiveSection);
    useEffect(() => {
        function onScroll() {
            setNavScrolled(window.scrollY > window.innerHeight * 0.8);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting)
                    setActiveSection(entry.target.id);
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        sections.forEach((s) => observer.observe(s));
        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, [setNavScrolled, setActiveSection]);
    return (_jsxs("nav", { className: `fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-16 h-16 md:h-18
        transition-[background-color,border-color] duration-250
        ${navScrolled ? 'bg-surface-page/95 backdrop-blur-sm border-b border-border-subtle' : 'bg-transparent border-b border-transparent'}`, children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [_jsx("img", { src: "/brand/acm-logo-128.png", alt: "", className: "h-8 w-8 rounded-full object-cover", "aria-hidden": "true" }), _jsx("span", { className: "font-mono text-label uppercase tracking-widest text-text-primary", children: "CVR \u00B7 ACM" })] }), _jsx("div", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => (_jsx(NavLink, { ...link }, link.id))) }), _jsx(Button, { variant: "secondary", href: "#join", children: "Join Us" })] }));
}
