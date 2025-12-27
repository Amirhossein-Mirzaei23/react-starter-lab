export interface friendDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FindUserPayload {
  phone: string;
}
export interface SendFriendRequestPayload {
  senderId: number;
  receiverId: number;
}
export interface AcceptFriendRequestpayload {
  friendshipId: number;
}
