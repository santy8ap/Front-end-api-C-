export interface Query {
  id: string;
  sqlQuery: string;
  status: 'pending' | 'executed' | 'failed';
  result?: QueryResult;
  error?: string;
  createdAt: string;
  updatedAt?: string;
  instanceId?: string;
  userId?: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTime: number;
}

export interface ExecuteQueryRequest {
  instanceId: string;
  query: string;
}

export interface ExecuteQueryResponse extends QueryResult {
  id?: string;
  status: string;
}