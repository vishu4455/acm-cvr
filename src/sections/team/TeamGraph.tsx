import { useMemo, useState } from 'react';
import { coreCommittee, leadsAndCoLeads, facultyCoordinator, buildTeamGraphEdges } from '@/data/team';
import { computeGraphLayout, GraphNodeInput } from '@/lib/graphLayout';
import { TeamNode } from './TeamNode';
import { useUIStore } from '@/store/uiStore';

const WIDTH = 900;
const HEIGHT = 560;

export function TeamGraph() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const openMemberProfile = useUIStore((s) => s.openMemberProfile);

  const edges = useMemo(() => buildTeamGraphEdges(), []);

  const nodeInputs: GraphNodeInput[] = useMemo(() => [
    { id: facultyCoordinator.id, radius: 30 },
    ...coreCommittee.map((m) => ({ id: m.id, radius: 26 })),
    ...leadsAndCoLeads.map((m) => ({ id: m.id, radius: 20 })),
  ], []);

  const layout = useMemo(
    () => computeGraphLayout(nodeInputs, edges, WIDTH, HEIGHT),
    [nodeInputs, edges]
  );

  const positionById = useMemo(() => {
    const map = new Map<string, { x: number; y: number; radius: number }>();
    layout.forEach((n) => map.set(n.id, n));
    return map;
  }, [layout]);

  const connectedIds = useMemo(() => {
    if (!hoveredId) return null;
    const set = new Set<string>([hoveredId]);
    edges.forEach((e) => {
      if (e.source === hoveredId) set.add(e.target);
      if (e.target === hoveredId) set.add(e.source);
    });
    return set;
  }, [hoveredId, edges]);

  const allMembers = [...coreCommittee, ...leadsAndCoLeads];

  return (
    <div className="hidden md:block overflow-x-auto">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="group" aria-label="Team network">
        <g opacity={0.9}>
          {edges.map((edge, i) => {
            const a = positionById.get(edge.source);
            const b = positionById.get(edge.target);
            if (!a || !b) return null;
            const active = connectedIds?.has(edge.source) && connectedIds?.has(edge.target);
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={active ? '#5FA8B8' : '#2A3438'}
                strokeWidth={active ? 1.5 : 1}
                style={{ transition: 'stroke 200ms ease-out' }}
              />
            );
          })}
        </g>

        {/* faculty coordinator node rendered slightly larger, no photo grid needed here
            since FacultyCard already features them above the graph — this node just
            anchors the hierarchy visually */}
        {(() => {
          const root = positionById.get(facultyCoordinator.id);
          if (!root) return null;
          return (
            <circle
              cx={root.x} cy={root.y} r={root.radius}
              fill="#3A3B3F" stroke="#55575D" strokeWidth={2}
            />
          );
        })()}

        {allMembers.map((member) => {
          const pos = positionById.get(member.id);
          if (!pos) return null;
          return (
            <TeamNode
              key={member.id}
              member={member}
              x={pos.x}
              y={pos.y}
              radius={pos.radius}
              dimmed={connectedIds ? !connectedIds.has(member.id) : false}
              onHover={setHoveredId}
              onSelect={openMemberProfile}
            />
          );
        })}
      </svg>
    </div>
  );
}
