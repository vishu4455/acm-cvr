import { create } from 'zustand';

interface UIState {
  activeSection: string;
  navScrolled: boolean;
  selectedMemberId: string | null;
  setActiveSection: (id: string) => void;
  setNavScrolled: (scrolled: boolean) => void;
  openMemberProfile: (id: string) => void;
  closeMemberProfile: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'home',
  navScrolled: false,
  selectedMemberId: null,
  setActiveSection: (id) => set({ activeSection: id }),
  setNavScrolled: (scrolled) => set({ navScrolled: scrolled }),
  openMemberProfile: (id) => set({ selectedMemberId: id }),
  closeMemberProfile: () => set({ selectedMemberId: null }),
}));
