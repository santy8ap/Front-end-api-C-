// app/services/query.service.ts
import api from './api';
import { Query, ExecuteQueryRequest, QueryResult } from '../types/query.types';
import { AxiosError } from 'axios';

export class QueryService {
  /**
   * Ejecutar query SQL
   * POST /queries/execute
   */
  static async executeQuery(data: ExecuteQueryRequest): Promise<QueryResult> {
    try {
      console.log('⚡ Ejecutando query:', {
        instanceId: data.instanceId,
        queryLength: data.query.length,
        preview: data.query.substring(0, 100) + (data.query.length > 100 ? '...' : '')
      });
      
      const response = await api.post<QueryResult>('/queries/execute', data);
      
      console.log('✅ Query ejecutado:', {
        columns: response.data.columns?.length || 0,
        rows: response.data.rowCount,
        time: response.data.executionTime + 'ms'
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error ejecutando query:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          sqlError: error.response?.data?.error
        });
      } else {
        console.error('❌ Error desconocido ejecutando query:', error);
      }
      throw error;
    }
  }

  /**
   * Crear query (guardar sin ejecutar)
   * POST /queries
   */
  static async createQuery(data: Omit<Query, 'id' | 'createdAt'>): Promise<Query> {
    try {
      console.log('💾 Creando query:', {
        instanceId: data.instanceId,
        queryLength: data.sqlQuery.length
      });
      
      const response = await api.post<Query>('/queries', data);
      
      console.log('✅ Query creado:', {
        id: response.data.id,
        status: response.data.status
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error creando query:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido creando query:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener queries del estudiante actual
   * GET /queries/student
   */
  static async getStudentQueries(): Promise<Query[]> {
    try {
      console.log('📋 Obteniendo queries del estudiante...');
      
      const response = await api.get<Query[]>('/queries/student');
      
      console.log('✅ Queries obtenidos:', response.data.length);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo queries del estudiante:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo queries del estudiante:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener query por ID
   * GET /queries/{id}
   */
  static async getQueryById(id: string): Promise<Query> {
    try {
      console.log('🔍 Obteniendo query:', id);
      
      const response = await api.get<Query>(`/queries/${id}`);
      
      console.log('✅ Query obtenido:', {
        id: response.data.id,
        status: response.data.status
      });
      
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo query:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo query:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener todas las queries (solo admin)
   * GET /queries
   */
  static async getAllQueries(): Promise<Query[]> {
    try {
      console.log('📋 Obteniendo todas las queries...');
      
      const response = await api.get<Query[]>('/queries');
      
      console.log('✅ Todas las queries obtenidas:', response.data.length);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo todas las queries:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo todas las queries:', error);
      }
      throw error;
    }
  }

  /**
   * Eliminar query
   * DELETE /queries/{id}
   */
  static async deleteQuery(id: string): Promise<void> {
    try {
      console.log('🗑️ Eliminando query:', id);
      
      await api.delete(`/queries/${id}`);
      
      console.log('✅ Query eliminado exitosamente');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error eliminando query:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido eliminando query:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener historial de queries con filtros
   * GET /queries/history?instanceId=...&status=...
   */
  static async getQueryHistory(filters?: {
    instanceId?: string;
    status?: string;
    limit?: number;
  }): Promise<Query[]> {
    try {
      console.log('📚 Obteniendo historial con filtros:', filters);
      
      const params = new URLSearchParams();
      if (filters?.instanceId) params.append('instanceId', filters.instanceId);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      
      const response = await api.get<Query[]>(`/queries/history?${params.toString()}`);
      
      console.log('✅ Historial obtenido:', response.data.length);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo historial:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo historial:', error);
      }
      throw error;
    }
  }

  /**
   * Validar sintaxis SQL (si el backend lo soporta)
   * POST /queries/validate
   */
  static async validateQuery(query: string): Promise<{ valid: boolean; errors?: string[] }> {
    try {
      console.log('✔️ Validando sintaxis SQL...');
      
      const response = await api.post<{ valid: boolean; errors?: string[] }>(
        '/queries/validate',
        { query }
      );
      
      console.log('✅ Validación completada:', response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error validando query:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido validando query:', error);
      }
      throw error;
    }
  }
}