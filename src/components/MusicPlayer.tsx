import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Minus, Maximize2, SkipBack, SkipForward } from 'lucide-react';
import { SpotifyIcon } from './SocialIcons';

export interface TrackItem {
  id: number;
  title: string;
  artist: string;
  cover: string;
  audio: string;
}

export const PLAYLIST: TrackItem[] = [
  {
    id: 1,
    title: 'Sunsetz',
    artist: 'Cigarettes After Sex',
    cover: 'https://cdn.nekohime.site/file/fiw44nk2.jpg',
    audio: 'https://cdn.nekohime.site/file/xq0jp7nz.mp3',
  },
  {
    id: 2,
    title: 'Indecision (feat. Daniel Caesar)',
    artist: 'Rex Orange County, Daniel Caesar',
    cover: 'https://s7.vltcs.my.id/d/c1a4971b.jpg',
    audio: 'https://s7.vltcs.my.id/d/62c0a35a.mp3',
  },
];

// Global single audio instance to manage playlist playback
class AudioController {
  private static instance: HTMLAudioElement | null = null;
  private static listeners: Set<() => void> = new Set();
  public static currentTrackIndex = 0;
  public static isPlaying = false;
  public static currentTime = 0;
  public static duration = 0;
  public static volume = 0.85;
  public static isMuted = false;
  public static isReady = false;

  public static get currentTrack(): TrackItem {
    return PLAYLIST[this.currentTrackIndex] || PLAYLIST[0];
  }

  public static getAudio(): HTMLAudioElement {
    if (!this.instance && typeof window !== 'undefined') {
      const audio = new Audio(this.currentTrack.audio);
      audio.preload = 'metadata';
      audio.volume = this.volume;

      audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      audio.addEventListener('timeupdate', () => {
        this.currentTime = audio.currentTime;
        this.notify();
      });

      audio.addEventListener('loadedmetadata', () => {
        this.duration = audio.duration || 214;
        this.isReady = true;
        this.notify();
      });

      audio.addEventListener('ended', () => {
        this.nextTrack(true);
      });

      this.instance = audio;
    }
    return this.instance!;
  }

  public static togglePlay() {
    const audio = this.getAudio();
    if (audio.paused) {
      audio.play().catch((err) => {
        console.warn('Playback error / User interaction needed:', err);
      });
    } else {
      audio.pause();
    }
  }

