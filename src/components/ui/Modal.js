import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASE } from '@/animation/config/easings';
export function Modal({ open, onClose, children }) {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        gsap.fromTo(panelRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.25, ease: EASE.entrance });
        function onKey(e) {
            if (e.key === 'Escape')
                onClose();
        }
        window.addEventListener('keydown', onKey);
        panelRef.current?.querySelector('button, a')?.focus();
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open)
        return null;
    return (_jsx("div", { ref: overlayRef, className: "fixed inset-0 z-50 flex items-center justify-center bg-surface-base/80 p-6", onClick: onClose, role: "dialog", "aria-modal": "true", children: _jsx("div", { ref: panelRef, className: "bg-surface-overlay border border-border-strong rounded-md p-8 max-w-lg w-full", onClick: (e) => e.stopPropagation(), children: children }) }));
}
