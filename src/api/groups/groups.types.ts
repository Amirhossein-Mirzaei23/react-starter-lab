export interface CreateGroupDto {
  name: string;
  image?: string;
  ownerId: number;
}

export interface UpdateGroupDto {
  name: string;
  image?: string;
}

export interface UserGroupListPayload {
  userId: number;
  page: number;
  limit: number;
}
export interface createBillPayload {
  creditorId: number;
  title:string
  debtorId?: number;
  groupId?: number;
  amount: number;
}
