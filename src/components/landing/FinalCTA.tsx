"use client";

import { motion } from "framer-motion";

export function FinalCTA({ selectedMoodId }: { selectedMoodId?: string | null }) {
  return (
    <section
      id="final-cta"
      className="relative py-24 bg-[#0A0908] text-center font-sans overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-mono text-[#EAB308] uppercase tracking-widest bg-[#1A1714] px-4 py-1.5 rounded-full border border-[#332E28] mb-6">
            START LISTENING
          </span>

          <h2
            id="final-cta-heading"
            className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight text-[#F3EFE6] leading-[1.1] mb-6"
          >
            Find a soundtrack for this{" "}
            <span className="italic font-normal text-[#EAB308] underline decoration-[#EAB308]/40 underline-offset-8">
              exact moment
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-[#A39E93] max-w-xl mx-auto mb-10 leading-relaxed">
            Pick a vibe, press play, and let MoodTune match your state of mind. Free to use with zero setup required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#mood-selector"
              className="px-8 py-4 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-[#0A0908] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(234,179,8,0.25)] flex items-center gap-2"
            >
              <span>PICK YOUR MOOD</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="/auth/spotify"
              className="px-8 py-4 rounded-xl bg-[#161412] hover:bg-[#201D1A] border border-[#2E2924] text-[#F3EFE6] font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200"
            >
              CONNECT SPOTIFY
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-xs font-mono text-[#A39E93]">
            <span>NO CREATIVE BUZZWORDS</span>
            <span>•</span>
            <span>100% ACOUSTIC RESIDUAL MATCHING</span>
            <span>•</span>
            <span>SPOTIFY CONNECTED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}