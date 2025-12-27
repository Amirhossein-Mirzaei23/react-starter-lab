import { userDto } from '../../types';

export type userInfoStore = {
  userInfo: userDto;
  token: string;
  setToken: (val: string) => void;
  setUserInfo: (userInfo: userDto) => void;
  getUserInfo: () => userDto;
  getToken: () => string;
  clearUserInfo: () => void;
  clearToken: () => void;
};
