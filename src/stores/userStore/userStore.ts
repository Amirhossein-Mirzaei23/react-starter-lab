// userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userInfoStore } from './userStore.types';

export const useUserStore = create<userInfoStore>()(
  persist(
    (set, get) => ({
      userInfo: { id: 0, name: '', phone: '' },
      token: '',

      setToken: (val: string) => set({ token: val }),
      setUserInfo: (userInfo) => set({ userInfo }),
      getUserInfo: () => get().userInfo,
      getToken: () => get().token,
      clearUserInfo: () => set({ userInfo: { id: 0, name: '', phone: '' } }),
      clearToken: () => set({ token: '' }),
    }),
    {
      name: 'user-auth-storage', // نام کلید در localStorage
      storage: createJSONStorage(() => localStorage), // localStorage به عنوان ذخیره‌ساز
      // اگر نمیخوای همه state پرسیست بشه:
      // partialize: (state) => ({ userInfo: state.userInfo, token: state.token })
    },
  ),
);
