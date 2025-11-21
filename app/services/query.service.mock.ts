import { Query, ExecuteQueryRequest, CreateQueryRequest, QueryResult } from '../types/query.types';

export class QueryServiceMock {
  private static mockQueries: Query[] = [];

  static async executeQuery(data: ExecuteQueryRequest): Promise<QueryResult> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular resultado de query basado en el query enviado
    const query = data.query.toLowerCase();
    
    let mockData: QueryResult;

    if (query.includes('select')) {
      mockData = {
        columns: ['id', 'nombre', 'email', 'rol', 'created_at'],
        rows: [
          { id: 1, nombre: 'Juan Pérez', email: 'juan@test.com', rol: 'Student', created_at: '2024-01-15' },
          { id: 2, nombre: 'María García', email: 'maria@test.com', rol: 'Teacher', created_at: '2024-01-16' },
          { id: 3, nombre: 'Carlos López', email: 'carlos@test.com', rol: 'Student', created_at: '2024-01-17' },
          { id: 4, nombre: 'Ana Martínez', email: 'ana@test.com', rol: 'Admin', created_at: '2024-01-18' },
        ],
        rowCount: 4,
        executionTime: 45,
      };
    } else if (query.includes('insert')) {
      mockData = {
        columns: ['affected_rows'],
        rows: [{ affected_rows: 1 }],
        rowCount: 1,
        executionTime: 28,
      };
    } else if (query.includes('update')) {
      mockData = {
        columns: ['affected_rows'],
        rows: [{ affected_rows: 1 }],
        rowCount: 1,
        executionTime: 32,
      };
    } else if (query.includes('delete')) {
      mockData = {
        columns: ['affected_rows'],
        rows: [{ affected_rows: 1 }],
        rowCount: 1,
        executionTime: 25,
      };
    } else {
      mockData = {
        columns: ['result'],
        rows: [{ result: 'Query ejecutado correctamente' }],
        rowCount: 1,
        executionTime: 15,
      };
    }

    // Guardar en historial
    const newQuery: Query = {
      id: String(this.mockQueries.length + 1),
      studentId: '1',
      instanceId: data.instanceId,
      sqlQuery: data.query,
      status: 'executed',
      result: mockData,
      executedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.mockQueries.push(newQuery);

    return mockData;
  }

  static async createQuery(data: CreateQueryRequest): Promise<Query> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newQuery: Query = {
      id: String(this.mockQueries.length + 1),
      studentId: '1',
      instanceId: data.instanceId,
      sqlQuery: data.sqlQuery,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.mockQueries.push(newQuery);
    return newQuery;
  }

  static async getStudentQueries(): Promise<Query[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockQueries].reverse();
  }

  static async getQueryById(id: string): Promise<Query> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const query = this.mockQueries.find(q => q.id === id);
    if (!query) throw new Error('Query no encontrado');
    return query;
  }

  static async getAllQueries(): Promise<Query[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockQueries].reverse();
  }
}