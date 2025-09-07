export interface NavigationState {
  visibleSections: {
    avatar: boolean;
    title: string;
    hasSidePageTitle: boolean;
    sidePageTitle: SidePageTitle;
    backButton: boolean;
    appIcon:boolean
  };
  toggleSection: (key: keyof NavigationState["visibleSections"]) => void;
  setSection: (
    key: keyof NavigationState["visibleSections"],
    value: boolean | SidePageTitle
  ) => void;
}
export interface SidePageTitle {
  title: string;
  subTitle: string;
}
