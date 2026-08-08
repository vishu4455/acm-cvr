# CVR ACM Student Chapter — Redesign

Production scaffold for the circuit/motherboard-themed redesign, implementing
the architecture defined in `project-architecture-tech-club.md`. Content is
sourced from the live site at https://cvracm.vercel.app/.

## Setup

```bash
npm install
npm run dev
```

Real assets are now in place for the chapter logo (`public/brand/`, used in the
navbar and favicon) and one team photo (`public/team/nidhi.jpg`, cropped from
her official member card). The remaining team members in `src/data/team.ts`
still point at placeholder filenames (`/team/<name>.png`) — drop matching
photos into `public/team/` to fill them in; a missing image just renders as a
broken-image icon inside the circular mask, nothing else in the layout
depends on it loading.

## What's implemented vs. spec'd

This scaffold implements the core architecture end-to-end — routing/code-splitting,
the three Zustand stores, the cursor dual-tracking system, the R3F hero scene
(CPU + PCB-legal signal paths + cursor distortion), and the Team SVG graph
(force-sim + grid-snap layout, hover spotlight, click → modal). A few things
are intentionally left as straightforward extensions rather than built out
fully here, since they don't change the architecture:

- **Shaders**: `SignalTrace`'s dash-offset animation uses Drei's built-in
  `Line` dash props rather than a custom GLSL shader — functionally
  equivalent for this scene's needs, and simpler to maintain. Swap in a
  custom shader if finer control over the pulse's leading-edge brightness
  (the `trace-pulse` token) is needed later.
- **Domains/Events data**: only reflects what's currently live on the source
  site (one domain, two event links) — the data shapes already support more.
- **Page transitions**: the sweep-line pattern from the motion system doc
  isn't wired into React Router's navigation yet — the three standalone
  routes currently transition with a plain Suspense fallback.
- **Real photography grading**: the CSS `filter: grayscale()` treatment is
  applied inline per the spec; a build-time image processing step would be
  worth adding once real photos are in place, so the grade doesn't run on
  every client.

## Folder structure

See `project-architecture-tech-club.md` for the full rationale. Short version:
`/three` = continuous per-frame WebGL code, `/animation` = one-shot GSAP
timelines, `/store` = the three Zustand stores, `/sections` = one folder per
homepage anchor, `/data` = real chapter content.
