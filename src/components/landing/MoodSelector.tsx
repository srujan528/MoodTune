"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";
import { MoodChipSelector } from "./MoodChip";

export function MoodSelector({ onMoodSelect, selectedMoodId, moodSessionLoading }: { onMoodSelect: (moodId: string) => void; selectedMoodId: string | null; moodSessionLoading?: string | null }) {
  return (
    <section
      id="mood-discovery"
      className="relative py-8 sm:py-12 lg:py-16"
      aria-labelledby="mood-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 id="mood-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-2">
            What are you in the mood for?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl mx-auto">
            Pick a vibe. We&apos;ll take it from there.
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