import { create } from "zustand";
import { HeaderState, SidePageTitle } from "./headerStore.types";

export const useHeaderStore = create<HeaderState>((set) => ({
  avatar: true,
  title: "",
  hasSidePageTitle: false,
  sidePageTitle: { title: "", subTitle: "" },
  backButton: true,
  appIcon: false,

  toggleBackButton: () =>
    set((state) => ({ backButton: !state.backButton })),
  toggleAvatar: () =>
    set((state) => ({ avatar: !state.avatar })),
  toggleAppIcon: () =>
    set((state) => ({ appIcon: !state.appIcon })),
  toggleSidePageTitle: () =>
    set((state) => ({ hasSidePageTitle: !state.hasSidePageTitle })),

  setTitle: (value: string) =>
    set(() => ({ title: value })),

  setSidePageTitle: (value: SidePageTitle) =>
    set(() => ({ sidePageTitle: value })),
}));
