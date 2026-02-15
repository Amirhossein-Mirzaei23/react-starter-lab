export interface FriendDto {
  id: number;
  name: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
}

export interface updateUserPayload {
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  password?: string;
}
