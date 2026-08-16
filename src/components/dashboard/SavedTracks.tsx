"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { usePlayer } from "@/components/player/PlayerContext";
import { useToast } from "@/components/ui";

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

export function SavedTracks() {
  const [tracks, setTracks] = useState<SavedTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, pauseTrack, currentTrack, isPlaying, progress, duration } = usePlayer();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSavedTracks() {
      setLoading(true);
      try {
        const res = await fetch("/api/saved-tracks");
        if (res.ok) {
          const data = await res.json();
          setTracks(data.tracks || []);
        }
      } catch (error) {
        console.error("Error fetching saved tracks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSavedTracks();
  }, []);

  const handlePlay = (track: SavedTrack) => {
    if (currentTrack?.id === track.spotify_track_id && isPlaying) {
      pauseTrack();
    } else {
      playTrack({ id: track.spotify_track_id, spotify_track_id: track.spotify_track_id, track_name: track.track_name, artist_name: track.artist_name, album_name: track.album_name, album_image_url: track.album_image_url, preview_url: track.preview_url, spotify_url: track.spotify_url, mood: track.mood, saved_at: track.saved_at });
    }
  };

  const handleUnsave = async (trackId: string, trackName: string) => {
    try {
      const res = await fetch(`/api/saved-tracks/${trackId}`, { method: "DELETE" });
      if (res.ok) {
        setTracks(prev => prev.filter(t => t.id !== trackId));
        toast(`Removed "${trackName}" from saved tracks`, "success");
      } else {
        toast("Failed to remove track", "error");
      }
    } catch (error) {
      console.error("Error unsaving track:", error);
      toast("Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`skeleton-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10" />
            <div className="flex-1">
              <div className="h-5 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-white/5 rounded mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="text-xl font-semibold text-foreground mb-4">
          Your Saved Tracks
        </h2>
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <p className="text-lg">No saved tracks yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Save tracks from recommendations to build your library</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="saved-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="saved-heading" className="text-xl font-semibold text-foreground">
          Your Saved Tracks
        </h2>
        <span className="text-sm text-muted-foreground">{tracks.length} tracks</span>
      </div>
      <div className="space-y-2">
{tracks.map((track, index) => (
            <SavedTrackRow
              key={`track-${track.id}`}
              track={track}
              index={index + 1}
              isCurrent={currentTrack?.id === track.spotify_track_id}
              isPlaying={isPlaying && currentTrack?.id === track.spotify_track_id}
              progress={currentTrack?.id === track.spotify_track_id ? progress : 0}
              duration={duration}
              onPlay={() => playTrack({ id: track.spotify_track_id, spotify_track_id: track.spotify_track_id, track_name: track.track_name, artist_name: track.artist_name, album_name: track.album_name, album_image_url: track.album_image_url, preview_url: track.preview_url, spotify_url: track.spotify_url, mood: track.mood, saved_at: track.saved_at })}
              onPause={() => pauseTrack()}
              onUnsave={() => handleUnsave(track.id, track.track_name)}
          />
        ))}
      </div>
    </section>
  );
}

function SavedTrackRow({
  track,
  index,
  isCurrent,
  isPlaying,
  progress,
  duration,
  onPlay,
  onPause,
  onUnsave,
}: {
  track: SavedTrack;
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlay: () => void;
  onPause: () => void;
  onUnsave: () => void;
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
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors"
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex items-center gap-3 w-12 flex-shrink-0">
        <span className="text-sm font-mono text-muted-foreground/50 tabular-nums w-7 text-right">{index}</span>
        <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
          {track.album_image_url ? (
            <img
              src={track.album_image_url}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
              <svg className="h-5 w-5 text-white/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          )}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            whileHover={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
              aria-label={`Play ${track.track_name}`}
              onClick={onPlay}
            >
              <svg className="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">{track.track_name}</h4>
        <p className="text-sm text-muted-foreground/70 truncate">{track.artist_name}</p>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
        <span className="font-mono tabular-nums w-14 text-right">{track.preview_url ? formatTime(duration) : "--:--"}</span>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground/70 hover:text-red-400 transition-colors"
          aria-label={`Remove ${track.track_name} from saved`}
          onClick={onUnsave}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}