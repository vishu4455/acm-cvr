import { TeamMember } from '@/data/team';
import { useCursorStore } from '@/store/cursorStore';

interface TeamNodeProps {
  member: TeamMember;
  x: number;
  y: number;
  radius: number;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export function TeamNode({ member, x, y, radius, dimmed, onHover, onSelect }: TeamNodeProps) {
  const setMode = useCursorStore((s) => s.setMode);

  return (
    <g
      transform={`translate(${x}, ${y})`}
      opacity={dimmed ? 0.55 : 1}
      style={{ transition: 'opacity 200ms ease-out, transform 200ms ease-out' }}
      tabIndex={0}
      role="button"
      aria-label={`${member.name}, ${member.role} — open profile`}
      onMouseEnter={() => { onHover(member.id); setMode('canvas-hotspot'); }}
      onMouseLeave={() => { onHover(null); setMode('default'); }}
      onFocus={() => onHover(member.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(member.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(member.id); }}
      className="cursor-pointer outline-none focus-visible:opacity-100"
    >
      <circle r={radius + 2} fill="none" stroke="var(--tw-color-circuit-node-idle, #4A4C50)" strokeWidth={2} />
      <clipPath id={`clip-${member.id}`}>
        <circle r={radius} />
      </clipPath>
      <image
        href={member.photo}
        x={-radius} y={-radius}
        width={radius * 2} height={radius * 2}
        clipPath={`url(#clip-${member.id})`}
        style={{ filter: 'grayscale(35%) contrast(1.05) brightness(0.95)' }}
      />
      <text
        y={radius + 18}
        textAnchor="middle"
        className="fill-text-muted font-mono"
        style={{ fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        {member.name}
      </text>
    </g>
  );
}
