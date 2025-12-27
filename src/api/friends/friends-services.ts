import { apiUrl } from '../../App';
import { userDto } from '../../types';
import { apiClient } from '../http';
import {
  AcceptFriendRequestpayload,
  FindUserPayload,
  SendFriendRequestPayload,
} from './friends.types';

export const getBillsList = async () => {
  const res = await fetch(`${apiUrl}/friends`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
};

export async function findUserApi(
  payload: FindUserPayload,
): Promise<{ data: userDto; message: string }> {
  return apiClient.post<{ data: userDto; message: string }>(`${apiUrl}/users/find`, payload);
}

export async function sendFriendshipRequestApi(payload: SendFriendRequestPayload): Promise<any> {
  return apiClient.post<{ data: userDto; message: string }>(`${apiUrl}/friendship/send`, payload);
}

export async function friendshipRequestsListApi(userId: number): Promise<any> {
  return apiClient.get<{ data: userDto; message: string }>(
    `${apiUrl}/friendship/pending/${userId}`,
  );
}
export async function friendsListApi(userId: number): Promise<any> {
  return apiClient.get<{ data: userDto; message: string }>(`${apiUrl}/friendship/list/${userId}`);
}

export async function acceptFriendshipRequestApi(
  payload: AcceptFriendRequestpayload,
): Promise<any> {
  return apiClient.patch<{ data: userDto; message: string }>(
    `${apiUrl}/friendship/accept`,
    payload,
  );
}
