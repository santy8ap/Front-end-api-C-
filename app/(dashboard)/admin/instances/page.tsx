'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { InstanceService } from '../../../services/instance.service';
import { DatabaseInstance } from '../../../types/instance.types';
import Link from 'next/link';
import { ROUTES } from '../../../utils/constants';
import toast from 'react-hot-toast';

export default function InstancesPage() {
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            const data = await InstanceService.getAll();
            setInstances(data);
        } catch (error) {
            toast.error('Error al cargar instancias');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta instancia?')) return;

        try {
            await InstanceService.delete(id);
            toast.success('Instancia eliminada');
            loadInstances();
        } catch (error) {
            toast.error('Error al eliminar instancia');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Gestión de Instancias
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Administra todas las instancias de bases de datos
                        </p>
                    </div>
                    <Link href={ROUTES.ADMIN_CREATE_INSTANCE}>
                        <Button>
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Nueva Instancia
                            </span>
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <Card>
                        <p className="text-gray-600">Cargando instancias...</p>
                    </Card>
                ) : instances.length === 0 ? (
                    <Card>
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                            <p className="text-gray-600 mb-4">No hay instancias creadas</p>
                            <Link href={ROUTES.ADMIN_CREATE_INSTANCE}>
                                <Button>Crear Primera Instancia</Button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instances.map((instance) => (
                            <Card key={instance.id}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            {instance.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                {instance.type}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded ${instance.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {instance.isActive ? 'Activa' : 'Inactiva'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {instance.description && (
                                    <p className="text-sm text-gray-600 mb-3">
                                        {instance.description}
                                    </p>
                                )}

                                <div className="text-xs text-gray-500 mb-4">
                                    <p>Creada: {new Date(instance.createdAt).toLocaleDateString()}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        className="flex-1 text-sm py-2"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="flex-1 text-sm py-2"
                                        onClick={() => handleDelete(instance.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}