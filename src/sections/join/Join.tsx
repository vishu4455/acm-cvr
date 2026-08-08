import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

const ACM_JOIN_URL =
  'https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=LEVEL&pay=DD';

export function Join() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="join" className="py-30 px-6 md:px-16">
      <div className="max-w-2xl mx-auto text-center" ref={revealRef}>
        <SectionHeader code="SEC.04" label="JOIN" title="Ready to compute your future?" />
        <Button variant="primary" href={ACM_JOIN_URL}>Join Now</Button>
      </div>
    </section>
  );
}
