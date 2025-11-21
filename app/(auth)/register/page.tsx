import Link from 'next/link';
import { RegisterForm } from '../../components/forms/RegisterForm';
import { ROUTES } from '../../utils/constants';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
                    <p className="text-gray-600 mt-2">Únete a MultiDB Academy</p>
                </div>

                <RegisterForm />

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:underline font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}