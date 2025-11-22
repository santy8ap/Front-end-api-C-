'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AuthService } from '../../services/auth.service';
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
            toast.success('¡Bienvenido de nuevo! 🎉', {
                duration: 3000,
                icon: '👋',
            });

            if (response.roleId === 1 || response.roleId === 2) {
                router.push(ROUTES.ADMIN_DASHBOARD);
            } else {
                router.push(ROUTES.STUDENT_DASHBOARD);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al iniciar sesión', {
                duration: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md">
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
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                }
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
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                }
            />

            <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
                size="lg"
            >
                Iniciar Sesión
            </Button>
        </form>
    );
};