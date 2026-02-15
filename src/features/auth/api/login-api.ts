// src/api/authentication/login-api.ts
import { API_URL } from '@/App';
import { apiClient } from '@/services/http';
import { UserLoginPayload, UserLoginResponse } from './authentication.types';

export async function userLoginApi(payload: UserLoginPayload): Promise<UserLoginResponse> {
  return apiClient.post<UserLoginResponse>(`${API_URL}/auth/login`, payload);
}
