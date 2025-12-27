// src/api/users.ts
import { apiUrl } from '../../App';
import { apiClient } from '../http';
import { UserLoginPayload, UserLoginResponse } from './authentication.types';

export async function userLoginApi(payload: UserLoginPayload): Promise<UserLoginResponse> {
  return apiClient.post<UserLoginResponse>(`${apiUrl}/auth/login`, payload);
}
