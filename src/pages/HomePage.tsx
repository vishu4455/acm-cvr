import { Hero } from '@/sections/hero/Hero';
import { About } from '@/sections/about/About';
import { Events } from '@/sections/events/Events';
import { Team } from '@/sections/team/Team';
import { Join } from '@/sections/join/Join';
import { Contact } from '@/sections/contact/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Team />
      <Join />
      <Contact />
    </>
  );
}
