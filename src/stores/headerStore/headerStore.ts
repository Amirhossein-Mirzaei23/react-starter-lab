import { create } from "zustand";
import { NavigationState } from "./headerStore.types";


export const useHeaderStore = create<NavigationState>((set) => ({
  visibleSections: {
    avatar: true,
    title: 'aa',
    hasSidePageTitle:false,
    sidePageTitle:{title:'',subTitle:''},
    backButton: true,
    appIcon:false,
  },
  toggleSection: (key) =>
    set((state) => ({
      visibleSections: {
        ...state.visibleSections,
        [key]: !state.visibleSections[key],
      },
    })),
  setSection: (key, value) =>
    set((state) => ({
      visibleSections: {
        ...state.visibleSections,
        [key]: value,
      },
    })),
}));
