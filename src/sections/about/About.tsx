import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function About() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative bg-surface-page py-30 px-6 md:px-16">
      <div className="max-w-4xl mx-auto" ref={revealRef}>
        <SectionHeader code="SEC.01" label="ABOUT" title="Powered by curiosity, built by code" />
        <p className="text-body-lg text-text-secondary max-w-2xl">
          The CVR College ACM Student Chapter is the official student branch of the
          Association for Computing Machinery — a community built around advancing
          computing as a science and a profession.
        </p>
      </div>
    </section>
  );
}
