import Link from 'next/link';
import { ROUTES } from './utils/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          {/* Logo y Título */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">
              🎓 MultiDB Academy
            </h1>
            <p className="text-xl text-gray-200">
              Plataforma de gestión y aprendizaje de bases de datos
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">🗄️</div>
              <h3 className="text-lg font-semibold mb-2">Multi Base de Datos</h3>
              <p className="text-sm text-gray-200">
                Soporta MySQL, PostgreSQL, MongoDB y SQL Server
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Ejecución en Tiempo Real</h3>
              <p className="text-sm text-gray-200">
                Ejecuta queries SQL y visualiza resultados al instante
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Gestión Completa</h3>
              <p className="text-sm text-gray-200">
                Administra instancias y asigna recursos a estudiantes
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={ROUTES.LOGIN}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto"
            >
              Iniciar Sesión
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto"
            >
              Registrarse Gratis
            </Link>
          </div>

          {/* Demo Info */}
          <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">🧪 Modo Demo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left">
              <div>
                <p className="font-semibold text-blue-200 mb-1">Estudiante:</p>
                <p>Email: estudiante@test.com</p>
                <p>Password: 123456</p>
              </div>
              <div>
                <p className="font-semibold text-purple-200 mb-1">Admin:</p>
                <p>Email: admin@test.com</p>
                <p>Password: 123456</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-gray-300 text-sm">
            <p>Desarrollado con Next.js, TypeScript y Tailwind CSS</p>
            <p className="mt-2">© 2024 MultiDB Academy - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}