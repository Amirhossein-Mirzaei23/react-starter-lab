// useAuth.ts (Custom Hook)
import { useUserStore } from '../stores/userStore/userStore';
import { useCallback } from 'react';
import { userDto } from '../types';

const useAuth = () => {
  const setToken = useUserStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const setAuthData = useCallback(
    async (token: string, user: userDto) => {
      // Call the utility function to handle the setting of token/user
      // Set data into the store
      setToken(token);
      setUserInfo(user);
    },
    [setToken, setUserInfo],
  );

  const removeAuthData = useCallback(() => {
    setToken(null);
    setUserInfo(null);
  }, [setToken, setUserInfo]);

  return { setAuthData, removeAuthData };
};

export default useAuth;
