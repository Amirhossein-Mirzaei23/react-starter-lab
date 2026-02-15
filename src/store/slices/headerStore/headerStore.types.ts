export interface HeaderState {
  avatar: boolean;
  title: string;
  backButton: boolean;
  hasBackground: boolean;
  appIcon: boolean;
  isSticky: boolean;
  toggleBackButton: (value: boolean) => void;
  hasAvatar: (value: boolean) => void;
  setStickyPostion: (value: boolean) => void;
  sethasBackground: (value: boolean) => void;
  toggleAppIcon: (value: boolean) => void;
  setTitle: (value: string) => void;
}

export interface SidePageTitle {
  title: string;
  subTitle: string;
}
