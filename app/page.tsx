'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaDatabase, FaBolt, FaChartLine, FaUsers, FaCode, FaShieldAlt,
  FaArrowRight, FaGithub, FaTwitter, FaLinkedin
} from 'react-icons/fa';
import { HiOutlineCodeBracket, HiOutlineCircleStack, HiOutlineCommandLine } from 'react-icons/hi2';
import { ROUTES } from './utils/constants';
import { AnimatedBackground } from './components/landing/AnimatedBackground';
import { FloatingCard } from './components/landing/FloatingCard';
import { VideoModal } from './components/ui/VideoModal';
import { useRickroll } from './hooks/useRickroll';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { isRickrolling, rickroll, stopRickroll } = useRickroll();

  return (
    <>
      <div className="min-h-screen bg-black overflow-hidden relative">
        {/* Animated Grid Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10" />
        </div>

        {/* Floating Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl"
        >
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

              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#features"
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium relative group"
                >
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
                </a>
                <button
                  onClick={rickroll}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium relative group"
                >
                  Docs
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300" />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Link href={ROUTES.LOGIN}>
                  <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Sign in
                  </button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-5 py-2 bg-white text-black text-sm font-semibold rounded overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.nav>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-6 py-32">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center max-w-5xl mx-auto">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Open Source Platform</span>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
                    <span className="block text-white">Database Mastery</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Simplified
                    </span>
                  </h1>
                  <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
                >
                  Real-time SQL execution, multi-database support, and advanced analytics.
                  <br />
                  Built for developers, educators, and data professionals.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                  <Link href={ROUTES.REGISTER}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Start Building
                        <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>

                  <Link href={ROUTES.LOGIN}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all"
                    >
                      View Demo
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                >
                  {[
                    { name: 'MySQL', icon: <FaDatabase /> },
                    { name: 'PostgreSQL', icon: <HiOutlineCircleStack /> },
                    { name: 'MongoDB', icon: <HiOutlineCircleStack /> },
                    { name: 'SQL Server', icon: <HiOutlineCodeBracket /> },
                  ].map((db, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="group relative p-6 bg-white/[0.02] border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/[0.05] transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-lg transition-all" />
                      <div className="relative text-3xl text-cyan-400 mb-3">{db.icon}</div>
                      <div className="relative text-sm font-medium text-gray-300">{db.name}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white/40 rounded-full" />
              </div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section id="features" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                  Everything You Need
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6" />
                <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                  Professional tools for database management
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FaBolt />,
                    title: 'Real-Time Execution',
                    description: 'Execute queries instantly with live results and performance metrics.',
                  },
                  {
                    icon: <FaDatabase />,
                    title: 'Multi-Database',
                    description: 'Unified interface for MySQL, PostgreSQL, MongoDB, and SQL Server.',
                  },
                  {
                    icon: <FaChartLine />,
                    title: 'Analytics',
                    description: 'Track performance and optimize your database operations.',
                  },
                  {
                    icon: <FaUsers />,
                    title: 'Collaboration',
                    description: 'Share queries and work together with your team in real-time.',
                  },
                  {
                    icon: <FaCode />,
                    title: 'Smart Editor',
                    description: 'Syntax highlighting, auto-completion, and intelligent suggestions.',
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: 'Secure',
                    description: 'Enterprise-grade security with encryption and access control.',
                  },
                ].map((feature, index) => (
                  <FloatingCard key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group relative h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-xl backdrop-blur-sm group-hover:border-cyan-500/30 transition-all" />
                      <div className="relative p-8 h-full flex flex-col">
                        <div className="w-12 h-12 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 rounded-lg mb-6 text-cyan-400 text-2xl group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed flex-grow text-sm">
                          {feature.description}
                        </p>
                        <button
                          onClick={rickroll}
                          className="mt-6 flex items-center text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors group/link"
                        >
                          Learn more
                          <svg className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  </FloatingCard>
                ))}
              </div>
            </div>
          </section>

          {/* Demo Credentials */}
          <section className="relative py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />

                <div className="relative text-center mb-12">
                  <HiOutlineCommandLine className="text-6xl text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                    Try the Platform
                  </h3>
                  <p className="text-gray-400">Use demo credentials to explore</p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { role: 'Student Access', email: 'estudiante@test.com' },
                    { role: 'Admin Access', email: 'admin@test.com' },
                  ].map((demo, index) => (
                    <div
                      key={index}
                      className="relative bg-[#0a0a0a] border border-white/10 rounded-lg p-6"
                    >
                      <div className="flex items-center mb-4 pb-4 border-b border-white/10">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mr-3">
                          <HiOutlineCircleStack className="text-cyan-400" />
                        </div>
                        <div className="font-semibold text-white">{demo.role}</div>
                      </div>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex items-center text-gray-300">
                          <span className="text-gray-500 mr-3">Email:</span>
                          <span>{demo.email}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <span className="text-gray-500 mr-3">Pass:</span>
                          <span>123456</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative text-center">
                  <Link href={ROUTES.LOGIN}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-white text-black font-semibold rounded-lg"
                    >
                      Launch Demo
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm p-16"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl" />
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Ready to Start?
                  </h2>
                  <p className="text-lg text-gray-400 mb-10 font-light max-w-2xl mx-auto">
                    Join developers and data professionals using MultiDB Academy
                  </p>
                  <Link href={ROUTES.REGISTER}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-4 bg-white text-black font-bold text-lg rounded-lg"
                    >
                      Get Started Free
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                    <HiOutlineCircleStack className="text-white" />
                  </div>
                  <span className="font-bold text-white">MultiDB Academy</span>
                </div>

                <div className="flex items-center space-x-6">
                  {[
                    { Icon: FaGithub, label: 'GitHub' },
                    { Icon: FaTwitter, label: 'Twitter' },
                    { Icon: FaLinkedin, label: 'LinkedIn' }
                  ].map(({ Icon, label }, index) => (
                    <button
                      key={index}
                      onClick={rickroll}
                      aria-label={label}
                      className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors"
                    >
                      <Icon className="text-gray-400 hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
                    <button
                      key={index}
                      onClick={rickroll}
                      className="text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6 text-sm text-gray-500">
                © 2024 MultiDB Academy
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* RICKROLL MODAL */}
      <VideoModal isOpen={isRickrolling} onClose={stopRickroll} />
    </>
  );
}