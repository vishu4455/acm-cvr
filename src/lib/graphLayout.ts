import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import type { GraphEdge } from '@/data/team';

export interface GraphNodeInput {
  id: string;
  radius: number; // node visual radius — used for collision spacing
}

export interface LaidOutNode extends GraphNodeInput {
  x: number;
  y: number;
}

const GRID = 8; // px — snap final positions to the same 4/8px grid as everything else

function snap(value: number) {
  return Math.round(value / GRID) * GRID;
}

/**
 * Runs a force simulation once (synchronously, ticked to completion) purely
 * to resolve non-overlapping relative positions, then snaps every result to
 * the layout grid. This is the "physics does the hard work, the grid keeps
 * it looking engineered" approach from the Team section spec — the output
 * should never look like a floating organic mind-map.
 */
export function computeGraphLayout(
  nodes: GraphNodeInput[],
  edges: GraphEdge[],
  width: number,
  height: number
): LaidOutNode[] {
  type SimNode = GraphNodeInput & { x: number; y: number; index?: number };
  const simNodes: SimNode[] = nodes.map((n) => ({ ...n, x: width / 2, y: height / 2 }));

  // forceLink MUTATES its input edge objects — it resolves each edge's
  // source/target from an id string into a direct reference to the
  // resolved node object, as a side effect of running the simulation.
  // The caller (TeamGraph) reuses the same edges array afterward to render
  // <line> elements keyed by source/target id strings — if we hand forceLink
  // the real array, those become object references and every lookup by id
  // silently fails, which is exactly what was making every edge disappear.
  // Cloning each edge here keeps the caller's array untouched.
  const simEdges = edges.map((e) => ({ ...e }));

  const sim = forceSimulation(simNodes)
    .force('link', forceLink<SimNode, GraphEdge & { source: string; target: string }>(simEdges as any)
      .id((d: any) => d.id)
      .distance(90))
    .force('charge', forceManyBody().strength(-140))
    .force('center', forceCenter(width / 2, height / 2))
    .force('collide', forceCollide<SimNode>((d) => d.radius + 16))
    .stop();

  for (let i = 0; i < 300; i++) sim.tick();

  return simNodes.map((n) => ({
    id: n.id,
    radius: n.radius,
    x: snap(n.x),
    y: snap(n.y),
  }));
}
