'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
}

export const GradientText = ({ children, className = '' }: GradientTextProps) => {
    return (
        <span
            className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${className}`}
        >
            {children}
        </span>
    );
};