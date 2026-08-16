"use client";

import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { usePlayer } from "@/components/player/PlayerContext";
import { useRef } from "react";

export function NowPlayingBar() {
  const { currentTrack, isPlaying, progress, duration, playTrack, pauseTrack, resumeTrack, seek, nextTrack, previousTrack, setVolume, volume } = usePlayer();
  const controlsRef = useAnimation();
  const domRef = useRef<HTMLDivElement>(null);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    seek(value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) / 100;
    setVolume(value);
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      ref={domRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      role="region"
      aria-label="Now playing"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative flex items-center gap-4 px-4 py-3 rounded-t-2xl",
          "bg-background/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        )}>
          <div className="flex items-center gap-4 flex-shrink-0 w-20">
            {currentTrack.albumImageUrl ? (
              <img
                src={currentTrack.albumImageUrl}
                alt={currentTrack.name}
                className="w-12 h-12 rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <motion.h3
                className="font-medium text-foreground truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {currentTrack.name}
              </motion.h3>
              <motion.span
                className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                NOW PLAYING
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              <motion.p
                className="text-sm text-muted-foreground truncate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentTrack.artist}
              </motion.p>
              <a
                href={
                  currentTrack.spotifyUrl && currentTrack.spotifyUrl.startsWith("http")
                    ? currentTrack.spotifyUrl
                    : currentTrack.id && currentTrack.id.length > 15 && !currentTrack.id.includes(" ")
                    ? `https://open.spotify.com/track/${currentTrack.id}`
                    : `https://open.spotify.com/search/${encodeURIComponent(currentTrack.name + " " + (currentTrack.artist || ""))}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#1DB954] hover:underline font-medium"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Full song
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={previousTrack}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7m0 0l7 7m-7-7H4" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: isPlaying ? 0.95 : 1 }}
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-violet-600 text-white shadow-[0_8px_24px_rgba(167,139,250,0.4)] transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isPlaying ? (
                  <>
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </>
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="absolute bottom-full left-0 right-0 mb-2 px-4 pb-2">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-xs font-mono text-muted-foreground tabular-nums w-10"
            >
              {(() => {
                const minutes = Math.floor(progress / 60000);
                const seconds = Math.floor((progress % 60000) / 1000);
                return `${minutes}:${seconds.toString().padStart(2, "0")}`;
              })()}
            </motion.span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={(e) => seek(parseInt(e.target.value, 10))}
              className="flex-1 h-1.5 appearance-none bg-white/10 rounded-full slider-thumb-primary"
              style={{ cursor: "pointer" }}
            />
            <motion.span
              className="text-xs font-mono text-muted-foreground tabular-nums w-14 text-right"
            >
              {(() => {
                const minutes = Math.floor(duration / 60000);
                const seconds = Math.floor((duration % 60000) / 1000);
                return `${minutes}:${seconds.toString().padStart(2, "0")}`;
              })()}
            </motion.span>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {volume === 0 ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2" />
                  </>
                ) : volume < 0.5 ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 16.693a12 12 0 01-3.384 2.497M17.752 19.693a18 18 0 01-6.55 3.497M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </>
                )}
              </svg>
            </motion.button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(parseInt(e.target.value, 10) / 100)}
              className="w-24 h-1.5 appearance-none bg-white/10 rounded-full slider-thumb-primary"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .slider-thumb-primary::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a78bfa, #8b5cf6);
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(167, 139, 250, 0.4);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .slider-thumb-primary::-webkit-slider-thumb:hover {
      transform: scale(1.2);
      box-shadow: 0 4px 16px rgba(167, 139, 250, 0.6);
    }
    .slider-thumb-primary::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a78bfa, #8b5cf6);
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(167, 139, 250, 0.4);
    }
  `;
  document.head.appendChild(style);
}