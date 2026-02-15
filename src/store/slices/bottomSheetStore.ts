import { create } from 'zustand';
import { ReactNode } from 'react';
import { ConditionalValue } from '@chakra-ui/react';

interface BottomSheetState {
  isOpen: boolean;
  title: string;
  bodyContent: ReactNode;
  footer: ReactNode;
  size: ConditionalValue<'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'full' | undefined>;
  BottomSheetContent: ReactNode;
  setBottomSheet: (config: {
    isOpen: boolean;
    title?: string;
    size?: ConditionalValue<'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'full' | undefined>;
    bodyContent?: ReactNode;
    BottomSheetContent?: ReactNode;
    footer?: ReactNode;
  }) => void;
  toggleBottomSheet: () => void;
  closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isOpen: false,
  title: 'Default Title',
  bodyContent: null,
  size: '',
  BottomSheetContent: null,
  footer: null,
  setBottomSheet: ({ isOpen, title, bodyContent, footer, BottomSheetContent, size }) =>
    set((state) => ({
      isOpen,
      title: title ?? state.title,
      size: size, // "xs", "sm", "md", "lg", "xl", "full"
      BottomSheetContent: BottomSheetContent ?? state.BottomSheetContent,
      bodyContent: bodyContent ?? state.bodyContent,
      footer: footer ?? state.footer,
    })),
  toggleBottomSheet: () => set((state) => ({ isOpen: !state.isOpen })),
  closeBottomSheet: () =>
    set({
      isOpen: false,
      title: 'Default Title',
      bodyContent: null,
      footer: null,
      BottomSheetContent: null,
      size: 'sm',
    }),
}));
