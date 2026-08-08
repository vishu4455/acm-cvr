import { create } from 'zustand';

interface PerformanceState {
  tier: 'high' | 'low';
  reducedMotion: boolean;
  isTouch: boolean;
  init: () => void;
}

/**
 * Computed once, early (called from App on mount). Both the /three layer
 * and Team's graph layout read this to decide trace count, branch depth,
 * and whether to run the force simulation at all.
 */
export const usePerformanceStore = create<PerformanceState>((set) => ({
  tier: 'high',
  reducedMotion: false,
  isTouch: false,
  init: () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const tier: 'high' | 'low' = cores <= 4 || isTouch ? 'low' : 'high';
    set({ tier, reducedMotion, isTouch });
  },
}));
