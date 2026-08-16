"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { usePlayer } from "@/components/player/PlayerContext";
import { useRef } from "react";

export function NowPlayingBar() {
  const { currentTrack, isPlaying, progress, duration, playTrack, pauseTrack, resumeTrack, seek, nextTrack, previousTrack, setVolume, volume } = usePlayer();
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (currentTrack?.albumImageUrl) {
      setImgSrc(currentTrack.albumImageUrl);
      setImgError(false);
    } else {
      setImgSrc(null);
      setImgError(true);
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <motion.div
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
          "relative flex items-center justify-between gap-4 px-6 py-3 rounded-t-2xl",
          "bg-[#0E0E1B]/95 backdrop-blur-xl border-t border-x border-[#1E1E38] shadow-[0_-10px_40px_rgba(0,0,0,0.8)] text-white"
        )}>
          {/* Left Track Info & Artwork */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1 sm:flex-initial">
            {!imgError && imgSrc ? (
              <img
                src={imgSrc}
                alt={currentTrack.name}
                onError={() => {
                  fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(currentTrack.name + " " + (currentTrack.artist || ""))}&media=music&limit=1`)
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.results?.[0]?.artworkUrl100) {
                        setImgSrc(data.results[0].artworkUrl100.replace("100x100bb", "600x600bb"));
                      } else {
                        setImgError(true);
                      }
                    })
                    .catch(() => setImgError(true));
                }}
                className="w-12 h-12 rounded-xl object-cover border border-[#232342] shadow-md shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#052317] border border-[#10B981]/30 flex items-center justify-center shadow-md shrink-0">
                <svg className="h-6 w-6 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm truncate max-w-[180px] sm:max-w-[240px]">
                  {currentTrack.name}
                </h3>
                <span className="text-[9px] font-mono text-[#1DB954] bg-[#052317] border border-[#10B981]/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider hidden sm:inline-block">
                  NOW PLAYING
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-[200px]">
                  {currentTrack.artist}
                </p>
                <a
                  href={
                    currentTrack.spotifyUrl && currentTrack.spotifyUrl.startsWith("http")
                      ? currentTrack.spotifyUrl
                      : `https://open.spotify.com/search/${encodeURIComponent(currentTrack.name + " " + (currentTrack.artist || ""))}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#1DB954] hover:underline font-semibold"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span>Full song</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={previousTrack}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-[0_0_20px_rgba(29,185,84,0.4)] flex items-center justify-center transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <svg className="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24">
                {isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Right Volume Control */}
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="hover:text-white transition-colors"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                {volume === 0 ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                )}
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(parseInt(e.target.value, 10) / 100)}
              className="w-20 h-1.5 appearance-none bg-[#232342] rounded-full accent-[#1DB954]"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}