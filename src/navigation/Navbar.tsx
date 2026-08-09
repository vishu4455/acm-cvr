import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '@/data/nav';
import { NavLink } from './NavLink';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';

export function Navbar() {
  const navScrolled = useUIStore((s) => s.navScrolled);
  const setNavScrolled = useUIStore((s) => s.setNavScrolled);
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  useEffect(() => {
    function onScroll() {
      setNavScrolled(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [setNavScrolled, setActiveSection]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-16 h-16 md:h-18
        transition-[background-color,border-color] duration-250
        ${navScrolled ? 'bg-surface-page/95 backdrop-blur-sm border-b border-border-subtle' : 'bg-transparent border-b border-transparent'}`}
    >
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/brand/acm-logo-128.png" alt="" className="h-8 w-8 rounded-full object-cover" aria-hidden="true" />
        <span className="font-mono text-label uppercase tracking-widest text-text-primary">
          CVR · ACM
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink key={link.id} {...link} />
        ))}
      </div>
      <Button variant="secondary" href="#join">Join Us</Button>
    </nav>
  );
}
