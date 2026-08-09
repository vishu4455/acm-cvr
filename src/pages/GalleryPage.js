import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/ui/Modal';
import { useCursorStore } from '@/store/cursorStore';
import { galleryCategories, galleryPhotos } from '@/data/galleryPhotos';
// No R3F/GSAP-heavy imports here on purpose — this route is code-split away
// from the WebGL/animation bundle entirely. See project-architecture §2.
export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All Moments');
    const [lightboxPhoto, setLightboxPhoto] = useState(null);
    const setMode = useCursorStore((s) => s.setMode);
    const filtered = activeCategory === 'All Moments'
        ? galleryPhotos
        : galleryPhotos.filter((p) => p.category === activeCategory);
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-6 md:px-16 py-30", children: [_jsx(SectionHeader, { code: "SEC.02.C", label: "EVENTS / GALLERY", title: "Visual Highlights" }), _jsx("p", { className: "text-body-md text-text-secondary mb-10 max-w-2xl", children: "Browse through photos from our chapter's events, celebrations, and workshops." }), _jsx("div", { className: "flex flex-wrap gap-2 mb-12", children: galleryCategories.map((cat) => (_jsx("button", { onClick: () => setActiveCategory(cat), onMouseEnter: () => setMode('button'), onMouseLeave: () => setMode('default'), className: `rounded-sm px-4 py-2 font-mono text-label uppercase tracking-widest transition-colors duration-150
              ${activeCategory === cat
                    ? 'bg-brand-primary text-text-inverse'
                    : 'bg-transparent border border-border-strong text-text-secondary hover:text-text-primary hover:border-brand-primary'}`, children: cat }, cat))) }), filtered.length === 0 ? (_jsx("p", { className: "text-body-md text-text-muted", children: "No photos in this category yet." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: filtered.map((photo) => (_jsxs("button", { onClick: () => setLightboxPhoto(photo), onMouseEnter: () => setMode('canvas-hotspot'), onMouseLeave: () => setMode('default'), className: "group relative aspect-square overflow-hidden rounded-md border border-border-subtle text-left", children: [_jsx("img", { src: photo.src, alt: photo.alt, className: "h-full w-full object-cover transition-transform duration-300 ease-power2-out group-hover:scale-105" }), _jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-base/90 to-transparent p-4", children: [_jsx("p", { className: "font-mono text-label uppercase tracking-widest text-circuit-trace-active mb-1", children: photo.title }), _jsx("p", { className: "text-body-sm text-text-secondary", children: photo.subtitle })] })] }, photo.id))) })), _jsx(Modal, { open: !!lightboxPhoto, onClose: () => setLightboxPhoto(null), children: lightboxPhoto && (_jsxs("div", { children: [_jsx("img", { src: lightboxPhoto.src, alt: lightboxPhoto.alt, className: "w-full rounded-sm mb-6" }), _jsx("p", { className: "font-mono text-label uppercase tracking-widest text-circuit-trace-active mb-1", children: lightboxPhoto.title }), _jsx("h3", { className: "text-h5 font-heading font-semibold text-text-primary", children: lightboxPhoto.subtitle })] })) })] }));
}
