"use client";

import { motion } from "framer-motion";
import { MoodChipSelector } from "./MoodChip";
import { getMoodConfig } from "@/config/mood-config";

export function MoodSelector({
  onMoodSelect,
  selectedMoodId,
  moodSessionLoading,
}: {
  onMoodSelect: (moodId: string) => void;
  selectedMoodId: string | null;
  moodSessionLoading?: string | null;
}) {
  const selectedConfig = selectedMoodId ? getMoodConfig(selectedMoodId) : null;

  return (
    <section
      id="mood-discovery"
      className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="mood-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3"
        >
          <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            01 / THE VIBE
          </div>
          <h2 id="mood-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white hidden">
            Ten states of mind, not twelve hundred genres.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Ten states of mind, not twelve hundred genres. Pick the one that sounds like your day.
          </p>
        </motion.div>

        {/* Mood Chips Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MoodChipSelector
            onMoodSelect={onMoodSelect}
            selectedMoodId={selectedMoodId}
            moodSessionLoading={moodSessionLoading}
          />
        </motion.div>

        {/* Selected Mood Status Bar at Bottom */}
        <div className="pt-8 flex items-center gap-4 border-t border-[#18182E] text-xs font-mono tracking-wider text-slate-400">
          <span className="uppercase text-slate-500">SELECTED</span>
          <span className="text-[#6E36E4]">——————</span>
          <span className="text-[#10B981] font-bold text-sm">
            {selectedConfig ? selectedConfig.label : "Something mellow"}
          </span>
        </div>
      </div>
    </section>
  );
}