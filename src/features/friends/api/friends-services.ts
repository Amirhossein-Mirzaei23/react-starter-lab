import { API_URL } from '@/App';
import { userDto } from '@/types';
import { apiClient } from '@/services/http';
import {
  AcceptFriendRequestpayload,
  FindUserPayload,
  SendFriendRequestPayload,
} from './friends.types';

export const getBillsList = async () => {
  const res = await fetch(`${API_URL}/friends`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};

export async function findUserApi(
  payload: FindUserPayload,
): Promise<{ data: userDto; message: string }> {
  return apiClient.post<{ data: userDto; message: string }>(`${API_URL}/users/find`, payload);
}

export async function sendFriendshipRequestApi(payload: SendFriendRequestPayload): Promise<any> {
  return apiClient.post<{ data: userDto; message: string }>(`${API_URL}/friendship/send`, payload);
}

export async function friendshipRequestsListApi(userId: number): Promise<any> {
  return apiClient.get<{ data: userDto; message: string }>(
    `${API_URL}/friendship/pending/${userId}`,
  );
}
export async function friendsListApi(userId: number): Promise<any> {
  return apiClient.get<{ data: userDto; message: string }>(`${API_URL}/friendship/list/${userId}`);
}

export async function acceptFriendshipRequestApi(
  payload: AcceptFriendRequestpayload,
): Promise<any> {
  return apiClient.patch<{ data: userDto; message: string }>(
    `${API_URL}/friendship/accept`,
    payload,
  );
}
