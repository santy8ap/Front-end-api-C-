export interface User {
  id: string;
  userName: string;    
  email: string;
  roleId: number;      
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;    
  email: string;
  roleId: number;      
  password: string;
}

export interface AuthResponse {
  id: string;
  userName: string;
  email: string;
  roleId: number;
  token: string;
  refreshToken?: string;
  refreshTokenExpire?: string;
  createAt: string;
  updateAt: string;
}