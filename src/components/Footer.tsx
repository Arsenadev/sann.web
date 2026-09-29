import React from 'react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.65 }}
      className="w-full text-center pt-6 pb-12 select-none"
    >
      <div className="inline-block px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-xs border border-slate-200/80 shadow-2xs">
        <p className="font-mono text-xs text-slate-500 tracking-tight font-medium">
          © 2026 Sann - All Right Reserved
        </p>
      </div>
    </motion.footer>
  );
};
