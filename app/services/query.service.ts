import api from './api';
import { Query, ExecuteQueryRequest, CreateQueryRequest, QueryResult } from '../types/query.types';
import { QueryServiceMock } from './query.service.mock';

const USE_MOCK = true; // ← ASEGÚRATE QUE ESTÉ EN true

export class QueryService {
  static async executeQuery(data: ExecuteQueryRequest): Promise<QueryResult> {
    if (USE_MOCK) {
      console.log('🔶 Ejecutando Query con MOCK');
      return QueryServiceMock.executeQuery(data);
    }
    const response = await api.post<QueryResult>('/queries/execute', data);
    return response.data;
  }

  static async createQuery(data: CreateQueryRequest): Promise<Query> {
    if (USE_MOCK) return QueryServiceMock.createQuery(data);
    const response = await api.post<Query>('/queries', data);
    return response.data;
  }

  static async getStudentQueries(): Promise<Query[]> {
    if (USE_MOCK) {
      console.log('🔶 Obteniendo Queries con MOCK');
      return QueryServiceMock.getStudentQueries();
    }
    const response = await api.get<Query[]>('/queries/student');
    return response.data;
  }

  static async getQueryById(id: string): Promise<Query> {
    if (USE_MOCK) return QueryServiceMock.getQueryById(id);
    const response = await api.get<Query>(`/queries/${id}`);
    return response.data;
  }

  static async getAllQueries(): Promise<Query[]> {
    if (USE_MOCK) return QueryServiceMock.getAllQueries();
    const response = await api.get<Query[]>('/queries');
    return response.data;
  }
}