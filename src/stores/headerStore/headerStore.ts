import { create } from 'zustand';
import { HeaderState, SidePageTitle } from './headerStore.types';

export const useHeaderStore = create<HeaderState>((set) => ({
  avatar: true,
  title: '',
  hasBackground: false,
  backButton: false,
  appIcon: false,
  isSticky: false,
  toggleBackButton: (value: boolean) => set((state) => ({ backButton: value })),
  setStickyPostion: (value: boolean) => set((state) => ({ isSticky: value })),
  hasAvatar: (value: boolean) => set((state) => ({ avatar: value })),
  sethasBackground: (value: boolean) => set((state) => ({ hasBackground: value })),
  toggleAppIcon: (value: boolean) => set((state) => ({ appIcon: value })),
  setTitle: (value: string) => set(() => ({ title: value })),
}));
