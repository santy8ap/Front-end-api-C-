export interface Query {
  id: string;
  studentId: string;
  instanceId: string;
  sqlQuery: string;
  status: 'pending' | 'executed' | 'failed';
  result?: QueryResult;
  error?: string;
  executedAt?: string;
  createdAt: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[]; // Cambiado de any[]
  rowCount: number;
  executionTime: number;
}

export interface ExecuteQueryRequest {
  instanceId: string;
  query: string;
}

export interface CreateQueryRequest {
  instanceId: string;
  sqlQuery: string;
  description?: string;
}