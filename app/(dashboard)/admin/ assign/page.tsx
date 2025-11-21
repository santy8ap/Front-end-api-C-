'use client';

import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { InstanceService } from '../../../services/instance.service';
import { DatabaseInstance } from '../../../types/instance.types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

// Mock de estudiantes - en producción vendría de un endpoint
const mockStudents = [
    { id: '1', name: 'Juan Pérez', email: 'juan@test.com' },
    { id: '2', name: 'María García', email: 'maria@test.com' },
    { id: '3', name: 'Carlos López', email: 'carlos@test.com' },
    { id: '4', name: 'Ana Martínez', email: 'ana@test.com' },
];

export default function AssignInstancePage() {
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedInstance, setSelectedInstance] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingInstances, setLoadingInstances] = useState(true);

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            const data = await InstanceService.getAll();
            setInstances(data.filter(i => i.isActive));
        } catch (error) {
            toast.error('Error al cargar instancias');
        } finally {
            setLoadingInstances(false);
        }
    };

    const handleAssign = async () => {
        if (!selectedStudent || !selectedInstance) {
            toast.error('Selecciona un estudiante y una instancia');
            return;
        }

        setIsLoading(true);
        try {
            await InstanceService.assignToStudent({
                studentId: selectedStudent,
                instanceId: selectedInstance,
            });
            toast.success('Instancia asignada exitosamente');
            setSelectedStudent('');
            setSelectedInstance('');
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al asignar instancia');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Asignar Instancia a Estudiante
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Selecciona un estudiante y una instancia para asignar
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Seleccionar Estudiante */}
                    <Card title="Seleccionar Estudiante">
                        <div className="space-y-2">
                            {mockStudents.map((student) => (
                                <div
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student.id)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedStudent === student.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    <p className="font-semibold text-gray-800">{student.name}</p>
                                    <p className="text-sm text-gray-600">{student.email}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Seleccionar Instancia */}
                    <Card title="Seleccionar Instancia">
                        {loadingInstances ? (
                            <p className="text-gray-600">Cargando instancias...</p>
                        ) : instances.length === 0 ? (
                            <p className="text-gray-600">No hay instancias disponibles</p>
                        ) : (
                            <div className="space-y-2">
                                {instances.map((instance) => (
                                    <div
                                        key={instance.id}
                                        onClick={() => setSelectedInstance(instance.id)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedInstance === instance.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-semibold text-gray-800">{instance.name}</p>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                {instance.type}
                                            </span>
                                        </div>
                                        {instance.description && (
                                            <p className="text-sm text-gray-600">{instance.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Resumen y Botón */}
                <Card>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Resumen de Asignación
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Estudiante:</span>
                                <span className="font-medium text-gray-800">
                                    {selectedStudent
                                        ? mockStudents.find(s => s.id === selectedStudent)?.name
                                        : 'No seleccionado'}
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Instancia:</span>
                                <span className="font-medium text-gray-800">
                                    {selectedInstance
                                        ? instances.find(i => i.id === selectedInstance)?.name
                                        : 'No seleccionada'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={handleAssign}
                        isLoading={isLoading}
                        className="w-full"
                        disabled={!selectedStudent || !selectedInstance}
                    >
                        Asignar Instancia
                    </Button>
                </Card>

                {/* Info Card */}
                <Card className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        ℹ️ Sobre las Asignaciones
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Los estudiantes solo pueden acceder a instancias asignadas</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Puedes asignar múltiples instancias a un estudiante</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Solo se pueden asignar instancias activas</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}