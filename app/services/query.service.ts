import api from './api';
import { Query, ExecuteQueryRequest, QueryResult } from '../types/query.types';
import { AxiosError } from 'axios';

const USE_MOCK = false;

export class QueryService {
  static async executeQuery(data: ExecuteQueryRequest): Promise<QueryResult> {
    try {
      const response = await api.post<QueryResult>('/queries/execute', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error ejecutando query:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido ejecutando query:', error);
      }
      throw error;
    }
  }

  static async createQuery(data: Omit<Query, 'id' | 'createdAt'>): Promise<Query> {
    try {
      const response = await api.post<Query>('/queries', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error creando query:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido creando query:', error);
      }
      throw error;
    }
  }

  static async getStudentQueries(): Promise<Query[]> {
    try {
      const response = await api.get<Query[]>('/queries/student');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo queries del estudiante:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo queries del estudiante:', error);
      }
      throw error;
    }
  }

  static async getQueryById(id: string): Promise<Query> {
    try {
      const response = await api.get<Query>(`/queries/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo query:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo query:', error);
      }
      throw error;
    }
  }

  static async getAllQueries(): Promise<Query[]> {
    try {
      const response = await api.get<Query[]>('/queries');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo todas las queries:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo todas las queries:', error);
      }
      throw error;
    }
  }
}