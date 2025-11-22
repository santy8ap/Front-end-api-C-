'use client';

import Link from 'next/link';
import { ROUTES } from '../../utils/constants';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminOrTeacher } from '../../utils/helpers';
import { motion } from 'framer-motion';
import {
    FaDatabase, FaUsers, FaBolt, FaClock,
    FaPlus, FaList, FaUserPlus, FaChartLine
} from 'react-icons/fa';
import { HiOutlineCircleStack } from 'react-icons/hi2';

export default function AdminDashboard() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (user && !isAdminOrTeacher(user.roleId)) {
            router.push(ROUTES.STUDENT_DASHBOARD);
        }
    }, [user, router]);

    if (!user || !isAdminOrTeacher(user.roleId)) {
        return null;
    }

    const stats = [
        { label: 'Active Instances', value: '12', change: '+2', icon: <FaDatabase />, color: 'from-cyan-500 to-blue-600' },
        { label: 'Students', value: '45', change: '+12', icon: <FaUsers />, color: 'from-green-500 to-emerald-600' },
        { label: 'Queries Today', value: '1,284', change: '+18%', icon: <FaBolt />, color: 'from-purple-500 to-pink-600' },
        { label: 'Avg Response', value: '145ms', change: '-23ms', icon: <FaClock />, color: 'from-amber-500 to-orange-600' },
    ];

    const quickActions = [
        {
            title: 'Create Instance',
            description: 'Set up new database',
            href: ROUTES.ADMIN_CREATE_INSTANCE,
            icon: <FaPlus />,
            color: 'from-cyan-500 to-blue-600',
        },
        {
            title: 'Manage Instances',
            description: 'View all instances',
            href: ROUTES.ADMIN_INSTANCES,
            icon: <FaList />,
            color: 'from-green-500 to-emerald-600',
        },
        {
            title: 'Assign Instance',
            description: 'Assign to students',
            href: ROUTES.ADMIN_ASSIGN,
            icon: <FaUserPlus />,
            color: 'from-purple-500 to-pink-600',
        },
    ];

    const recentActivities = [
        { title: 'New instance created', description: 'MySQL - Production', time: '5m ago', type: 'success' },
        { title: 'Instance assigned', description: 'PostgreSQL assigned to Juan Pérez', time: '15m ago', type: 'info' },
        { title: 'Slow query detected', description: 'SELECT * FROM users - 2.3s', time: '30m ago', type: 'warning' },
        { title: 'New student registered', description: 'María García joined', time: '1h ago', type: 'success' },
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
                    <h1 className="text-4xl font-black text-white mb-2">
                        Welcome back, {user.userName}
                    </h1>
                    <p className="text-gray-400">Heres whats happening with your platform</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm group-hover:border-cyan-500/30 transition-all" />
                            <div className="relative p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                                        {stat.icon}
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono rounded">
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white font-mono">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {quickActions.map((action, index) => (
                                    <Link key={index} href={action.href}>
                                        <motion.div
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="relative group h-full"
                                        >
                                            <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-lg group-hover:border-cyan-500/30 transition-all" />
                                            <div className="relative p-6">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                                                    {action.icon}
                                                </div>
                                                <h3 className="text-white font-bold mb-1">{action.title}</h3>
                                                <p className="text-gray-400 text-sm">{action.description}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Servers', value: '100%', color: 'green' },
                                { label: 'CPU', value: '45%', color: 'blue' },
                                { label: 'Memory', value: '68%', color: 'purple' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full bg-${item.color}-500 mr-3 animate-pulse`} />
                                        <span className="text-gray-400 text-sm">{item.label}</span>
                                    </div>
                                    <span className="text-white font-mono text-sm font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <FaChartLine className="text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-cyan-500/30 transition-all"
                            >
                                <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' :
                                        activity.type === 'warning' ? 'bg-yellow-500' :
                                            'bg-cyan-500'
                                    } mt-2`} />
                                <div className="flex-1">
                                    <p className="text-white font-medium">{activity.title}</p>
                                    <p className="text-gray-400 text-sm">{activity.description}</p>
                                </div>
                                <span className="text-gray-500 text-sm font-mono">{activity.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}