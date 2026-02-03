// src/types/index.d.ts
export interface UserDto {
  id: number;
  name: string;
  email?: string;
  gender?: 'male' | 'female';
  image?: string;
  phone: string;
}

// Keep legacy export for backward compatibility
export interface userDto extends UserDto {}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success?: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
