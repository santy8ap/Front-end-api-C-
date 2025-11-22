import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_URL } from '../utils/constants';
import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 Token agregado a la petición: ${config.method?.toUpperCase()} ${config.url}`);
    } else {
      console.warn('⚠️ No hay token disponible para la petición');
    }
    
    console.log(`📡 REQUEST: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log(`✅ RESPONSE: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error(`❌ ERROR RESPONSE: ${error.response?.status} ${error.config?.url}`);
    console.error('Detalles:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.warn('🔐 Token expirado o inválido - Redirigiendo a login');
      Cookies.remove('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;