'use client';

import { useEffect, useState } from 'react';
import { QueryService } from '../../../services/query.service';
import { Query } from '../../../types/query.types';
import { motion } from 'framer-motion';
import { FaHistory, FaCheckCircle, FaExclamationTriangle, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';

type FilterType = 'all' | 'executed' | 'failed';

export default function QueriesHistoryPage() {
    const [queries, setQueries] = useState<Query[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadQueries();
    }, []);

    const loadQueries = async () => {
        try {
            const data = await QueryService.getStudentQueries();
            setQueries(data);
        } catch (error) {
            toast.error('Error loading queries');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredQueries = queries
        .filter(q => {
            if (filter === 'all') return true;
            return q.status === filter;
        })
        .filter(q => {
            if (!searchTerm) return true;
            return q.sqlQuery.toLowerCase().includes(searchTerm.toLowerCase());
        });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            executed: 'bg-green-500 text-white border-2 border-green-400',
            failed: 'bg-red-500 text-white border-2 border-red-400',
            pending: 'bg-yellow-500 text-black border-2 border-yellow-400',
        };

        const statusStyle = styles[status] || styles.pending;

        return (
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyle}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    const handleFilterChange = (value: string) => {
        if (value === 'all' || value === 'executed' || value === 'failed') {
            setFilter(value);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                            <FaHistory className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white">Query History</h1>
                            <p className="text-gray-300">Review your past SQL queries</p>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search queries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none font-medium"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center space-x-2">
                            <FaFilter className="text-gray-400" />
                            <select
                                value={filter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none font-medium"
                            >
                                <option value="all" className="bg-gray-800 text-white">All Queries</option>
                                <option value="executed" className="bg-gray-800 text-white">Successful</option>
                                <option value="failed" className="bg-gray-800 text-white">Failed</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        {
                            label: 'Total Queries',
                            value: queries.length,
                            icon: <FaHistory />,
                            color: 'from-blue-500 to-cyan-600'
                        },
                        {
                            label: 'Successful',
                            value: queries.filter(q => q.status === 'executed').length,
                            icon: <FaCheckCircle />,
                            color: 'from-green-500 to-emerald-600'
                        },
                        {
                            label: 'Failed',
                            value: queries.filter(q => q.status === 'failed').length,
                            icon: <FaExclamationTriangle />,
                            color: 'from-red-500 to-pink-600'
                        },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl backdrop-blur-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white text-xl shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm mb-1 font-medium">{stat.label}</p>
                                <p className="text-3xl font-black text-white font-mono">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Queries List */}
                <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-gray-300 font-medium">Loading queries...</p>
                        </div>
                    ) : filteredQueries.length === 0 ? (
                        <div className="p-12 text-center">
                            <FaHistory className="text-6xl text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-300 text-lg mb-2 font-bold">No queries found</p>
                            <p className="text-gray-400 text-sm">
                                {searchTerm ? 'Try adjusting your search' : 'Execute your first query to see it here'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y-2 divide-gray-700">
                            {filteredQueries.map((query, index) => (
                                <motion.div
                                    key={query.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: Math.min(index * 0.05, 0.5) }}
                                    className="p-6 hover:bg-gray-700/30 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 mr-4">
                                            <pre className="bg-gray-900 p-4 rounded-lg text-sm font-mono text-gray-200 overflow-x-auto mb-3 border-2 border-gray-700 whitespace-pre-wrap break-words">
                                                {query.sqlQuery}
                                            </pre>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {getStatusBadge(query.status)}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center text-gray-300">
                                            <FaClock className="mr-2 text-gray-400 flex-shrink-0" />
                                            <span className="font-mono font-medium">
                                                {new Date(query.createdAt).toLocaleString()}
                                            </span>
                                        </div>

                                        {query.result && (
                                            <div className="flex items-center text-green-300 font-bold">
                                                <FaCheckCircle className="mr-2 flex-shrink-0" />
                                                <span className="font-mono">
                                                    {query.result.rowCount} rows in {query.result.executionTime}ms
                                                </span>
                                            </div>
                                        )}

                                        {query.error && (
                                            <div className="flex items-center text-red-300 font-bold">
                                                <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                                                <span className="text-sm">{query.error}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination Info */}
                {filteredQueries.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-400 font-medium">
                        Showing {filteredQueries.length} of {queries.length} queries
                    </div>
                )}
            </div>
        </div>
    );
}