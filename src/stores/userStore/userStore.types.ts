import { userDto } from '../../types';

export interface UserInfoStore {
  userInfo: userDto | null;
  token: string;
  setToken: (val: string) => void;
  setUserInfo: (userInfo: userDto) => void;
  getUserInfo: () => userDto | null;
  getToken: () => string;
  clearUserInfo: () => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}
