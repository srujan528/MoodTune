"use client";

import { motion } from "framer-motion";
import { MoodChipSelector } from "./MoodChip";

export function MoodSelector({
  onMoodSelect,
  selectedMoodId,
  moodSessionLoading,
}: {
  onMoodSelect: (moodId: string) => void;
  selectedMoodId: string | null;
  moodSessionLoading?: string | null;
}) {
  return (
    <section
      id="mood-discovery"
      className="relative py-24 lg:py-32 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="mood-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 text-left space-y-3"
          >
            <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
              01 / FIND YOUR FREQUENCY
            </div>
            <h2 id="mood-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              What are you in the mood for?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              There&apos;s no wrong answer. Pick the feeling that&apos;s closest.
            </p>
          </motion.div>

          {/* Right Sidebar Widget */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] flex items-center gap-4 text-left shadow-lg">
            <div className="w-11 h-11 rounded-full border-2 border-[#1DB954] border-dashed flex items-center justify-center shrink-0 animate-[spin_12s_linear_infinite]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#1DB954]" />
            </div>
            <div>
              <p className="text-xs text-slate-300 font-sans leading-snug">
                Music is a mirror. Let&apos;s see what yours sounds like today.
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#1DB954] font-bold block mt-1">
                10 MOODS / INFINITE MIXES
              </span>
            </div>
          </div>
        </div>

        {/* 10 Mood Cards Grid */}
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
      </div>
    </section>
  );
}