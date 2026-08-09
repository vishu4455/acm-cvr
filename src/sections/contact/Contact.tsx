import { FormEvent, useState } from 'react';
import { useScrollReveal } from '@/animation/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Input, Textarea } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

const CONTACT_EMAIL = 'acmcvrsc@gmail.com';

export function Contact() {
  const revealRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      form.subject || 'Message from ACM website'
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <section id="contact" className="py-30 px-6 md:px-16">
      <div className="max-w-2xl mx-auto" ref={revealRef}>
        <SectionHeader code="SEC.05" label="STAY CONNECTED" title="Get in Touch" />
        <p className="text-body-md text-text-secondary mb-10">
          Have a question, idea, or just want to say hello? Send us a message and
          we'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="contact-name"
              label="Name"
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
            <Input
              id="contact-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="contact-phone"
              label="Ph No"
              type="tel"
              placeholder="+91 00000 00000"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
            <Input
              id="contact-subject"
              label="Subject"
              type="text"
              placeholder="What's this about?"
              required
              value={form.subject}
              onChange={(e) => update('subject', e.target.value)}
            />
          </div>

          <Textarea
            id="contact-message"
            label="Message"
            placeholder="Write your message here..."
            rows={6}
            required
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
          />

          <div className="flex items-center gap-4">
            <Button variant="primary">Send Message</Button>
            {sent && (
              <p className="text-body-sm text-brand-primary">
                Opening your email client…
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
