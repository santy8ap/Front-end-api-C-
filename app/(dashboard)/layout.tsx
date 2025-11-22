'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';
import { getRoleName } from '../utils/helpers';
import { HiOutlineCircleStack } from 'react-icons/hi2';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, user, logout, initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.LOGIN);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Background Grid */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/30 transition-all" />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                                    <HiOutlineCircleStack className="text-white text-xl" />
                                </div>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white tracking-tight">
                                    MultiDB<span className="text-cyan-400">Academy</span>
                                </span>
                                <div className="h-px w-full bg-gradient-to-r from-cyan-500 to-transparent" />
                            </div>
                        </Link>

                        <div className="flex items-center space-x-4">
                            {/* User Info */}
                            <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <FaUser className="text-white text-sm" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-white">
                                        {user?.userName}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {user?.roleId ? getRoleName(user.roleId) : 'User'}
                                    </p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <motion.button
                                onClick={logout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all flex items-center space-x-2"
                            >
                                <FaSignOutAlt className="text-sm" />
                                <span className="hidden md:inline text-sm font-medium">Sign Out</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}