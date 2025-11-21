'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';
import { getRoleName } from '../utils/helpers';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, user, logout, initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.LOGIN);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">
                                MultiDB Academy
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm">
                                <p className="font-semibold text-gray-800">
                                    {user?.userName}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {user?.roleId ? getRoleName(user.roleId) : 'Usuario'}
                                </p>
                            </div>

                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido */}
            {children}
        </div>
    );
}