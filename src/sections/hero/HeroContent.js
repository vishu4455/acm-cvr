import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASE } from '@/animation/config/easings';
import { Button } from '@/components/ui/Button';
import { HeroTicker } from './HeroTicker';
import { SignalCircuitPanel } from '@/components/visuals/SignalCircuitPanel';
export function HeroContent() {
    const rootRef = useRef(null);
    useEffect(() => {
        // gsap.context + revert cleanup — same pattern as useScrollReveal.
        // Without this, React 19 Strict Mode's dev-only double-effect-invoke
        // leaves a duplicate, un-killed timeline fighting the first one over
        // the same elements' opacity, which can leave the hero stuck mid-fade.
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.hero-eyebrow', { opacity: 0, y: 8, duration: 0.3, ease: EASE.entrance })
                .from('.hero-title', { opacity: 0, y: 14, duration: 0.5, ease: EASE.entrance }, '-=0.1')
                .from('.hero-subtext', { opacity: 0, y: 12, duration: 0.5, ease: EASE.entrance }, '-=0.25')
                .from('.hero-cta', { opacity: 0, y: 12, duration: 0.5, ease: EASE.entrance }, '-=0.3')
                .from('.hero-cpu-panel', { opacity: 0, scale: 0.94, duration: 0.6, ease: EASE.entrance }, '-=0.4');
        }, rootRef);
        return () => ctx.revert();
    }, []);
    return (_jsxs("div", { ref: rootRef, className: "relative z-10 flex min-h-screen flex-col justify-center gap-8 px-6 md:px-16 py-24", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-12", children: [_jsxs("div", { className: "max-w-2xl", children: [_jsx("p", { className: "hero-eyebrow font-mono text-label uppercase tracking-widest text-text-muted mb-4", children: "SEC.00 \u2014 HOME \u00B7 CVR College of Engineering \u00B7 Hyderabad" }), _jsx("h1", { className: "hero-title text-h1 font-heading font-bold text-text-primary", children: "ACM Student Chapter" }), _jsx("p", { className: "hero-subtext mt-6 text-body-lg text-text-secondary max-w-xl", children: "Advancing Computing as a Science & Profession. We build skills, spark curiosity, and forge the next generation of engineers \u2014 one algorithm at a time." }), _jsxs("div", { className: "hero-cta mt-8 flex gap-4", children: [_jsx(Button, { variant: "primary", href: "#join", children: "Join Us" }), _jsx(Button, { variant: "ghost", href: "https://www.acm.org/about-acm/about-the-acm-organization", children: "Learn More" })] })] }), _jsx(SignalCircuitPanel, { className: "hero-cpu-panel hidden md:block w-[320px] lg:w-[420px] shrink-0" })] }), _jsx(HeroTicker, {})] }));
}
