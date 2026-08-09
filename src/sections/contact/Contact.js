import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Input, Textarea } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
const CONTACT_EMAIL = 'acmcvrsc@gmail.com';
export function Contact() {
    const revealRef = useScrollReveal({ stagger: 0.08 });
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    function update(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject || 'Message from ACM website')}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        setSent(true);
    }
    return (_jsx("section", { id: "contact", className: "py-30 px-6 md:px-16", children: _jsxs("div", { className: "max-w-2xl mx-auto", ref: revealRef, children: [_jsx(SectionHeader, { code: "SEC.05", label: "STAY CONNECTED", title: "Get in Touch" }), _jsx("p", { className: "text-body-md text-text-secondary mb-10", children: "Have a question, idea, or just want to say hello? Send us a message and we'll get back to you." }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { id: "contact-name", label: "Name", type: "text", placeholder: "Your name", required: true, value: form.name, onChange: (e) => update('name', e.target.value) }), _jsx(Input, { id: "contact-email", label: "Email", type: "email", placeholder: "you@example.com", required: true, value: form.email, onChange: (e) => update('email', e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { id: "contact-phone", label: "Ph No", type: "tel", placeholder: "+91 00000 00000", value: form.phone, onChange: (e) => update('phone', e.target.value) }), _jsx(Input, { id: "contact-subject", label: "Subject", type: "text", placeholder: "What's this about?", required: true, value: form.subject, onChange: (e) => update('subject', e.target.value) })] }), _jsx(Textarea, { id: "contact-message", label: "Message", placeholder: "Write your message here...", rows: 6, required: true, value: form.message, onChange: (e) => update('message', e.target.value) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "primary", children: "Send Message" }), sent && (_jsx("p", { className: "text-body-sm text-brand-primary", children: "Opening your email client\u2026" }))] })] })] }) }));
}
