'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { InstanceService } from '../../services/instance.service';
import { DatabaseInstance } from '../../types/instance.types';
import Link from 'next/link';
import { ROUTES } from '../../utils/constants';
import { motion } from 'framer-motion';
import { FaBolt, FaHistory, FaDatabase, FaCheckCircle } from 'react-icons/fa';
import { HiOutlineCircleStack, HiOutlineCommandLine } from 'react-icons/hi2';

export default function StudentDashboard() {
    const user = useAuthStore((state) => state.user);
    const [instances, setInstances] = useState<DatabaseInstance[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadInstances();
    }, []);

    const loadInstances = async () => {
        try {
            if (user?.id) {
                const data = await InstanceService.getStudentInstances(user.id);
                setInstances(data);
            }
        } catch (error) {
            console.error('Error loading instances:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const quickActions = [
        {
            title: 'Execute Query',
            description: 'Run SQL queries in real-time',
            icon: <FaBolt />,
            href: ROUTES.STUDENT_EXECUTE,
            color: 'from-cyan-500 to-blue-600',
            stats: '24 today',
        },
        {
            title: 'Query History',
            description: 'View your past queries',
            icon: <FaHistory />,
            href: ROUTES.STUDENT_QUERIES,
            color: 'from-green-500 to-emerald-600',
            stats: '156 total',
        },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
                    <div className="relative">
                        <h1 className="text-4xl font-black text-white mb-2">
                            Welcome back, {user?.userName}
                        </h1>
                        <p className="text-cyan-400">Continue your database learning journey</p>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="relative group h-full"
                            >
                                <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-sm group-hover:border-cyan-500/30 transition-all" />
                                <div className="relative p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                                            {action.icon}
                                        </div>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs font-mono rounded-full">
                                            {action.stats}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                                    <p className="text-gray-400 mb-4">{action.description}</p>
                                    <div className="flex items-center text-cyan-400 text-sm font-medium">
                                        Get Started
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Database Instances */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Your Databases</h2>
                            <p className="text-gray-400 text-sm mt-1">Instances assigned to you</p>
                        </div>
                        <HiOutlineCircleStack className="text-3xl text-cyan-400" />
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 bg-white/[0.02] rounded-lg animate-pulse" />
                            ))}
                        </div>
                    ) : instances.length === 0 ? (
                        <div className="text-center py-12">
                            <HiOutlineCommandLine className="text-6xl text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg mb-2">No instances assigned yet</p>
                            <p className="text-gray-500 text-sm">Contact your instructor for access</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {instances.map((instance, index) => (
                                <motion.div
                                    key={instance.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -3 }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-lg group-hover:border-cyan-500/30 transition-all" />
                                    <div className="relative p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white mb-1">{instance.name}</h4>
                                                {instance.description && (
                                                    <p className="text-gray-400 text-sm">{instance.description}</p>
                                                )}
                                            </div>
                                            <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs rounded font-mono">
                                                {instance.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full mr-2 ${instance.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                <span className="text-gray-400">
                                                    {instance.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-500">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(instance.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}