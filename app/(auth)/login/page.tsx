'use client';

import Link from 'next/link';
import { LoginForm } from '../../components/forms/LoginForm';
import { ROUTES } from '../../utils/constants';
import { HiOutlineCircleStack } from 'react-icons/hi2';
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
            {/* Background Grid */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
            </div>

            {/* Floating Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl" />

                    {/* Header */}
                    <div className="relative mb-8 text-center">
                        <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <HiOutlineCircleStack className="text-white text-2xl" />
                            </div>
                            <div className="text-left">
                                <span className="text-xl font-bold text-white">
                                    MultiDB<span className="text-cyan-400">Academy</span>
                                </span>
                                <div className="h-px w-full bg-gradient-to-r from-cyan-500 to-transparent" />
                            </div>
                        </Link>

                        <h1 className="text-2xl font-black text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to continue to your account</p>
                    </div>

                    {/* Form */}
                    <div className="relative">
                        <LoginForm />
                    </div>

                    {/* Footer */}
                    <div className="relative mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Dont have an account?{' '}
                            <Link
                                href={ROUTES.REGISTER}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    © 2024 MultiDB Academy. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
}