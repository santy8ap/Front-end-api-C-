'use client';

import { Card } from '../../components/ui/Card';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminOrTeacher } from '../../utils/helpers';

export default function AdminDashboard() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        // Verificar si el usuario NO es admin ni teacher
        if (user && !isAdminOrTeacher(user.roleId)) {
            router.push(ROUTES.STUDENT_DASHBOARD);
        }
    }, [user, router]);

    // Si no hay usuario o no es admin/teacher, no mostrar nada
    if (!user || !isAdminOrTeacher(user.roleId)) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Panel de Administración
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Gestiona instancias y estudiantes
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Instancias</p>
                                <p className="text-2xl font-bold text-gray-800">12</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Estudiantes</p>
                                <p className="text-2xl font-bold text-gray-800">45</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Queries Hoy</p>
                                <p className="text-2xl font-bold text-gray-800">128</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Activas</p>
                                <p className="text-2xl font-bold text-gray-800">10</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href={ROUTES.ADMIN_CREATE_INSTANCE}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Crear Instancia
                                </h3>
                                <p className="text-gray-600">
                                    Crea una nueva instancia de base de datos
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link href={ROUTES.ADMIN_INSTANCES}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Ver Instancias
                                </h3>
                                <p className="text-gray-600">
                                    Administra todas las instancias creadas
                                </p>
                            </div>
                        </Card>
                    </Link>

                    <Link href={ROUTES.ADMIN_ASSIGN}>
                        <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Asignar Instancia
                                </h3>
                                <p className="text-gray-600">
                                    Asigna instancias a estudiantes
                                </p>
                            </div>
                        </Card>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                    <Card title="Actividad Reciente">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Nueva instancia creada</p>
                                        <p className="text-sm text-gray-600">MySQL - Producción</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Hace 5 min</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Instancia asignada</p>
                                        <p className="text-sm text-gray-600">PostgreSQL asignada a Juan Pérez</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Hace 15 min</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Query ejecutado</p>
                                        <p className="text-sm text-gray-600">SELECT * FROM usuarios - 234ms</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Hace 30 min</span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                    <div>
                                        <p className="font-medium text-gray-800">Nuevo estudiante registrado</p>
                                        <p className="text-sm text-gray-600">María García se ha unido</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">Hace 1 hora</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}