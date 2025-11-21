export interface DatabaseInstance {
  id: string;
  name: string;
  type: 'MySQL' | 'PostgreSQL' | 'MongoDB' | 'SQLServer';
  connectionString: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateInstanceRequest {
  name: string;
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  description?: string;
}

export interface AssignInstanceRequest {
  studentId: string;
  instanceId: string;
}