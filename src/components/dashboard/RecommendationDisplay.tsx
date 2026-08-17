"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { getMoodConfig, MOOD_IDS } from "@/config/mood-config";
import { MoodIcon } from "@/components/landing/MoodIcon";
import { usePlayer } from "@/components/player/PlayerContext";
import { useToast } from "@/components/ui";

interface RecommendationDisplayProps {
  moodId: string;
}

export function RecommendationDisplay({ moodId }: RecommendationDisplayProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const { playTrack, playerReady, initializationError, requiresPremium, clearError } = usePlayer();
  const { toast } = useToast();

  const moodConfig = getMoodConfig(moodId);

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/recommendations?mood=${moodId}`);
        if (res.ok) {
          const data = await res.json();
          setRecommendations(data.recommendations || []);
        } else {
          const error = await res.json();
          setError(error.error || "Failed to fetch recommendations");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations");
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [moodId]);

  const handleGetAIExplanations = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moodId, tracks: recommendations.map((r: any) => r.track) }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(prev => prev.map((rec, index) => ({
          ...rec,
          aiReason: data.recommendations?.[index]?.reason,
          matchFactors: data.recommendations?.[index]?.matchFactors,
        })));
        toast("AI explanations added", "success");
      } else {
        toast("Failed to get AI explanations", "error");
      }
    } catch (error) {
      console.error("Error getting AI explanations:", error);
      toast("Something went wrong", "error");
    } finally {
      setAiLoading(false);
    }
  };

  const handlePlay = (rec: any) => {
    console.log("[RecommendationDisplay] handlePlay called with:", rec.track);
    const track = rec.track;
    playTrack({
      id: track.id,
      name: track.name,
      artist: track.artists?.map((a: any) => a.name).join(", ") || track.artist,
      album: track.album?.name,
      albumImageUrl: track.album?.images?.[0]?.url,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls?.spotify,
      duration: track.duration_ms,
      uri: track.uri,
    });
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
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.084 3.163 9.426 7.548 10.93.55.1.747-.292.747-.644 0-.317.013-1.155.013-2.234-3.073.667-3.724-1.319-3.724-1.319-.504-1.281-1.233-1.623-1.233-1.623-1.007-.689.076-.675.076-.675 1.114.07 1.699 1.144 1.699 1.144.988 1.691 2.592 1.203 3.225.919.1-.714.388-1.203.706-1.479-2.465-.279-5.054-1.231-5.054-5.479 0-1.21.433-2.196 1.145-2.961-.115-.279-.496-1.4.11-2.914 0 0 .935-.295 3.064 1.143.887-.248 1.836-.372 2.79-.372.954 0 1.903.124 2.79.372 2.13-1.438 3.064-1.143 3.064-1.143.606 1.514.225 2.635.11 2.914.712.765 1.145 1.751 1.145 2.961 0 4.256-2.594 5.199-5.471.398.342.75 1.02.75 2.056 0 1.485-.013 2.68-.013 3.043 0 .354.196.764.752.643C20.837 21.426 24 17.083 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Connect Spotify
          </a>
        )}
      </div>
    );
  }



  if (!moodConfig) return null;

  return (
    <section aria-labelledby="rec-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="rec-heading" className="text-2xl font-bold text-foreground">
              Recommended for{" "}
              <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
                {moodConfig.label}
              </span>
            </h2>
            <p className="text-muted-foreground mt-1">
              {recommendations.length} tracks matched to your mood
            </p>
          </div>
          <motion.button
            onClick={handleGetAIExplanations}
            disabled={aiLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground hover:bg-white/10 transition-colors"
          >
            {aiLoading ? "Analyzing..." : "Why these tracks?"}
          </motion.button>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No recommendations found for this mood. Try another mood!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard
                key={rec.track.id}
                rec={rec}
                index={index}
                moodColor={getMoodConfig(moodId)?.accentColor}
                onPlay={handlePlay}
                playerReady={playerReady}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function RecommendationCard({ rec, index, moodColor, onPlay, playerReady }: { rec: any; index: number; moodColor?: string; onPlay: (rec: any) => void; playerReady: boolean }) {
  const initialImage = rec.track.albumImageUrl || rec.track.album?.images?.[0]?.url;
  const [imgSrc, setImgSrc] = useState<string | null>(initialImage);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgSrc(rec.track.albumImageUrl || rec.track.album?.images?.[0]?.url);
    setImgError(false);
  }, [rec.track]);

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true);
      const query = encodeURIComponent(`${rec.track.name} ${rec.track.artist || ""}`);
      fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results?.[0]?.artworkUrl100) {
            setImgSrc(data.results[0].artworkUrl100.replace("100x100bb", "600x600bb"));
          } else {
            setImgSrc(null);
          }
        })
        .catch(() => setImgSrc(null));
    }
  };

  const spotifyUrl =
    rec.track.external_urls?.spotify ||
    rec.track.spotifyUrl ||
    `https://open.spotify.com/search/${encodeURIComponent(rec.track.name + " " + (rec.track.artist || ""))}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex flex-col bg-[#0E0E1B] border border-[#1E1E38] rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br z-10 pointer-events-none"
          style={{
            background: moodColor
              ? `linear-gradient(135deg, ${moodColor}20, ${moodColor}08, transparent)`
              : undefined,
          }}
        />
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={rec.track.name}
            onError={handleImgError}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900/90 text-center">
            <span className="text-3xl mb-1">🎵</span>
            <span className="text-xs font-semibold text-white truncate max-w-full">{rec.track.name}</span>
            <span className="text-[10px] text-slate-400 truncate max-w-full">{rec.track.artist}</span>
          </div>
        )}
      </div>

      {/* Track Info & Spotify Link */}
      <div className="p-3 flex flex-col justify-between flex-1 space-y-2.5">
        <div>
          <h3 className="font-bold text-white text-xs sm:text-sm truncate">{rec.track.name}</h3>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">
            {rec.track.artist || rec.track.artists?.map((a: any) => a.name).join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-[#1C1C32]">
          <button
            onClick={() => onPlay(rec)}
            disabled={!playerReady}
            className="flex-1 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play</span>
          </button>

          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-1.5 px-2 rounded-lg bg-[#1DB954]/15 hover:bg-[#1DB954]/25 border border-[#1DB954]/40 text-[#1DB954] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>Spotify</span>
          </a>
        </div>
      </div>

      {(rec.aiReason || rec.matchFactors?.length) && (
        <div className="p-2.5 bg-black/40 text-[10px] text-slate-400 border-t border-[#1C1C32]">
          {rec.aiReason && <p className="line-clamp-2">{rec.aiReason}</p>}
        </div>
      )}
    </motion.article>
  );
}