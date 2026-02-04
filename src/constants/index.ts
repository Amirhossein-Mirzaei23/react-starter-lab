// Constants for the application
export const APP_CONFIG = {
  API_TIMEOUT: 10000,
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 2 * 60 * 1000, // 2 minutes
  NOTIFICATION_PERMISSION_KEY: 'notification-permission-requested',
  USER_STORAGE_KEY: 'user-auth-storage',
} as const;

export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  FRIENDS_LIST: '/friends-list',
  PROFILE: '/profile',
  GROUPS: '/groups',
  BILLS: '/bills',
} as const;

export const LOCAL_STORAGE_KEYS = {
  USER_AUTH: 'user-auth-storage',
  THEME: 'theme-storage',
  LANGUAGE: 'language-storage',
} as const;
