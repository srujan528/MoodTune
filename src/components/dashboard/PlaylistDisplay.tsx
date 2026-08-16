"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { getMoodConfig } from "@/config/mood-config";
import { usePlayer } from "@/components/player/PlayerContext";
import { useToast } from "@/components/ui";

interface PlaylistDisplayProps {
  moodId: string;
}

interface SavedTrack {
  id: string;
  spotify_track_id: string;
  track_name: string;
  artist_name: string;
  album_name: string | null;
  album_image_url: string | null;
  preview_url: string | null;
  spotify_url: string;
  mood: string;
  saved_at: string;
}

export function PlaylistDisplay({ moodId }: PlaylistDisplayProps) {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedTracks, setSavedTracks] = useState<Set<string>>(new Set());
  const [savingTrackId, setSavingTrackId] = useState<string | null>(null);
  const { playTrack, pauseTrack, currentTrack, isPlaying, progress, duration, playerReady, initializationError, requiresPremium, clearError } = usePlayer();
  const { toast } = useToast();

  const moodConfig = getMoodConfig(moodId);

  const fetchSavedTracks = useCallback(async () => {
    try {
      const res = await fetch("/api/saved-tracks");
      if (res.ok) {
        const data = await res.json();
        const saved: Set<string> = new Set((data.tracks || []).map((t: SavedTrack) => t.spotify_track_id));
        setSavedTracks(saved);
      }
    } catch (error) {
      console.error("Error fetching saved tracks:", error);
    }
  }, []);

  useEffect(() => {
    fetchSavedTracks();
  }, [fetchSavedTracks]);

  useEffect(() => {
    async function fetchPlaylist() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/playlist?mood=${moodId}`);
        if (res.ok) {
          const data = await res.json();
          setTracks(data.tracks || []);
        } else {
          const error = await res.json();
          setError(error.error || "Failed to fetch playlist");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setError("Failed to fetch playlist");
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, [moodId]);

  const handlePlay = (track: any) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  const handleSaveTrack = async (track: any) => {
    if (savingTrackId === track.id) return;
    setSavingTrackId(track.id);
    try {
      const isSaved = savedTracks.has(track.id);
      if (isSaved) {
        const res = await fetch(`/api/saved-tracks/${track.id}`, { method: "DELETE" });
        if (res.ok) {
          setSavedTracks(prev => {
            const next = new Set(prev);
            next.delete(track.id);
            return next;
          });
          toast("Removed from saved tracks", "success");
        } else {
          toast("Failed to remove track", "error");
        }
      } else {
        const res = await fetch("/api/saved-tracks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track }),
        });
        if (res.ok) {
          const data = await res.json();
          setSavedTracks(prev => new Set(prev).add(data.track?.spotify_track_id || track.id));
          toast("Saved to your library", "success");
        } else {
          toast("Failed to save track", "error");
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving track:", error);
      toast("Something went wrong", "error");
    } finally {
      setSavingTrackId(null);
    }
  };

  if (error) {
    const isSpotifyNotConnected = error.includes("Spotify not connected");
    return (
      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        {isSpotifyNotConnected && (
          <a
            href="/api/auth/spotify"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.084 3.163 9.426 7.548 10.93.55.1.747-.292.747-.644 0-.317.013-1.155.013-2.234-3.073.667-3.724-1.319-3.724-1.319-.504-1.281-1.233-1.623-1.233-1.623-1.007-.689.076-.675.076-.675 1.114.07 1.699 1.144 1.699 1.144.988 1.691 2.592 1.203 3.225.919.1-.714.388-1.203.706-1.479-2.465-.279-5.054-1.231-5.054-5.479 0-1.21.433-2.196 1.145-2.961-.115-.279-.496-1.4.11-2.914 0 0 .935-.295 3.064 1.143.887-.248 1.836-.372 2.79-.372.954 0 1.903.124 2.79.372 2.13-1.438 3.064-1.143 3.064-1.143.606 1.514.225 2.635.11 2.914.712.765 1.145 1.751 1.145 2.961 0 4.256-2.594 5.199-5.479.398.342.75 1.02.75 2.056 0 1.485-.013 2.68-.013 3.043 0 .354.196.764.752.643C20.837 21.426 24 17.083 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Connect Spotify
          </a>
        )}
      </div>
    );
  }



  if (!moodConfig) return null;

  return (
    <section aria-labelledby="playlist-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="playlist-heading" className="text-2xl font-bold text-foreground">
              Your {moodConfig.label} Mix
              <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                is ready
              </span>
            </h2>
            <p className="text-muted-foreground mt-1">
              {tracks.length} tracks curated for this moment
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-violet-600 text-white font-medium transition-all"
          >
            Play Mix
          </motion.button>
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10" />
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-white/5 rounded mt-1" />
                </div>
                <div className="w-16 text-right text-muted-foreground">3:30</div>
              </motion.div>
            ))}
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No tracks found for this mood.
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <div className="space-y-1 p-4">
              {tracks.map((track, index) => (
                <PlaylistTrackRow
                  key={track.id}
                  track={track}
                  index={index + 1}
                  isCurrent={currentTrack?.id === track.id}
                  isPlaying={isPlaying && currentTrack?.id === track.id}
                  progress={currentTrack?.id === track.id ? progress : 0}
                  duration={duration}
                  onPlay={() => handlePlay(track)}
                  onPause={pauseTrack}
                  moodColor={getMoodConfig(moodId)?.accentColor}
                  isSaved={savedTracks.has(track.id)}
                  onSave={() => handleSaveTrack(track)}
                  saving={savingTrackId === track.id}
                  playerReady={playerReady}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function PlaylistTrackRow({
  track,
  index,
  isCurrent,
  isPlaying,
  progress,
  duration,
  onPlay,
  onPause,
  moodColor,
  isSaved,
  onSave,
  saving,
  playerReady,
}: {
  track: any;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  moodColor?: string;
  isSaved: boolean;
  onSave: () => void;
  saving: boolean;
  playerReady: boolean;
}) {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn(
        "group flex items-center gap-4 p-4 transition-colors",
        isCurrent && "bg-primary/10"
      )}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-center gap-3 w-12 flex-shrink-0">
        <span className="text-sm font-mono text-muted-foreground/50 tabular-nums w-7 text-right">
          {index}
        </span>
        <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 15px ${moodColor}30` }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${moodColor}20, ${moodColor}05)` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-4 w-4 text-white/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Play ${track.name}`}
              onClick={() => onPlay()}
              disabled={!playerReady}
            >
              <svg className="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "font-medium truncate transition-colors",
          isCurrent ? "text-primary" : "text-foreground"
        )}>
          {track.name}
        </h4>
        <p className="text-sm text-muted-foreground/70 truncate">{track.artist}</p>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
        <span className="font-mono tabular-nums w-14 text-right">
          {track.duration ? (() => {
            const minutes = Math.floor(track.duration / 60000);
            const seconds = Math.floor((track.duration % 60000) / 1000);
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
          })() : "--:--"}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors",
            isSaved ? "text-red-400" : "text-muted-foreground/70 hover:text-red-400"
          )}
          aria-label={isSaved ? `Remove from saved` : `Save to favorites`}
          onClick={onSave}
          disabled={saving}
        >
          {saving ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}