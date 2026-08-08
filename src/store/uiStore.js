import { create } from 'zustand';
export const useUIStore = create((set) => ({
    activeSection: 'home',
    navScrolled: false,
    selectedMemberId: null,
    setActiveSection: (id) => set({ activeSection: id }),
    setNavScrolled: (scrolled) => set({ navScrolled: scrolled }),
    openMemberProfile: (id) => set({ selectedMemberId: id }),
    closeMemberProfile: () => set({ selectedMemberId: null }),
}));
