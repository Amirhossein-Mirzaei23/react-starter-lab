import { apiUrl } from '../../App';
import { userDto } from '../../types';
import { apiClient } from '../http';
import { createBillPayload, CreateGroupDto, UpdateGroupDto, UserGroupListPayload } from './groups.types';

export async function createGroupApi(payload: CreateGroupDto): Promise<any> {
  return apiClient.post<{ data: userDto; message: string }>(`${apiUrl}/groups/create`, payload);
}

export async function updateGroupApi(groupId: number, payload: UpdateGroupDto): Promise<any> {
  return apiClient.patch(`${apiUrl}/groups/update/${groupId}`, payload);
}

export async function deleteGroupApi(userId: number, groupId: number): Promise<any> {
  return apiClient.get<{ data: userDto; message: string }>(
    `${apiUrl}/groups/delete/${groupId}/${userId}`,
  );
}
export async function addFriendToGroupApi(
  groupId: number,
  payload: { ownerId: number; friendIds: number[] },
): Promise<any> {
  return apiClient.post<Promise<any>>(`${apiUrl}/groups/${groupId}/add-friends`, payload);
}

export async function removeFriendToGroupApi(
  groupId: number,
  payload: { ownerId: number; friendIds: number[] },
): Promise<any> {
  return apiClient.post<Promise<any>>(`${apiUrl}/groups/${groupId}/remove-friend`, payload);
}

export async function assignBillToGroupApi(
  groupId: number,
  payload: { ownerId: number; billId: number },
): Promise<any> {
  return apiClient.post<Promise<any>>(`${apiUrl}/groups/${groupId}/assign-bill`, payload);
}



export async function createBillForGroupMembers(
  groupId: number,
  payload: createBillPayload,
): Promise<any> {
  return apiClient.post<Promise<any>>(`${apiUrl}/groups/${groupId}/create-bill`, payload);
}


export async function getUserGroupsApi(payload: UserGroupListPayload): Promise<any> {
  return apiClient.post<Promise<any>>(`${apiUrl}/groups/list`, payload);
}

export async function getGroupByIdApi(groupId: number): Promise<any> {
  return apiClient.get<Promise<any>>(`${apiUrl}/groups/${groupId}`);
}
