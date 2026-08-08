import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
export function EventLinkCard({ event }) {
    return (_jsx(Link, { to: event.route, className: "block", children: _jsxs(Card, { interactive: true, className: "h-full", children: [_jsx("h3", { className: "text-h5 font-heading font-semibold text-text-primary mb-2", children: event.title }), _jsx("p", { className: "text-body-sm text-text-secondary", children: event.description })] }) }));
}
