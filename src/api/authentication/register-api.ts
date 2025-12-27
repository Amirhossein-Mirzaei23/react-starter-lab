// src/api/users.ts
import { apiUrl } from '../../App';
import { apiClient } from '../http';
import { UserRegisterPayload, UserRegisterResponse } from './authentication.types';

export async function userRegisterApi(payload: UserRegisterPayload): Promise<UserRegisterResponse> {
  return apiClient.post<UserRegisterResponse>(`${apiUrl}/auth/register`, payload);
}
