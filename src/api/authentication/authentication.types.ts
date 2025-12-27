import { userDto } from '../../types';

export interface UserLoginPayload {
  phone: string;
  password: string;
}

export type UserLoginResponse = {
  data: { token: string; user: userDto };
  message: string;
  // هر فیلد دیگری که بک‌اند برمی‌گرداند
  [k: string]: any;
};

export type UserRegisterPayload = {
  name: string;
  phone: string;
  email?: string;
  gender?: 'male' | 'female';
  password: string;
};

export type UserRegisterResponse = {
  data: { token: string; userData: userDto };
  message: string;
  // هر فیلد دیگری که بک‌اند برمی‌گرداند
  [k: string]: any;
};
