// app/types/instance.types.ts

export interface DatabaseInstance {
  id: string;
  name: string;
  type: string;      // MySQL, PostgreSQL, etc.
  state: string;     // active, inactive, etc.
  ports: string;     // "3306", etc.
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstanceRequest {
  name: string;
  type: string;
  state?: string;
  ports?: string;
  userId: string;
}

export interface AssignInstanceRequest {
  studentId: string;
  databaseName: string;
  databaseType?: string;
  port?: number;
}

export interface InstanceResponse {
  message: string;
  instanceId?: string;
}