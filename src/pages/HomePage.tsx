import { Hero } from '@/sections/hero/Hero';
import { About } from '@/sections/about/About';
import { Events } from '@/sections/events/Events';
import { Team } from '@/sections/team/Team';
import { Join } from '@/sections/join/Join';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Team />
      <Join />
    </>
  );
}
