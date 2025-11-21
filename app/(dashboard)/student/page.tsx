'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { InstanceService } from '../../services/instance.service';
import { DatabaseInstance } from '../../types/instance.types';
import { Card } from '../../components/ui/Card';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';

export default function StudentDashboard() {
    const user = useAuthStore((state) => state.user);
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            if (user?.id) {
                const data = await InstanceService.getStudentInstances(user.id);
                setInstances(data);
            }
        } catch (error) {
            console.error('Error al cargar instancias:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Bienvenido, {user?.userName} {/* ← CAMBIAR AQUÍ */}
                    </h1>
                    <p className="text-gray-600 mt-2">Dashboard de Estudiante</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Link href={ROUTES.STUDENT_EXECUTE}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">Ejecutar Query</h3>
                                    <p className="text-gray-600 text-sm">Ejecuta consultas SQL</p>
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href={ROUTES.STUDENT_QUERIES}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">Mis Queries</h3>
                                    <p className="text-gray-600 text-sm">Historial de consultas</p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>

                <Card title="Mis Instancias de Base de Datos">
                    {isLoading ? (
                        <p className="text-gray-600">Cargando...</p>
                    ) : instances.length === 0 ? (
                        <p className="text-gray-600">No tienes instancias asignadas</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {instances.map((instance) => (
                                <div
                                    key={instance.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-lg">{instance.name}</h4>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {instance.type}
                                        </span>
                                    </div>
                                    {instance.description && (
                                        <p className="text-gray-600 text-sm">{instance.description}</p>
                                    )}
                                    <div className="mt-2 flex items-center">
                                        <span className={`w-2 h-2 rounded-full ${instance.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className="ml-2 text-sm text-gray-600">
                                            {instance.isActive ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}