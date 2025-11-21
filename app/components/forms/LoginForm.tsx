'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AuthService } from '../../services/auth.service'; // ← CAMBIAR AQUÍ
import { useAuthStore } from '../../store/authStore';
import { LoginRequest } from '../../types/auth.types';
import toast from 'react-hot-toast';
import { ROUTES } from '../../utils/constants';
import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

export const LoginForm = () => {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit = async (data: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login(data);

            const user = {
                id: response.id,
                userName: response.userName,
                email: response.email,
                roleId: response.roleId,
                createdAt: response.createAt,
                updatedAt: response.updateAt,
            };

            setUser(user);
            toast.success('¡Inicio de sesión exitoso!');

            if (response.roleId === 1 || response.roleId === 2) {
                router.push(ROUTES.ADMIN_DASHBOARD);
            } else {
                router.push(ROUTES.STUDENT_DASHBOARD);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
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

            <Input
                label="Contraseña"
                type="password"
                {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                        value: 6,
                        message: 'Mínimo 6 caracteres',
                    },
                })}
                error={errors.password?.message}
                placeholder="••••••••"
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
                Iniciar Sesión
            </Button>
        </form>
    );
};