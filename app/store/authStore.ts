import { create } from 'zustand';
import { User } from '../types/auth.types';
import { AuthService } from '../services/auth.service'; // ← CAMBIAR AQUÍ

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  logout: () => {
    AuthService.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  initialize: () => {
    const user = AuthService.getCurrentUser();
    const isAuthenticated = AuthService.isAuthenticated();
    set({ user, isAuthenticated, isLoading: false });
  },
}));