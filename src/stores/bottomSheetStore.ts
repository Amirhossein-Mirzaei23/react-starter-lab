// src/store/bottomSheetStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

interface BottomSheetState {
  isOpen: boolean;
  title: string;
  bodyContent: ReactNode;
  footer: ReactNode;
  setBottomSheet: (config: {
    isOpen: boolean;
    title?: string;
    bodyContent?: ReactNode;
    footer?: ReactNode;
  }) => void;
  toggleBottomSheet: () => void;
  closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  title: 'Default Title',
  bodyContent: null,
  footer: null,
  setBottomSheet: ({ isOpen, title, bodyContent, footer }) =>
    set((state) => ({
      isOpen,
      title: title ?? state.title,
      bodyContent: bodyContent ?? state.bodyContent,
      footer: footer ?? state.footer,
    })),
  toggleBottomSheet: () =>
    set((state) => ({ isOpen: !state.isOpen })),
  closeBottomSheet: () =>
    set({ isOpen: false, title: 'Default Title', bodyContent: null, footer: null }),
}));