"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { MoodChipSelector } from "./MoodChip";

export function MoodSelector({ onMoodSelect, selectedMoodId, moodSessionLoading }: { onMoodSelect: (moodId: string) => void; selectedMoodId: string | null; moodSessionLoading?: string | null }) {
  return (
    <section
      id="mood-discovery"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#0A0908] border-b border-[#2A2622]"
      aria-labelledby="mood-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="inline-block text-xs font-mono text-[#EAB308] uppercase tracking-widest bg-[#1A1714] px-4 py-1.5 rounded-full border border-[#332E28] mb-4">
            VIBE SELECTOR
          </span>
          <h2 id="mood-heading" className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#F3EFE6] mb-3">
            What are you in the mood for?
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#A39E93] max-w-xl mx-auto">
            Select a state of mind to calibrate your custom soundtrack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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