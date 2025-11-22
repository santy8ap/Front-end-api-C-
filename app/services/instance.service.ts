import api from './api';
import { DatabaseInstance, CreateInstanceRequest, AssignInstanceRequest } from '../types/instance.types';
import { AxiosError } from 'axios';

const USE_MOCK = false;

export class InstanceService {
  static async getAll(): Promise<DatabaseInstance[]> {
    try {
      const response = await api.get<DatabaseInstance[]>('/instances');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instances:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo instances:', error);
      }
      throw error;
    }
  }

  static async getById(id: string): Promise<DatabaseInstance> {
    try {
      const response = await api.get<DatabaseInstance>(`/instances/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instance:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo instance:', error);
      }
      throw error;
    }
  }

  static async create(data: CreateInstanceRequest): Promise<DatabaseInstance> {
    try {
      const response = await api.post<DatabaseInstance>('/instances', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error creando instance:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido creando instance:', error);
      }
      throw error;
    }
  }

  static async assignToStudent(data: AssignInstanceRequest): Promise<void> {
    try {
      await api.post('/instances/assign', data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error asignando instance:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido asignando instance:', error);
      }
      throw error;
    }
  }

  static async getStudentInstances(studentId: string): Promise<DatabaseInstance[]> {
    try {
      const response = await api.get<DatabaseInstance[]>(`/instances/student/${studentId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error obteniendo instances del estudiante:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido obteniendo instances del estudiante:', error);
      }
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`/instances/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('❌ Error eliminando instance:', error.response?.data || error.message);
      } else {
        console.error('❌ Error desconocido eliminando instance:', error);
      }
      throw error;
    }
  }
}