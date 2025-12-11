"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function BentoCard({ children, className = "", delay = 0 }: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.02 }}
            className={`bento-card ${className}`}
        >
            {children}
        </motion.div>
    );
}

export function BentoGrid({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
        </div>
    );
}
