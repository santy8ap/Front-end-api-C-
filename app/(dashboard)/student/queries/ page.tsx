'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { QueryService } from '../../../services/query.service';
import { Query } from '../../../types/query.types';

export default function QueriesHistoryPage() {
    const [queries, setQueries] = useState<Query[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadQueries();
    }, []);

    const loadQueries = async () => {
        try {
            const data = await QueryService.getStudentQueries();
            setQueries(data);
        } catch (error) {
            console.error('Error al cargar queries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'executed':
                return 'bg-green-100 text-green-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Historial de Queries</h1>
                    <p className="text-gray-600 mt-2">Todas tus consultas ejecutadas</p>
                </div>

                <Card>
                    {isLoading ? (
                        <p className="text-gray-600">Cargando...</p>
                    ) : queries.length === 0 ? (
                        <p className="text-gray-600">No has ejecutado ninguna consulta aún</p>
                    ) : (
                        <div className="space-y-4">
                            {queries.map((query) => (
                                <div
                                    key={query.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <pre className="bg-gray-50 p-2 rounded text-sm font-mono flex-1">
                                            {query.sqlQuery}
                                        </pre>
                                        <span className={`ml-4 px-2 py-1 text-xs rounded ${getStatusColor(query.status)}`}>
                                            {query.status}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <p>Ejecutado: {new Date(query.createdAt).toLocaleString()}</p>
                                        {query.result && (
                                            <p className="mt-1">
                                                Resultados: {query.result.rowCount} filas en {query.result.executionTime}ms
                                            </p>
                                        )}
                                        {query.error && (
                                            <p className="mt-1 text-red-600">Error: {query.error}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}