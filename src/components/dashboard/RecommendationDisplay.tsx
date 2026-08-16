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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/10">
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
            <span className="text-[10px] text-muted-foreground truncate max-w-full">{rec.track.artist}</span>
          </div>
        )}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{rec.track.name}</h3>
            <p className="text-xs text-muted-foreground/80 truncate">{rec.track.artist}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(rec)}
            disabled={!playerReady}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Play ${rec.track.name}`}
          >
            <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {(rec.aiReason || rec.matchFactors?.length) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.05 }}
          className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground"
        >
          {rec.aiReason && <p className="mb-2">{rec.aiReason}</p>}
          {rec.matchFactors?.length && (
            <div className="flex flex-wrap gap-1">
              {rec.matchFactors.map((factor: string, i: number) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary/80"
                >
                  {factor}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}