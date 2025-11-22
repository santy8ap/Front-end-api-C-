// app/services/instance.service.ts
import api from './api';
import { DatabaseInstance, CreateInstanceRequest, AssignInstanceRequest } from '../types/instance.types';
import { AxiosError } from 'axios';

export class InstanceService {
  /**
   * Obtener todas las instancias
   * GET /instances
   */
  static async getAll(): Promise<DatabaseInstance[]> {
    try {
      console.log('📋 Obteniendo todas las instancias...');
      
      const response = await api.get<DatabaseInstance[]>('/instances');
      
      console.log('✅ Instancias obtenidas:', response.data.length);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instances:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo instances:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener instancia por ID
   * GET /instances/{id}
   */
  static async getById(id: string): Promise<DatabaseInstance> {
    try {
      console.log('🔍 Obteniendo instancia:', id);
      
      const response = await api.get<DatabaseInstance>(`/instances/${id}`);
      
      console.log('✅ Instancia obtenida:', {
        id: response.data.id,
        name: response.data.name,
        type: response.data.type
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instance:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo instance:', error);
      }
      throw error;
    }
  }

  /**
   * Crear nueva instancia
   * POST /instances
   */
  static async create(data: CreateInstanceRequest): Promise<DatabaseInstance> {
    try {
      console.log('➕ Creando instancia:', {
        name: data.name,
        type: data.type,
        host: data.host,
        port: data.port
      });
      
      const response = await api.post<DatabaseInstance>('/instances', data);
      
      console.log('✅ Instancia creada:', {
        id: response.data.id,
        name: response.data.name,
        type: response.data.type
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error creando instance:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
      } else {
        console.error('❌ Error desconocido creando instance:', error);
      }
      throw error;
    }
  }

  /**
   * Asignar instancia a estudiante
   * POST /instances/assign
   */
  static async assignToStudent(data: AssignInstanceRequest): Promise<void> {
    try {
      console.log('🔗 Asignando instancia:', {
        studentId: data.studentId,
        instanceId: data.instanceId
      });
      
      await api.post('/instances/assign', data);
      
      console.log('✅ Instancia asignada exitosamente');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error asignando instance:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
      } else {
        console.error('❌ Error desconocido asignando instance:', error);
      }
      throw error;
    }
  }

  /**
   * Obtener instancias del estudiante
   * GET /instances/student/{userId}
   */
  static async getStudentInstances(studentId: string): Promise<DatabaseInstance[]> {
    try {
      console.log('📚 Obteniendo instancias del estudiante:', studentId);
      
      const response = await api.get<DatabaseInstance[]>(`/instances/student/${studentId}`);
      
      console.log('✅ Instancias del estudiante obtenidas:', response.data.length);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instances del estudiante:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido obteniendo instances del estudiante:', error);
      }
      throw error;
    }
  }

  /**
   * Eliminar instancia
   * DELETE /instances/{id}
   */
  static async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Eliminando instancia:', id);
      
      await api.delete(`/instances/${id}`);
      
      console.log('✅ Instancia eliminada exitosamente');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error eliminando instance:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido eliminando instance:', error);
      }
      throw error;
    }
  }

  /**
   * Actualizar instancia (si el backend lo soporta)
   * PUT /instances/{id}
   */
  static async update(id: string, data: Partial<CreateInstanceRequest>): Promise<DatabaseInstance> {
    try {
      console.log('✏️ Actualizando instancia:', id, data);
      
      const response = await api.put<DatabaseInstance>(`/instances/${id}`, data);
      
      console.log('✅ Instancia actualizada exitosamente');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error actualizando instance:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido actualizando instance:', error);
      }
      throw error;
    }
  }

  /**
   * Probar conexión de una instancia
   * POST /instances/{id}/test
   */
  static async testConnection(id: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔌 Probando conexión de instancia:', id);
      
      const response = await api.post<{ success: boolean; message: string }>(
        `/instances/${id}/test`
      );
      
      console.log('✅ Test de conexión:', response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error probando conexión:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        });
      } else {
        console.error('❌ Error desconocido probando conexión:', error);
      }
      throw error;
    }
  }
}