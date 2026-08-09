import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Modal } from '@/components/ui/Modal';
import { useCursorStore } from '@/store/cursorStore';
import { galleryCategories, galleryPhotos, GalleryPhoto } from '@/data/galleryPhotos';

// No R3F/GSAP-heavy imports here on purpose — this route is code-split away
// from the WebGL/animation bundle entirely. See project-architecture §2.
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof galleryCategories)[number]>('All Moments');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const setMode = useCursorStore((s) => s.setMode);

  const filtered =
    activeCategory === 'All Moments'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 py-30">
      <SectionHeader code="SEC.02.C" label="EVENTS / GALLERY" title="Visual Highlights" />
      <p className="text-body-md text-text-secondary mb-10 max-w-2xl">
        Browse through photos from our chapter's events, celebrations, and workshops.
      </p>

      <div className="flex flex-wrap gap-2 mb-12">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            onMouseEnter={() => setMode('button')}
            onMouseLeave={() => setMode('default')}
            className={`rounded-sm px-4 py-2 font-mono text-label uppercase tracking-widest transition-colors duration-150
              ${
                activeCategory === cat
                  ? 'bg-brand-primary text-text-inverse'
                  : 'bg-transparent border border-border-strong text-text-secondary hover:text-text-primary hover:border-brand-primary'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-body-md text-text-muted">No photos in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              onMouseEnter={() => setMode('canvas-hotspot')}
              onMouseLeave={() => setMode('default')}
              className="group relative aspect-square overflow-hidden rounded-md border border-border-subtle text-left"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-300 ease-power2-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-base/90 to-transparent p-4">
                <p className="font-mono text-label uppercase tracking-widest text-circuit-trace-active mb-1">
                  {photo.title}
                </p>
                <p className="text-body-sm text-text-secondary">{photo.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal open={!!lightboxPhoto} onClose={() => setLightboxPhoto(null)}>
        {lightboxPhoto && (
          <div>
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
              className="w-full rounded-sm mb-6"
            />
            <p className="font-mono text-label uppercase tracking-widest text-circuit-trace-active mb-1">
              {lightboxPhoto.title}
            </p>
            <h3 className="text-h5 font-heading font-semibold text-text-primary">
              {lightboxPhoto.subtitle}
            </h3>
          </div>
        )}
      </Modal>
    </div>
  );
}
