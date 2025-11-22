import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    dot = false,
}) => {
    const variants = {
        primary: 'bg-cyan-500 text-white border-2 border-cyan-400',
        success: 'bg-green-500 text-white border-2 border-green-400',
        warning: 'bg-yellow-500 text-black border-2 border-yellow-400',
        danger: 'bg-red-500 text-white border-2 border-red-400',
        info: 'bg-blue-500 text-white border-2 border-blue-400',
        gray: 'bg-gray-600 text-white border-2 border-gray-500',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
    };

    return (
        <span
            className={`
        inline-flex items-center font-bold rounded-full
        ${variants[variant]} ${sizes[size]}
      `}
        >
            {dot && (
                <span className="w-2 h-2 rounded-full bg-white mr-1.5 animate-pulse" />
            )}
            {children}
        </span>
    );
};