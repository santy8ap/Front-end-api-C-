'use client';

import { Card } from '../../../../components/ui/Card';
import { CreateInstanceForm } from '../../../../components/forms/CreateInstanceForm';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../../../utils/constants';

export default function CreateInstancePage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push(ROUTES.ADMIN_INSTANCES);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Crear Nueva Instancia
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Configura una nueva instancia de base de datos
                    </p>
                </div>

                <Card>
                    <CreateInstanceForm onSuccess={handleSuccess} />
                </Card>

                {/* Info Card */}
                <Card className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        ℹ️ Información Importante
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Asegúrate de que el servidor de base de datos esté accesible</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Verifica que las credenciales sean correctas</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>El puerto predeterminado para MySQL es 3306 y para PostgreSQL es 5432</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>La conexión se probará automáticamente al crear la instancia</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}