// userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserInfoStore } from './userStore.types';

export const useUserStore = create<UserInfoStore>()(
  persist(
    (set, get) => ({
      userInfo: null,
      token: '',

      setToken: (val: string) => set({ token: val }),
      setUserInfo: (userInfo) => set({ userInfo }),
      getUserInfo: () => get().userInfo,
      getToken: () => get().token,
      clearUserInfo: () => set({ userInfo: null }),
      clearToken: () => set({ token: '' }),
      isAuthenticated: () => {
        const state = get();
        return Boolean(state.token && state.userInfo?.id);
      },
    }),
    {
      name: 'user-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        userInfo: state.userInfo, 
        token: state.token 
      })
    },
  ),
);
