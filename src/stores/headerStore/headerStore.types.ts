export interface HeaderState {

    avatar: boolean;
    title: string;
    hasSidePageTitle: boolean;
    sidePageTitle: SidePageTitle;
    backButton: boolean;
    appIcon: boolean;

    toggleBackButton: () => void;
    toggleAvatar: () => void;
    toggleAppIcon: () => void;
    toggleSidePageTitle: () => void;

    setTitle: (value: string) => void;
    setSidePageTitle: (value: SidePageTitle) => void;

}

export interface SidePageTitle {
    title: string;
    subTitle: string;
}