  public static setTrack(index: number, autoPlay = true) {
    if (index < 0 || index >= PLAYLIST.length) return;
    this.currentTrackIndex = index;
    const audio = this.getAudio();
    audio.src = PLAYLIST[index].audio;
    audio.load();
    this.currentTime = 0;
    this.duration = 0;
    this.notify();

    if (autoPlay || this.isPlaying) {
      audio.play().catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  }

  public static nextTrack(autoPlay = true) {
    const nextIdx = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.setTrack(nextIdx, autoPlay);
  }

  public static prevTrack(autoPlay = true) {
    const prevIdx = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.setTrack(prevIdx, autoPlay);
  }

  public static seek(time: number) {
    const audio = this.getAudio();
    audio.currentTime = time;
    this.currentTime = time;
    this.notify();
  }

  public static toggleMute() {
    const audio = this.getAudio();
    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
    this.notify();
  }

  public static subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private static notify() {
    this.listeners.forEach((fn) => fn());
  }
}

const useSharedAudio = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    AudioController.getAudio();
    return AudioController.subscribe(() => setTick((t) => t + 1));
  }, []);

  return {
    currentTrack: AudioController.currentTrack,
    currentTrackIndex: AudioController.currentTrackIndex,
    isPlaying: AudioController.isPlaying,
    currentTime: AudioController.currentTime,
    duration: AudioController.duration || 214,
    volume: AudioController.volume,
    isMuted: AudioController.isMuted,
    togglePlay: () => AudioController.togglePlay(),
    nextTrack: () => AudioController.nextTrack(),
    prevTrack: () => AudioController.prevTrack(),
    setTrack: (idx: number) => AudioController.setTrack(idx),
    seek: (time: number) => AudioController.seek(time),
    toggleMute: () => AudioController.toggleMute(),
  };
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const FloatingMusicPlayer: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    toggleMute,
  } = useSharedAudio();
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * duration);
  };

  return (
    <div className="fixed bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-40 select-none">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-2xl bg-white/95 backdrop-blur-md border-2 border-slate-900/10 transition-shadow duration-300 text-slate-800 overflow-hidden w-[230px] sm:w-[250px] ${
          isPlaying
            ? 'shadow-[0_16px_36px_-6px_rgba(15,23,42,0.32),0_6px_20px_rgba(29,185,84,0.28),0_0_0_1px_rgba(15,23,42,0.1)]'
            : 'shadow-[0_16px_36px_-6px_rgba(15,23,42,0.3),0_6px_16px_rgba(15,23,42,0.16),0_0_0_1px_rgba(15,23,42,0.1)]'
        }`}
      >
        {/* Floating Mini-Window Titlebar */}
        <div
          onClick={() => isMinimized && setIsMinimized(false)}
          className={`px-2.5 py-1.5 bg-slate-900 text-white flex items-center justify-between gap-2 border-b border-slate-800/80 transition-colors ${
            isMinimized ? 'cursor-pointer hover:bg-slate-850' : ''
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {/* Spotify Logo */}
            <div className="w-4.5 h-4.5 rounded-full bg-[#1DB954] flex items-center justify-center text-white shrink-0 shadow-xs">
              <SpotifyIcon size={12} className="text-white fill-white" />
            </div>

            {/* Header Title: Playlist */}
            <span className="font-mono text-[11px] font-bold text-white truncate max-w-[100px] sm:max-w-[120px] tracking-tight">
              Playlist
            </span>

            {/* Track indicator badge (e.g. 1/2) */}
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              {currentTrackIndex + 1}/{PLAYLIST.length}
            </span>
          </div>

          {/* Header Controls & Soundwave */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Micro Equalizer */}
            <div className="flex items-center gap-0.5 h-2.5 px-0.5">
              {[40, 90, 50, 100].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: isPlaying ? [`${h * 0.25}%`, `${h}%`, `${h * 0.35}%`] : '20%',
                  }}
                  transition={{
                    duration: 0.6 + i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 rounded-full bg-emerald-400 inline-block h-full"
                />
              ))}
            </div>

            {/* Minimize / Expand Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              aria-label={isMinimized ? 'Expand window' : 'Minimize window'}
              className="w-4.5 h-4.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMinimized ? <Maximize2 size={10} /> : <Minus size={10} />}
            </motion.button>
          </div>
        </div>

        {/* Floating Window Content */}
        <AnimatePresence mode="wait" initial={false}>
          {isMinimized ? (
            /* Minimized Sleek Pill Window */
            <motion.div
              key="minimized"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="px-2.5 py-2 flex items-center gap-2 bg-white/95"
            >
              {/* Album Art with clean shadow */}
              <div
                className="relative w-8 h-8 rounded-lg bg-slate-950 shrink-0 overflow-hidden border border-slate-200 shadow-xs cursor-pointer group"
                onClick={() => nextTrack()}
                title="Click to next track"
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>

              {/* Judul Musik */}
              <div
                className="min-w-0 flex-1 text-left cursor-pointer"
                onClick={() => setIsMinimized(false)}
              >
                <p className="font-mono text-xs font-bold text-slate-900 truncate leading-tight">
                  {currentTrack.title}
                </p>
                <p className="font-mono text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>

              {/* Next track button in mini view */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                aria-label="Next track"
                title="Next song"
                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <SkipForward size={11} fill="currentColor" />
              </motion.button>

              {/* Mini Play / Pause Button with depth shadow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-7 h-7 rounded-lg bg-[#1DB954] hover:bg-[#1cd05a] text-white flex items-center justify-center shrink-0 border border-emerald-600/30 shadow-[0_2px_0_0_#15803d] active:shadow-none active:translate-y-0.5 transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={12} fill="currentColor" />
                ) : (
                  <Play size={12} className="ml-0.5" fill="currentColor" />
                )}
              </motion.button>
            </motion.div>
          ) : (
            /* Expanded Compact Window */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-2.5 flex flex-col gap-2.5"
            >
              {/* Track Info */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full bg-slate-950 shrink-0 overflow-hidden shadow-sm border border-slate-800 p-0.5 flex items-center justify-center">
                  <motion.img
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      rotate: isPlaying
                        ? { repeat: Infinity, duration: 6, ease: 'linear' }
                        : { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="absolute w-2 h-2 rounded-full bg-white border border-slate-900" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <h5 className="font-mono text-xs font-bold text-slate-900 truncate" title={currentTrack.title}>
                    {currentTrack.title}
                  </h5>
                  <p className="font-mono text-[10px] text-slate-500 truncate mt-0.5" title={currentTrack.artist}>
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Progress Scrubber */}
              <div>
                <div
                  ref={progressBarRef}
                  onClick={handleSeekClick}
                  className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden cursor-pointer relative group"
                >
                  <motion.div
                    style={{ width: `${progressPercent}%` }}
                    className="bg-[#1DB954] h-full rounded-full transition-all duration-150 ease-out"
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-400 mt-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  onClick={toggleMute}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  <span className="text-[9px] font-mono">
                    {isMuted ? 'Muted' : 'Vol'}
                  </span>
                </motion.button>

                {/* Track Navigation (Prev / Next) & Play Button */}
                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTrack}
                    aria-label="Previous track"
                    title="Previous song"
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <SkipBack size={11} fill="currentColor" />
                  </motion.button>

                  <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.94, y: 1 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="px-3 py-1 rounded-lg bg-[#1DB954] hover:bg-[#1cd05a] text-white font-mono text-[11px] font-bold flex items-center gap-1 border border-emerald-600/30 shadow-[0_2px_0_0_#15803d] active:shadow-none active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause size={11} fill="currentColor" />
                    ) : (
                      <Play size={11} fill="currentColor" />
                    )}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTrack}
                    aria-label="Next track"
                    title="Next song"
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <SkipForward size={11} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
