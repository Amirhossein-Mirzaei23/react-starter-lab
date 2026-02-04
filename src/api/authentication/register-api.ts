// src/api/authentication/register-api.ts
import { API_URL } from '../../App';
import { apiClient } from '../http';
import { UserRegisterPayload, UserRegisterResponse } from './authentication.types';

export async function userRegisterApi(payload: UserRegisterPayload): Promise<UserRegisterResponse> {
  return apiClient.post<UserRegisterResponse>(`${API_URL}/auth/register`, payload);
}
