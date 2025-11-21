import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import Cookies from 'js-cookie';
import { AuthServiceMock } from './auth.service.mock';

// CAMBIAR A false CUANDO EL BACKEND ESTÉ LISTO
const USE_MOCK = true;

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    if (USE_MOCK) {
      console.log('🔶 Usando MOCK - Cambia USE_MOCK a false cuando el backend esté listo');
      return AuthServiceMock.login(credentials);
    }

    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
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
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    if (USE_MOCK) {
      console.log('🔶 Usando MOCK - Cambia USE_MOCK a false cuando el backend esté listo');
      return AuthServiceMock.register(userData);
    }

    const response = await api.post<AuthResponse>('/auth/register', userData);
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 7 });
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
  }

  static logout(): void {
    if (USE_MOCK) {
      AuthServiceMock.logout();
      return;
    }

    Cookies.remove('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  static getCurrentUser() {
    if (USE_MOCK) {
      return AuthServiceMock.getCurrentUser();
    }

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