'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export const StatCounter = ({ end, duration = 2, suffix = '', prefix = '' }: StatCounterProps) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
        if (!inView) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(Math.floor(end * progress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [inView, end, duration]);

    return (
        <motion.span
            ref={ref}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{count.toLocaleString()}{suffix}
        </motion.span>
    );
};