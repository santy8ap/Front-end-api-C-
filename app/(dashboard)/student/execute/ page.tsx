'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { InstanceService } from '../../../services/instance.service';
import { QueryService } from '../../../services/query.service';
import { DatabaseInstance } from '../../../types/instance.types';
import { QueryResult } from '../../../types/query.types';
import { motion } from 'framer-motion';
import { FaBolt, FaPlay, FaClock, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ErrorResponse {
    message?: string;
}

export default function ExecuteQueryPage() {
    const user = useAuthStore((state) => state.user);
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [selectedInstance, setSelectedInstance] = useState<string>('');
    const [query, setQuery] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            if (user?.id) {
                const data = await InstanceService.getStudentInstances(user.id);
                setInstances(data.filter(i => i.isActive));
                if (data.length > 0) {
                    setSelectedInstance(data[0].id);
                }
            }
        } catch (error) {
            toast.error('Error loading instances');
            console.error(error);
        }
    };

    const handleExecute = async () => {
        if (!query.trim()) {
            toast.error('Please enter a query');
            return;
        }

        if (!selectedInstance) {
            toast.error('Please select an instance');
            return;
        }

        setIsExecuting(true);
        setError('');
        setResult(null);

        try {
            const response = await QueryService.executeQuery({
                instanceId: selectedInstance,
                query: query.trim(),
            });

            setResult(response);
            toast.success('Query executed successfully');
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const errorMsg = axiosError.response?.data?.message || 'Error executing query';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsExecuting(false);
        }
    };

    // Keyboard shortcut
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleExecute();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [query, selectedInstance]); // eslint-disable-line react-hooks/exhaustive-deps

    const quickQueries = [
        { label: 'Select All', query: 'SELECT * FROM users LIMIT 10;' },
        { label: 'Count Records', query: 'SELECT COUNT(*) FROM users;' },
        { label: 'Recent Records', query: 'SELECT * FROM users ORDER BY created_at DESC LIMIT 5;' },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                            <HiOutlineCommandLine className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white">SQL Terminal</h1>
                            <p className="text-gray-300">Execute queries in real-time</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Instance Selector */}
                        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                            <label className="block text-sm font-semibold text-white mb-3">
                                Select Database Instance
                            </label>
                            {instances.length === 0 ? (
                                <div className="px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-gray-300 font-medium">
                                    No instances available
                                </div>
                            ) : (
                                <select
                                    value={selectedInstance}
                                    onChange={(e) => setSelectedInstance(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white font-medium focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                                >
                                    {instances.map((instance) => (
                                        <option key={instance.id} value={instance.id} className="bg-gray-800 text-white">
                                            {instance.name} ({instance.type})
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Query Editor */}
                        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                            {/* Editor Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-700/50 border-b-2 border-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-gray-300 ml-4 font-mono font-bold">query.sql</span>
                                </div>
                                <button
                                    onClick={() => setQuery('')}
                                    className="px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                >
                                    Clear
                                </button>
                            </div>

                            {/* Editor Content */}
                            <div className="p-4 bg-gray-900">
                                <textarea
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="-- Enter your SQL query here&#10;SELECT * FROM users WHERE active = true;"
                                    className="w-full h-64 bg-transparent text-white font-mono text-sm resize-none outline-none placeholder-gray-500"
                                    spellCheck={false}
                                    style={{ caretColor: 'white' }}
                                />
                            </div>

                            {/* Execute Button */}
                            <div className="px-4 pb-4 pt-2 bg-gray-900 flex items-center justify-between border-t-2 border-gray-700">
                                <div className="text-xs text-gray-400 font-mono">
                                    Press Ctrl+Enter to execute
                                </div>
                                <button
                                    onClick={handleExecute}
                                    disabled={isExecuting || !query.trim() || instances.length === 0}
                                    className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 shadow-lg"
                                >
                                    {isExecuting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Executing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay />
                                            <span>Execute</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-900/50 border-2 border-red-500 rounded-xl p-6 backdrop-blur-sm"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✕</span>
                                    </div>
                                    <div>
                                        <h4 className="text-red-300 font-bold mb-1">Query Error</h4>
                                        <p className="text-red-200 text-sm font-mono">{error}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Results Display */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800/50 border-2 border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm"
                            >
                                {/* Result Header */}
                                <div className="px-6 py-4 bg-green-900/30 border-b-2 border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <FaCheckCircle className="text-green-400 text-xl" />
                                                <span className="text-white font-bold">Query Successful</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                <FaClock />
                                                <span className="font-mono font-bold">{result.executionTime}ms</span>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-300 font-mono font-bold">
                                            {result.rowCount} rows
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-700 border-b-2 border-gray-600">
                                            <tr>
                                                {result.columns.map((column) => (
                                                    <th
                                                        key={column}
                                                        className="px-6 py-3 text-left text-xs font-bold text-cyan-300 uppercase tracking-wider whitespace-nowrap"
                                                    >
                                                        {column}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {result.rows.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={result.columns.length}
                                                        className="px-6 py-8 text-center text-gray-400"
                                                    >
                                                        No results found
                                                    </td>
                                                </tr>
                                            ) : (
                                                result.rows.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-700/50 transition-colors">
                                                        {result.columns.map((column) => (
                                                            <td key={column} className="px-6 py-4 text-gray-200 font-mono text-xs whitespace-nowrap">
                                                                {row[column] === null || row[column] === undefined
                                                                    ? <span className="text-gray-500 italic">NULL</span>
                                                                    : String(row[column])}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Queries */}
                        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                                <FaBolt className="mr-2 text-cyan-400" />
                                Quick Queries
                            </h3>
                            <div className="space-y-2">
                                {quickQueries.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setQuery(item.query)}
                                        className="w-full text-left px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg hover:border-cyan-500 hover:bg-gray-700 transition-all text-sm"
                                    >
                                        <div className="font-bold text-white mb-1">{item.label}</div>
                                        <div className="text-gray-400 font-mono text-xs truncate">{item.query}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4">Tips</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-cyan-400 mr-2 font-bold">•</span>
                                    <span>Use LIMIT to restrict result size</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyan-400 mr-2 font-bold">•</span>
                                    <span>Queries timeout after 30 seconds</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyan-400 mr-2 font-bold">•</span>
                                    <span>Write operations require admin privileges</span>
                                </li>
                            </ul>
                        </div>

                        {/* Stats */}
                        <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-2 border-cyan-700 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4">Today&apos;s Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300 text-sm font-medium">Queries Executed</span>
                                    <span className="text-2xl font-black text-white font-mono">24</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300 text-sm font-medium">Avg Response Time</span>
                                    <span className="text-2xl font-black text-cyan-300 font-mono">145ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}