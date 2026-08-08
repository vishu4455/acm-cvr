import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
export function About() {
    const revealRef = useScrollReveal();
    return (_jsx("section", { id: "about", className: "relative bg-surface-page py-30 px-6 md:px-16", children: _jsxs("div", { className: "max-w-4xl mx-auto", ref: revealRef, children: [_jsx(SectionHeader, { code: "SEC.01", label: "ABOUT", title: "Powered by curiosity, built by code" }), _jsx("p", { className: "text-body-lg text-text-secondary max-w-2xl", children: "The CVR College ACM Student Chapter is the official student branch of the Association for Computing Machinery \u2014 a community built around advancing computing as a science and a profession." })] }) }));
}
