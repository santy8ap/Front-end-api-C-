'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import { QueryService } from '../../services/query.service';
import { ExecuteQueryRequest, QueryResult } from '../../types/query.types';
import { AxiosError } from 'axios';

interface QueryFormProps {
    instanceId: string;
    onSuccess?: (result: QueryResult) => void;
}

interface ErrorResponse {
    message?: string;
}

export const QueryForm = ({ instanceId, onSuccess }: QueryFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);

    const { register, handleSubmit, reset } = useForm<{ query: string }>();

    const onSubmit = async (data: { query: string }) => {
        setIsLoading(true);
        setResult(null);

        try {
            const requestData: ExecuteQueryRequest = {
                instanceId,
                query: data.query,
            };

            const response = await QueryService.executeQuery(requestData);
            setResult(response);
            toast.success('Query ejecutado exitosamente');

            if (onSuccess) {
                onSuccess(response);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Error al ejecutar query');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SQL Query
                    </label>
                    <textarea
                        {...register('query', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                        rows={6}
                        placeholder="SELECT * FROM usuarios WHERE id = 1;"
                    />
                </div>

                <div className="flex gap-2">
                    <Button type="submit" isLoading={isLoading}>
                        Ejecutar Query
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => reset()}>
                        Limpiar
                    </Button>
                </div>
            </form>

            {result && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Resultados</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            {result.rowCount} filas - {result.executionTime}ms
                        </p>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {result.columns.map((column) => (
                                            <th
                                                key={column}
                                                className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {result.rows.map((row, idx) => (
                                        <tr key={idx}>
                                            {result.columns.map((column) => (
                                                <td key={column} className="px-4 py-2 text-sm text-gray-900">
                                                    {String(row[column] ?? '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};