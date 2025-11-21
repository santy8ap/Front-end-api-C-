import api from './api';
import { DatabaseInstance, CreateInstanceRequest, AssignInstanceRequest } from '../types/instance.types';
import { InstanceServiceMock } from './instance.service.mock';

const USE_MOCK = true; // ← ASEGÚRATE QUE ESTÉ EN true

export class InstanceService {
  static async getAll(): Promise<DatabaseInstance[]> {
    if (USE_MOCK) {
      console.log('🔶 Usando MOCK para Instances');
      return InstanceServiceMock.getAll();
    }
    const response = await api.get<DatabaseInstance[]>('/instances');
    return response.data;
  }

  static async getById(id: string): Promise<DatabaseInstance> {
    if (USE_MOCK) return InstanceServiceMock.getById(id);
    const response = await api.get<DatabaseInstance>(`/instances/${id}`);
    return response.data;
  }

  static async create(data: CreateInstanceRequest): Promise<DatabaseInstance> {
    if (USE_MOCK) return InstanceServiceMock.create(data);
    const response = await api.post<DatabaseInstance>('/instances', data);
    return response.data;
  }

  static async assignToStudent(data: AssignInstanceRequest): Promise<void> {
    if (USE_MOCK) return InstanceServiceMock.assignToStudent(data);
    await api.post('/instances/assign', data);
  }

  static async getStudentInstances(studentId: string): Promise<DatabaseInstance[]> {
    if (USE_MOCK) {
      console.log('🔶 Usando MOCK para Student Instances');
      return InstanceServiceMock.getStudentInstances(studentId);
    }
    const response = await api.get<DatabaseInstance[]>(`/instances/student/${studentId}`);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    if (USE_MOCK) return InstanceServiceMock.delete(id);
    await api.delete(`/instances/${id}`);
  }
}