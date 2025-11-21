'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AuthService } from '../../services/auth.service'; // ← CAMBIAR ESTA LÍNEA
import { useAuthStore } from '../../store/authStore';
import { RegisterRequest } from '../../types/auth.types';
import toast from 'react-hot-toast';
import { ROUTES } from '../../utils/constants';
import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

export const RegisterForm = () => {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterRequest & { confirmPassword: string }>();

    const onSubmit = async (data: RegisterRequest & { confirmPassword: string }) => {
        setIsLoading(true);
        try {
            const { confirmPassword, ...registerData } = data;

            // Asegurar que roleId sea número
            const requestData = {
                ...registerData,
                roleId: Number(registerData.roleId) || 3, // 3 = Student por defecto
            };

            const response = await AuthService.register(requestData);

            // Crear el objeto User para el store
            const user = {
                id: response.id,
                userName: response.userName,
                email: response.email,
                roleId: response.roleId,
                createdAt: response.createAt,
                updatedAt: response.updateAt,
            };

            setUser(user);
            toast.success('¡Registro exitoso!');
            router.push(ROUTES.STUDENT_DASHBOARD);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al registrarse');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
            <Input
                label="Nombre de Usuario"
                {...register('userName', { required: 'El nombre de usuario es requerido' })}
                error={errors.userName?.message}
                placeholder="juanperez"
            />

            <Input
                label="Email"
                type="email"
                {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido',
                    },
                })}
                error={errors.email?.message}
                placeholder="tu@email.com"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol
                </label>
                <select
                    {...register('roleId', { required: 'El rol es requerido' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    defaultValue="3"
                >
                    <option value="1">Admin</option>
                    <option value="2">Teacher</option>
                    <option value="3">Student</option>
                </select>
                {errors.roleId && <p className="mt-1 text-sm text-red-600">{errors.roleId.message}</p>}
            </div>

            <Input
                label="Contraseña"
                type="password"
                {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
                error={errors.password?.message}
                placeholder="••••••••"
            />

            <Input
                label="Confirmar Contraseña"
                type="password"
                {...register('confirmPassword', {
                    required: 'Confirma tu contraseña',
                    validate: (val: string) => {
                        if (watch('password') !== val) {
                            return 'Las contraseñas no coinciden';
                        }
                    },
                })}
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
                Registrarse
            </Button>
        </form>
    );
};