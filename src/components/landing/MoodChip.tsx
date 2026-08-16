"use client";

import React from "react";
import { motion } from "framer-motion";

export const TARGET_MOODS = [
  { id: "just-vibing", num: "01", label: "Just vibing", tag: "loose & easy" },
  { id: "need-pick-me-up", num: "02", label: "Need a pick-me-up", tag: "bright side" },
  { id: "something-mellow", num: "03", label: "Something mellow", tag: "soft focus" },
  { id: "in-my-feelings", num: "04", label: "In my feelings", tag: "a little tender" },
  { id: "late-night-drive", num: "05", label: "Late-night drive", tag: "after hours" },
  { id: "locked-in", num: "06", label: "Locked in", tag: "deep focus" },
  { id: "getting-things-done", num: "07", label: "Getting things done", tag: "steady motion" },
  { id: "need-some-energy", num: "08", label: "Need some energy", tag: "turn it up" },
  { id: "slow-sunday", num: "09", label: "Slow Sunday", tag: "take your time" },
  { id: "feeling-good", num: "010", label: "Feeling good", tag: "high spirits" },
];

export function MoodChipSelector({
  onMoodSelect,
  selectedMoodId,
  moodSessionLoading,
}: {
  onMoodSelect: (moodId: string) => void;
  selectedMoodId: string | null;
  moodSessionLoading?: string | null;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {TARGET_MOODS.map((m) => {
        const isSelected = selectedMoodId === m.id || (!selectedMoodId && m.id === "something-mellow");
        const isLoading = moodSessionLoading === m.id;

        return (
          <motion.button
            key={m.id}
            whileHover={{ y: -3 }}
            onClick={() => onMoodSelect(m.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-28 ${
              isSelected
                ? "bg-[#052317] border-[#1DB954] text-white shadow-[0_0_20px_rgba(29,185,84,0.3)]"
                : "bg-[#0E0E1B] border-[#1C1C32] text-slate-300 hover:border-[#1DB954]/50 hover:bg-[#141428]"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-xs font-mono font-bold ${isSelected ? "text-[#1DB954]" : "text-slate-500"}`}>
                {m.num}
              </span>
              {isLoading && (
                <div className="w-3.5 h-3.5 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <div>
              <h4 className="font-bold text-sm text-white">{m.label}</h4>
              <p className="text-[11px] text-slate-400 italic font-sans">{m.tag}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}