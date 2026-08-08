import { useUIStore } from '@/store/uiStore';

export function NavLink({ id, label, href }: { id: string; label: string; href: string }) {
  const activeSection = useUIStore((s) => s.activeSection);
  const isActive = activeSection === id;

  return (
    <a
      href={href}
      className={`relative font-body text-body-sm transition-[color,letter-spacing] duration-150
        ${isActive ? 'text-brand-primary' : 'text-text-secondary hover:text-brand-primary hover:tracking-wide'}`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-circuit-trace-active" />
      )}
    </a>
  );
}
