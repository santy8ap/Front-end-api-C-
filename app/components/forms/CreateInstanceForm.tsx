'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { InstanceService } from '../../services/instance.service';
import { CreateInstanceRequest } from '../../types/instance.types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

export const CreateInstanceForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateInstanceRequest>();

    const onSubmit = async (data: CreateInstanceRequest) => {
        setIsLoading(true);
        try {
            await InstanceService.create(data);
            toast.success('Instancia creada exitosamente');
            reset();
            if (onSuccess) onSuccess();
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al crear instancia');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nombre de la Instancia"
                {...register('name', { required: 'El nombre es requerido' })}
                error={errors.name?.message}
                placeholder="Mi Base de Datos"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Base de Datos
                </label>
                <select
                    {...register('type', { required: 'El tipo es requerido' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                    <option value="">Seleccionar...</option>
                    <option value="MySQL">MySQL</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="SQLServer">SQL Server</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
            </div>

            <Input
                label="Host"
                {...register('host', { required: 'El host es requerido' })}
                error={errors.host?.message}
                placeholder="localhost"
            />

            <Input
                label="Puerto"
                type="number"
                {...register('port', {
                    required: 'El puerto es requerido',
                    valueAsNumber: true
                })}
                error={errors.port?.message}
                placeholder="3306"
            />

            <Input
                label="Nombre de Base de Datos"
                {...register('database', { required: 'El nombre de BD es requerido' })}
                error={errors.database?.message}
                placeholder="mibasedatos"
            />

            <Input
                label="Usuario"
                {...register('username', { required: 'El usuario es requerido' })}
                error={errors.username?.message}
                placeholder="root"
            />

            <Input
                label="Contraseña"
                type="password"
                {...register('password', { required: 'La contraseña es requerida' })}
                error={errors.password?.message}
                placeholder="••••••••"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción (opcional)
                </label>
                <textarea
                    {...register('description')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    rows={3}
                    placeholder="Descripción de la instancia..."
                />
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
                Crear Instancia
            </Button>
        </form>
    );
};