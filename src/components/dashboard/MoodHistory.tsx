"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMoodConfig } from "@/config/mood-config";
import { MoodIcon } from "@/components/landing/MoodIcon";
import { cn } from "@/lib/utils/helpers";

interface MoodHistoryItem {
  id: string;
  mood: string;
  description: string | null;
  created_at: string;
}

export function MoodHistory({ onRevisitMood }: { onRevisitMood?: (moodId: string) => void }) {
  const [history, setHistory] = useState<MoodHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const res = await fetch("/api/mood-history");
        if (res.ok) {
          const data = await res.json();
          setHistory(data.history || []);
        }
      } catch (error) {
        console.error("Error fetching mood history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10" />
            <div className="flex-1">
              <div className="h-5 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-white/5 rounded mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
          <MoodIcon name="default" className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-lg">No mood history yet</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Select a mood to start building your history</p>
      </div>
    );
  }

  return (
    <section aria-labelledby="history-heading">
      <h2 id="history-heading" className="text-xl font-semibold text-foreground mb-4">
        Your Recent Moods
      </h2>
      <div className="space-y-3">
        {history.map((item, index) => {
          const moodConfig = getMoodConfig(item.mood);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ boxShadow: `0 0 20px ${moodConfig?.accentColor}30` }}>
                <div className="absolute inset-0 rounded-xl opacity-20 blur-sm" style={{ background: moodConfig?.backgroundGradient }} />
                <MoodIcon name={moodConfig?.iconName || "default"} className="h-7 w-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{moodConfig?.label || item.mood}</h3>
                <p className="text-sm text-muted-foreground/70 truncate">{item.description || "No description"}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                <span className="font-mono text-muted-foreground/50">{formatDate(item.created_at)}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRevisitMood?.(item.mood)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground/70 hover:text-primary transition-colors"
                  aria-label={`Revisit ${moodConfig?.label || item.mood}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}