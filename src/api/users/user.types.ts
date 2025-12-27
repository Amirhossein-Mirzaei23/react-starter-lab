
export interface FriendDto {
  id: number;
  image?: string;
  name: string;
}

export interface updateUserPayload {
  name: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  password?: string;
}
