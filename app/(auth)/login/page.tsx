import Link from 'next/link';
import { LoginForm } from '../../components/forms/LoginForm';
import { ROUTES } from '../../utils/constants';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">MultiDB Academy</h1>
                    <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
                </div>

                <LoginForm />

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link href={ROUTES.REGISTER} className="text-blue-600 hover:underline font-medium">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}