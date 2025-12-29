import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`w-full max-w-md md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};