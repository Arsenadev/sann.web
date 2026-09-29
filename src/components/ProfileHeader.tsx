import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Code2, Server } from 'lucide-react';

export const ProfileHeader: React.FC = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <header className="flex flex-col items-center text-center">
      {/* Profile Image with Soft Squircle Shape and Neo-brutalist styling */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative group mb-5"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[32px] p-1.5 bg-white border-2 border-slate-900/10 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] group-hover:-translate-y-1">
          {/* Fallback container while loading or if error */}
          {(!imgLoaded || imgError) && (
            <div className="w-full h-full rounded-[26px] bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-mono font-bold shadow-inner">
              S
            </div>
          )}

          {!imgError && (
            <img
              src="https://cp.senxc.my.id/c/1ef8a214c.jpg"
              alt="Sann"
              referrerPolicy="no-referrer"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover rounded-[26px] transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-1.5'
              }`}
            />
          )}

          {/* Active Status Badge Dot */}
          <div
            className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border-2 border-slate-900/10 shadow-sm"
            title="Online & Available"
          >
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Name and Verified Badge */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-center gap-2 mb-1.5"
      >
        <h1 className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tracking-tight">
          Sann
        </h1>
        {/* Verified badge image */}
        <img
          src="https://cdn.nekohime.site/file/i4nmytyz.png"
          alt="Verified Profile"
          title="Verified Profile"
          referrerPolicy="no-referrer"
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block select-none"
          loading="eager"
        />
      </motion.div>

      {/* Username */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-3"
      >
        <span className="font-mono text-xs sm:text-sm font-medium text-sky-700 bg-sky-100/90 border border-sky-200/80 px-3 py-1 rounded-full shadow-[0_2px_0_0_rgba(186,230,253,0.8)]">
          @vsan
        </span>
      </motion.div>

      {/* Role and Location Information */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-600 font-medium max-w-md"
      >
        <div className="flex items-center gap-1.5 text-slate-700 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-xs">
          <Server size={14} className="text-sky-600" />
          <span className="font-medium text-slate-800">Backend Developer</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-600 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-xs">
          <MapPin size={14} className="text-rose-500 shrink-0" />
          <span>Kalimantan Timur, Indonesia</span>
        </div>
      </motion.div>

      {/* Brief bio tagline */}
      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-3 text-xs sm:text-sm text-slate-500 max-w-sm sm:max-w-md leading-relaxed"
      >
        Building resilient microservices, high-throughput APIs, and clean backend architecture.
      </motion.p>
    </header>
  );
};
