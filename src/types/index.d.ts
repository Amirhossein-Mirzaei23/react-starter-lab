// // src/types/index.d.ts
// export * from "./user";
// export * from "./product";
// export * from "./api";
export interface userDto {
  id: number;
  name: string;
  email?: string;
  gender?: 'male' | 'female';
  image?: string;
  phone: string;
}
