import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { pastEvents } from '@/data/pastEvents';

// No R3F/GSAP-heavy imports here on purpose — this route is code-split away
// from the WebGL/animation bundle entirely. See project-architecture §2.
export default function GalleryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-16 py-30">
      <SectionHeader code="SEC.02.B" label="EVENTS / GALLERY" title="Past Events & Milestones" />
      <p className="text-body-md text-text-secondary mb-16 max-w-2xl">
        Highlights and memories from our chapter's technical initiatives, inaugural
        ceremonies, and coding competitions.
      </p>

      <div className="flex flex-col gap-16">
        {pastEvents.map((event) => (
          <Card key={event.id} className="p-0 overflow-hidden">
            {event.image && (
              <img
                src={event.image}
                alt={event.imageAlt}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-6 md:p-8">
              <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-2">
                {event.tag} · {event.date}
              </p>
              <h3 className="text-h4 font-heading font-semibold text-text-primary mb-4">
                {event.title}
              </h3>
              {event.description.map((para, i) => (
                <p key={i} className="text-body-md text-text-secondary mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
