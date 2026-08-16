"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { MoodConfig, MOOD_IDS, getMoodConfig } from "@/config/mood-config";

const MOOD_DOT_COLORS: Record<string, string> = {
  "just-vibing": "#A855F7",
  "need-pick-me-up": "#F59E0B",
  "something-mellow": "#10B981",
  "in-my-feelings": "#EC4899",
  "late-night-drive": "#6366F1",
  "locked-in": "#8B5CF6",
  "getting-things-done": "#F8FAFC",
  "need-some-energy": "#EF4444",
  "slow-sunday": "#3B82F6",
  "feeling-good": "#06B6D4",
};

const MOOD_TEMPO_TAGS: Record<string, string> = {
  "just-vibing": "MID TEMPO",
  "need-pick-me-up": "UPBEAT",
  "something-mellow": "LOW TEMPO",
  "in-my-feelings": "DOWN TEMPO",
  "late-night-drive": "DRIVING BPM",
  "locked-in": "DEEP FOCUS",
  "getting-things-done": "HIGH ENERGY",
  "need-some-energy": "MAX DYNAMICS",
  "slow-sunday": "CHILL VIBE",
  "feeling-good": "BRIGHT VALENCE",
};

interface MoodChipProps {
  mood: MoodConfig;
  isSelected: boolean;
  onSelect: () => void;
  isLoading?: boolean;
}

export function MoodChip({ mood, isSelected, onSelect, isLoading }: MoodChipProps) {
  const dotColor = MOOD_DOT_COLORS[mood.id] || "#A855F7";
  const tempoTag = MOOD_TEMPO_TAGS[mood.id] || "ACTIVE";

  return (
    <motion.button
      onClick={onSelect}
      disabled={isLoading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative inline-flex items-center gap-3 rounded-2xl px-6 py-4 text-sm font-medium transition-all duration-300 border",
        isSelected
          ? "bg-[#052317] border-[#10B981] text-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          : "bg-[#0E0E1B] border-[#1C1C32] text-slate-200 hover:border-[#2D2D50] hover:bg-[#141426]"
      )}
      aria-pressed={isSelected}
      aria-label={mood.label}
    >
      {/* Small Color Dot */}
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{
          backgroundColor: isSelected ? "#10B981" : dotColor,
          boxShadow: isSelected ? "0 0 10px #10B981" : `0 0 8px ${dotColor}80`,
        }}
      />

      {/* Mood Title */}
      <span className="font-sans font-semibold tracking-wide">{mood.label}</span>

      {/* Selected Active Tag & Animated Waveform */}
      {isSelected && (
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#10B981]/30">
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#10B981]">
            {tempoTag}
          </span>
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2.5 bg-[#10B981] animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#10B981] animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-[#10B981] animate-pulse delay-150" />
          </div>
        </div>
      )}

      {isLoading && (
        <svg className="animate-spin h-4 w-4 ml-1 text-emerald-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
    </motion.button>
  );
}

interface MoodChipSelectorProps {
  onMoodSelect: (moodId: string) => void;
  selectedMoodId: string | null;
  moodSessionLoading?: string | null;
}

export function MoodChipSelector({ onMoodSelect, selectedMoodId, moodSessionLoading }: MoodChipSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Select your mood"
      className="flex flex-wrap items-center justify-start sm:justify-center gap-3.5"
    >
      {MOOD_IDS.map((moodId) => {
        const mood = getMoodConfig(moodId);
        const isSelected = selectedMoodId === moodId;
        const isLoading = moodSessionLoading === moodId;
        return (
          <MoodChip
            key={moodId}
            mood={mood}
            isSelected={isSelected}
            isLoading={isLoading}
            onSelect={() => onMoodSelect(moodId)}
          />
        );
      })}
    </div>
  );
}