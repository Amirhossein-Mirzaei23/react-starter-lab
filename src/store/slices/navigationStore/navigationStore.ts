import { create } from 'zustand';
import { NavigationStore } from './navigationStore.types';

export const useNavigationStore = create<NavigationStore>((set) => ({
  isNavVisible: true,
  showNav: () => set({ isNavVisible: true }),
  hideNav: () => set({ isNavVisible: false }),
}));
