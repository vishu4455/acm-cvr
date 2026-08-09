import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { eventLinks } from '@/data/events';
import { EventLinkCard } from './EventLinkCard';

export function Events() {
  const revealRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });

  return (
    <section id="events" className="py-30 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeader code="SEC.02" label="EVENTS" title="Explore Our Events & Activities" />
        <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventLinks.map((event) => (
            <EventLinkCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
