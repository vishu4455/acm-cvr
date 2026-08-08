import { create } from 'zustand';

export type CursorMode = 'default' | 'text' | 'button' | 'canvas-hotspot' | 'disabled';

interface CursorState {
  screenX: number;
  screenY: number;
  worldX: number;
  worldY: number;
  active: boolean;
  mode: CursorMode;
  setScreenPosition: (x: number, y: number) => void;
  setWorldPosition: (x: number, y: number) => void;
  setActive: (active: boolean) => void;
  setMode: (mode: CursorMode) => void;
}

/**
 * Read via useCursorStore.getState() inside useFrame / pointermove handlers —
 * never via the reactive hook form there, or every frame becomes a React render.
 * The reactive hook form (useCursorStore(selector)) is fine for one-off UI,
 * e.g. CustomCursor's own JSX reading `mode` to pick a class name.
 */
export const useCursorStore = create<CursorState>((set) => ({
  screenX: 0,
  screenY: 0,
  worldX: 0,
  worldY: 0,
  active: false,
  mode: 'default',
  setScreenPosition: (screenX, screenY) => set({ screenX, screenY, active: true }),
  setWorldPosition: (worldX, worldY) => set({ worldX, worldY }),
  setActive: (active) => set({ active }),
  setMode: (mode) => set({ mode }),
}));
