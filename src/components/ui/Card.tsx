import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      className={`bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 transition-all duration-200 ${hover ? 'hover:shadow-xl' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}