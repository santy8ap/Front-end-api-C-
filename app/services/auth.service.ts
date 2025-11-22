// app/services/auth.service.ts
import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

export class AuthService {
  /**
   * Iniciar sesión
   * POST /auth/login
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 Iniciando sesión...', { email: credentials.email });
      
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      console.log('✅ Login exitoso:', {
        userId: response.data.id,
        userName: response.data.userName,
        roleId: response.data.roleId
      });
      
      // Guardar token en cookie
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        
        // Guardar usuario en localStorage
        const user = {
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
          roleId: response.data.roleId,
          createdAt: response.data.createAt,
          updatedAt: response.data.updateAt,
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log('💾 Usuario guardado en localStorage');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error en login:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
      } else {
        console.error('❌ Error desconocido en login:', error);
      }
      throw error;
    }
  }

  /**
   * Registrar nuevo usuario
   * POST /auth/register
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('📝 Registrando usuario...', {
        userName: userData.userName,
        email: userData.email,
        roleId: userData.roleId
      });
      
      // Asegurar que roleId sea número
      const payload = {
        ...userData,
        roleId: Number(userData.roleId)
      };
      
      const response = await api.post<AuthResponse>('/auth/register', payload);
      
      console.log('✅ Registro exitoso:', {
        userId: response.data.id,
        userName: response.data.userName,
        roleId: response.data.roleId
      });
      
      // Guardar token en cookie
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        
        // Guardar usuario en localStorage
        const user = {
          id: response.data.id,
          userName: response.data.userName,
          email: response.data.email,
          roleId: response.data.roleId,
          createdAt: response.data.createAt,
          updatedAt: response.data.updateAt,
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log('💾 Usuario guardado en localStorage');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error en register:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
      } else {
        console.error('❌ Error desconocido en register:', error);
      }
      throw error;
    }
  }

  /**
   * Cerrar sesión
   */
  static logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    // Limpiar cookie y localStorage
    Cookies.remove('token');
    localStorage.removeItem('user');
    
    // Redirigir al login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    
    console.log('✅ Sesión cerrada');
  }

  /**
   * Obtener usuario actual desde localStorage
   */
  static getCurrentUser() {
    if (typeof window !== 'undefined') {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          console.log('👤 Usuario actual:', {
            id: user.id,
            userName: user.userName,
            roleId: user.roleId
          });
          return user;
        }
      } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    const hasToken = !!Cookies.get('token');
    const hasUser = !!localStorage.getItem('user');
    const isAuth = hasToken && hasUser;
    
    console.log('🔍 Estado de autenticación:', {
      hasToken,
      hasUser,
      isAuthenticated: isAuth
    });
    
    return isAuth;
  }

  /**
   * Refrescar el token (si el backend lo soporta)
   */
  static async refreshToken(): Promise<void> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh');
      
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 7,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        console.log('🔄 Token refrescado exitosamente');
      }
    } catch (error) {
      console.error('❌ Error al refrescar token:', error);
      this.logout();
    }
  }
}