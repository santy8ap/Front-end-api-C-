import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

const USE_MOCK = false;

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 7,
          sameSite: 'strict'
        });
        
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
          roleId: response.data.roleId,
          createdAt: response.data.createAt,
          updatedAt: response.data.updateAt,
        }));
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error en login:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido en login:', error);
      }
      throw error;
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 7,
          sameSite: 'strict'
        });
        
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
          roleId: response.data.roleId,
          createdAt: response.data.createAt,
          updatedAt: response.data.updateAt,
        }));
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error en register:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido en register:', error);
      }
      throw error;
    }
  }

  static logout(): void {
    Cookies.remove('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  static getCurrentUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  static isAuthenticated(): boolean {
    return !!Cookies.get('token');
  }
}