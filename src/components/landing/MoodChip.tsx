"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils/helpers";
import { MoodConfig, MOOD_IDS, getMoodConfig } from "@/config/mood-config";

const MOOD_EMOJIS: Record<string, string> = {
  "just-vibing": "😌",
  "need-pick-me-up": "☀️",
  "something-mellow": "🌿",
  "in-my-feelings": "💗",
  "late-night-drive": "🌙",
  "locked-in": "🔒",
  "getting-things-done": "⚡",
  "need-some-energy": "🔥",
  "slow-sunday": "☁️",
  "feeling-good": "✨",
};

interface MoodChipProps {
  mood: MoodConfig;
  isSelected: boolean;
  onSelect: () => void;
  isLoading?: boolean;
}

export function MoodChip({ mood, isSelected, onSelect, isLoading }: MoodChipProps) {
  const prefersReducedMotion = useReducedMotion();
  const scale = useMotionValue<number>(1);
  const borderOpacity = useMotionValue<number>(0);
  const backgroundIntensity = useMotionValue<number>(0);

  const springScale = useSpring(scale, { stiffness: 400, damping: 25 });
  const springBorder = useSpring(borderOpacity, { stiffness: 300, damping: 30 });
  const springBg = useSpring(backgroundIntensity, { stiffness: 300, damping: 30 });

  const emoji = MOOD_EMOJIS[mood.id] || "🎵";

  const handleMouseEnter = () => {
    if (!isSelected && !isLoading) {
      scale.set(1.03);
      borderOpacity.set(0.6);
      backgroundIntensity.set(0.15);
    }
  };
  const handleMouseLeave = () => {
    if (!isSelected) {
      scale.set(1);
      borderOpacity.set(0);
      backgroundIntensity.set(0);
    }
  };
  const handleMouseDown = () => {
    if (!isLoading) scale.set(0.97);
  };
  const handleClick = () => {
    if (isLoading) return;
    scale.set(0.95);
    onSelect();
  };

  const accentHex = mood.accentColor;
  const accentRgb = mood.accentRgb;

  return (
    <motion.button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      disabled={isLoading}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
      style={{
        scale: prefersReducedMotion ? (isSelected ? 1.02 : 1) : springScale,
        backgroundColor: isSelected ? "#EAB308" : "#161412",
        borderColor: isSelected ? "#EAB308" : "#2E2924",
        boxShadow: isSelected ? "0 4px 20px rgba(234, 179, 8, 0.25)" : undefined,
      }}
      className={cn(
        "relative inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-xs font-mono tracking-wider uppercase transition-all duration-200 border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAB308]",
        "text-[#F3EFE6] hover:border-[#423C36] hover:bg-[#201D1A]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isSelected && "text-[#0A0908] font-bold border-transparent"
      )}
      aria-pressed={isSelected}
      aria-label={mood.label}
      aria-busy={isLoading}
    >
      <span aria-hidden="true" style={{ fontSize: "1.1em" }}>{emoji}</span>
      <span>{mood.label}</span>
      {isSelected && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)` }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {isLoading && (
        <svg className="animate-spin h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      className="flex flex-wrap items-center justify-center gap-2.5"
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