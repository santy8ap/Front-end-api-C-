'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
    isOpen,
    onClose,
    videoId = 'dQw4w9WgXcQ', // Default rickroll 😎
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            // Opcional: Reproducir sonido
            const audio = new Audio('/rickroll-sound.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => {
                // Ignorar si el navegador bloquea autoplay
            });
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border-2 border-cyan-500"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b-2 border-gray-800 bg-gradient-to-r from-cyan-900/50 to-blue-900/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                    <h3 className="text-xl font-bold text-white">Important Message</h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Video Container */}
                            <div className="relative pt-[56.25%] bg-black">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                    title="Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-gray-800 text-center">
                                <p className="text-gray-400 text-sm font-medium">
                                    🎉 You&apos;ve been rickrolled! This feature is coming soon™
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};