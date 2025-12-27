import { apiUrl } from '../../App';
import { userDto } from '../../types';
import { apiClient } from '../http';
import { updateUserPayload } from './user.types';

export async function updateUserDataApi(
  userId: number,
  payload: updateUserPayload,
): Promise<userDto> {
  return apiClient.put<userDto>(`${apiUrl}/users/${userId}`, payload);
}

export async function getUserDataApi(userId: number): Promise<userDto> {
  return apiClient.get<userDto>(`${apiUrl}/users/${userId}`);
}

export async function findUserDataByPhoneApi(payload: { phone: string }): Promise<userDto> {
  return apiClient.post<userDto>(`${apiUrl}/users/find`, payload);
}
