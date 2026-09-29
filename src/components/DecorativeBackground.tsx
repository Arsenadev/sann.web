import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Sparkles, Coffee, Rocket, Headphones, Globe, Zap, Database, Music } from 'lucide-react';

export const DecorativeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft abstract ambient gradient glow blobs in corners */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-[60px] bg-gradient-to-br from-sky-200/50 via-blue-100/40 to-transparent blur-2xl transform rotate-12" />
      <div className="absolute top-1/4 -right-28 w-80 h-80 rounded-[50px] bg-gradient-to-bl from-indigo-100/60 via-purple-100/40 to-transparent blur-2xl" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-[70px] bg-gradient-to-tr from-cyan-100/50 via-sky-50/40 to-transparent blur-2xl transform -rotate-6" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 rounded-[45px] bg-gradient-to-tl from-amber-100/40 via-sky-100/30 to-transparent blur-2xl" />

      {/* Large Abstract Rounded Shapes (Soft Neo-brutalist Blobs around outer edges) */}
      <div className="hidden lg:block absolute -top-16 -left-12 w-64 h-64 rounded-[42px] border-2 border-sky-300/30 bg-white/40 shadow-sm transform -rotate-12" />
      <div className="hidden lg:block absolute top-1/3 -right-16 w-56 h-56 rounded-[36px] border-2 border-indigo-200/40 bg-white/30 shadow-sm transform rotate-6" />
      <div className="hidden lg:block absolute -bottom-16 -left-10 w-72 h-72 rounded-[48px] border-2 border-cyan-200/35 bg-white/35 shadow-sm transform rotate-12" />
      <div className="hidden lg:block absolute bottom-12 -right-12 w-60 h-60 rounded-[40px] border-2 border-slate-200/50 bg-white/40 shadow-sm transform -rotate-6" />

      {/* Left-Side Floating Decorative Elements (Only in empty side margin) */}
      <div className="hidden md:block absolute left-4 lg:left-8 xl:left-16 top-20">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] text-slate-700"
        >
          <span className="text-sm">⚡</span>
          <span className="text-xs font-mono font-medium text-sky-700">Go & Node</span>
        </motion.div>
      </div>

      <div className="hidden md:block absolute left-6 lg:left-12 xl:left-24 top-72">
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="w-11 h-11 rounded-2xl bg-white/85 border border-sky-200/70 shadow-[0_4px_12px_rgba(56,189,248,0.12)] flex items-center justify-center text-sky-600"
        >
          <Terminal size={18} strokeWidth={2.2} />
        </motion.div>
      </div>

      <div className="hidden md:block absolute left-3 lg:left-10 xl:left-20 top-[32rem]">
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 border border-amber-200/70 shadow-[0_4px_12px_rgba(245,158,11,0.08)] text-slate-700"
        >
          <span className="text-sm">☕</span>
          <span className="text-xs font-mono text-amber-800 font-medium">Coffee & Code</span>
        </motion.div>
      </div>

      <div className="hidden md:block absolute left-5 lg:left-14 xl:left-28 top-[48rem]">
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          className="w-11 h-11 rounded-2xl bg-white/85 border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-indigo-600"
        >
          <Database size={18} strokeWidth={2.2} />
        </motion.div>
      </div>

      {/* Right-Side Floating Decorative Elements (Only in empty side margin) */}
      <div className="hidden md:block absolute right-4 lg:right-8 xl:right-16 top-28">
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="w-11 h-11 rounded-2xl bg-white/85 border border-rose-200/70 shadow-[0_4px_12px_rgba(244,63,94,0.1)] flex items-center justify-center text-rose-500"
        >
          <Rocket size={18} strokeWidth={2.2} />
        </motion.div>
      </div>

      <div className="hidden md:block absolute right-6 lg:right-12 xl:right-24 top-80">
        <motion.div
          animate={{ y: [0, 11, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/85 border border-indigo-200/70 shadow-[0_4px_12px_rgba(99,102,241,0.1)] text-slate-700"
        >
          <Headphones size={15} className="text-indigo-600" />
          <span className="text-xs font-mono text-indigo-700 font-medium">Lo-Fi State</span>
        </motion.div>
      </div>

      <div className="hidden md:block absolute right-3 lg:right-10 xl:right-20 top-[34rem]">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="w-11 h-11 rounded-2xl bg-white/85 border border-emerald-200/70 shadow-[0_4px_12px_rgba(16,185,129,0.1)] flex items-center justify-center text-emerald-600"
        >
          <Globe size={18} strokeWidth={2.2} />
        </motion.div>
      </div>

      <div className="hidden md:block absolute right-5 lg:right-14 xl:right-28 top-[50rem]">
        <motion.div
          animate={{ y: [0, 13, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/85 border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] text-slate-700"
        >
          <span className="text-sm">✨</span>
          <span className="text-xs font-mono text-slate-700 font-medium">Fast API</span>
        </motion.div>
      </div>
    </div>
  );
};
