import { DatabaseInstance, CreateInstanceRequest, AssignInstanceRequest } from '../types/instance.types';

export class InstanceServiceMock {
  private static mockInstances: DatabaseInstance[] = [
    {
      id: '1',
      name: 'MySQL Desarrollo',
      type: 'MySQL',
      connectionString: 'Server=localhost;Database=dev;',
      description: 'Base de datos de desarrollo MySQL',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'PostgreSQL Producción',
      type: 'PostgreSQL',
      connectionString: 'Host=localhost;Database=prod;',
      description: 'Base de datos de producción PostgreSQL',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'MongoDB Analytics',
      type: 'MongoDB',
      connectionString: 'mongodb://localhost:27017/analytics',
      description: 'Base de datos NoSQL para analytics',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  static async getAll(): Promise<DatabaseInstance[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.mockInstances];
  }

  static async getById(id: string): Promise<DatabaseInstance> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const instance = this.mockInstances.find(i => i.id === id);
    if (!instance) throw new Error('Instancia no encontrada');
    return instance;
  }

  static async create(data: CreateInstanceRequest): Promise<DatabaseInstance> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newInstance: DatabaseInstance = {
      id: String(this.mockInstances.length + 1),
      name: data.name,
      type: data.type as 'MySQL' | 'PostgreSQL' | 'MongoDB' | 'SQLServer',
      connectionString: `${data.host}:${data.port}/${data.database}`,
      description: data.description,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.mockInstances.push(newInstance);
    return newInstance;
  }

  static async assignToStudent(data: AssignInstanceRequest): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('✅ Instancia asignada (MOCK):', data);
  }

  static async getStudentInstances(studentId: string): Promise<DatabaseInstance[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Retornar todas las instancias activas (en un caso real filtrarías por studentId)
    return this.mockInstances.filter(i => i.isActive);
  }

  static async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.mockInstances.findIndex(i => i.id === id);
    if (index > -1) {
      this.mockInstances.splice(index, 1);
    }
  }
}