import { create } from 'zustand';
import { toaster } from '@/components/ui/toaster';

export interface showSnackBarPayload {
  title?: string;
  description: string;
  type: snackbarTypesEnum;
}
export interface SnackBarStore {
  showSnackbar: (payload: showSnackBarPayload) => void;
}

export enum snackbarTypesEnum {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export const useSnackBarStore = create<SnackBarStore>(() => ({
  showSnackbar: (payload) => {
    console.log('show snackbar');

    toaster.create({
      title: payload.title || null,
      description: payload.description,
      type: payload.type,
      closable: true,
    });
  },
}));
