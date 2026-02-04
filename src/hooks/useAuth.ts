// useAuth.ts (Custom Hook)
import { useUserStore } from '../stores/userStore/userStore';
import { useCallback } from 'react';
import { userDto } from '../types';

const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const clearToken = useUserStore((state) => state.clearToken);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  const setAuthData = useCallback(
    async (token: string, user: userDto) => {
      if (!token || !user) {
        throw new Error('Invalid authentication data');
      }
      // Set data into the store
      setToken(token);
      setUserInfo(user);
    },
    [setToken, setUserInfo],
  );

  const removeAuthData = useCallback(() => {
    clearToken();
    clearUserInfo();
  }, [clearToken, clearUserInfo]);

  return { setAuthData, removeAuthData };
};

export default useAuth;
