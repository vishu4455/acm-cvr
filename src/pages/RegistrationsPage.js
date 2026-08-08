import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SectionHeader } from '@/components/ui/SectionHeader';
// No R3F/GSAP-heavy imports here on purpose — this route is code-split away
// from the WebGL/animation bundle entirely. See project-architecture §2.
export default function RegistrationsPage() {
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-6 md:px-16 py-30", children: [_jsx(SectionHeader, { code: "SEC.02.A", label: "EVENTS / REGISTRATIONS", title: "Registrations" }), _jsx("p", { className: "text-body-md text-text-secondary", children: "Register for upcoming hackathons, workshops and technical programs." })] }));
}
