import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    headerAction?: React.ReactNode;
    hover?: boolean;
    bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    subtitle,
    headerAction,
    hover = false,
    bordered = false,
}) => {
    return (
        <div
            className={`
        bg-gray-800 border-2 border-gray-700 rounded-xl backdrop-blur-sm
        ${hover ? 'hover:border-cyan-500 hover:shadow-xl transition-all duration-300' : ''}
        ${bordered ? 'border-gray-600' : ''}
        ${className}
      `}
        >
            {(title || headerAction) && (
                <div className="px-6 py-4 border-b-2 border-gray-700 bg-gray-800/50">
                    <div className="flex items-center justify-between">
                        <div>
                            {title && (
                                <h3 className="text-xl font-bold text-white">{title}</h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-gray-300 mt-1 font-medium">{subtitle}</p>
                            )}
                        </div>
                        {headerAction && <div>{headerAction}</div>}
                    </div>
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
};