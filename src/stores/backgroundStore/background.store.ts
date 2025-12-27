// src/store/background.store.ts
import { create } from 'zustand';

interface BackgroundState {
  backgroundHex: string | null;
  setBackground: (hex: string | null) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  backgroundHex: null, // default = null → gradient
  setBackground: (hex) => set({ backgroundHex: hex }),
}));
