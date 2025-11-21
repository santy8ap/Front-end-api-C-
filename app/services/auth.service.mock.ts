import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import Cookies from 'js-cookie';

export class AuthServiceMock {
  private static mockUsers: Array<{
    id: string;
    userName: string;
    email: string;
    password: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
  }> = [
    {
      id: '1',
      email: 'admin@test.com',
      password: '123456',
      userName: 'Admin Sistema',
      roleId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'teacher@test.com',
      password: '123456',
      userName: 'Profesor Juan',
      roleId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'estudiante@test.com',
      password: '123456',
      userName: 'Juan Estudiante',
      roleId: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = this.mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw { response: { data: { message: 'Email o contraseña incorrectos' } } };
    }

    const { password, ...userWithoutPassword } = user;
    const token = 'mock-jwt-token-' + Date.now();

    Cookies.set('token', token, { expires: 7 });
    localStorage.setItem('user', JSON.stringify({
      id: userWithoutPassword.id,
      userName: userWithoutPassword.userName,
      email: userWithoutPassword.email,
      roleId: userWithoutPassword.roleId,
      createdAt: userWithoutPassword.createdAt,
      updatedAt: userWithoutPassword.updatedAt,
    }));

    return {
      id: userWithoutPassword.id,
      userName: userWithoutPassword.userName,
      email: userWithoutPassword.email,
      roleId: userWithoutPassword.roleId,
      token,
      refreshToken: 'mock-refresh-token',
      refreshTokenExpire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createAt: userWithoutPassword.createdAt,
      updateAt: userWithoutPassword.updatedAt,
    };
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (this.mockUsers.find(u => u.email === userData.email)) {
      throw { response: { data: { message: 'El email ya está registrado' } } };
    }

    const newUser = {
      id: String(this.mockUsers.length + 1),
      email: userData.email,
      password: userData.password,
      userName: userData.userName,
      roleId: userData.roleId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mockUsers.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    const token = 'mock-jwt-token-' + Date.now();

    Cookies.set('token', token, { expires: 7 });
    localStorage.setItem('user', JSON.stringify({
      id: userWithoutPassword.id,
      userName: userWithoutPassword.userName,
      email: userWithoutPassword.email,
      roleId: userWithoutPassword.roleId,
      createdAt: userWithoutPassword.createdAt,
      updatedAt: userWithoutPassword.updatedAt,
    }));

    return {
      id: userWithoutPassword.id,
      userName: userWithoutPassword.userName,
      email: userWithoutPassword.email,
      roleId: userWithoutPassword.roleId,
      token,
      refreshToken: 'mock-refresh-token',
      refreshTokenExpire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createAt: userWithoutPassword.createdAt,
      updateAt: userWithoutPassword.updatedAt,
    };
  }

  static logout(): void {
    Cookies.remove('token');
    localStorage.removeItem('user');
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