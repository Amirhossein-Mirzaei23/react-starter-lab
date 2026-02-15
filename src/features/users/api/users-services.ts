import { API_URL } from '@/App';
import { apiClient } from '@/services/http';
import { userDto } from '@/types';
import { updateUserPayload } from './user.types';

export async function getUserDataApi(userId: number): Promise<userDto> {
  return apiClient.get<userDto>(`${API_URL}/users/${userId}`);
}

export async function updateUserDataApi(payload: updateUserPayload): Promise<userDto> {
  return apiClient.patch<userDto>(`${API_URL}/users`, payload);
}
