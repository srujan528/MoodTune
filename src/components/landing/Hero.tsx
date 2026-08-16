"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VinylDeck } from "@/components/ui/VinylDeck";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0D0C0A] border-b border-[#2A2622] pt-20 pb-16 lg:pt-28 lg:pb-24">
      {/* Background Micro Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Brand Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#181613] border border-[#332E28] px-4 py-1.5 text-xs font-mono tracking-widest uppercase text-[#EAB308] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span>ANALOG MOOD CURATION • SPOTIFY READY</span>
          </motion.div>

          {/* Headline - Human & Direct */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-[#F3EFE6] leading-[1.08] mb-6"
          >
            Music for how you{" "}
            <span className="italic font-normal text-[#EAB308] underline decoration-[#EAB308]/40 underline-offset-8">
              actually feel
            </span>{" "}
            right now.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base sm:text-lg text-[#A39E93] max-w-2xl mx-auto leading-relaxed font-sans"
          >
            No algorithmic generic filler. MoodTune matches acoustic valence, tempo, and emotional resonance to generate curated Spotify soundtracks tailored to your state of mind.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#mood-selector"
              className="px-8 py-4 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-[#0A0908] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(234,179,8,0.25)] flex items-center gap-2"
            >
              <span>SELECT YOUR MOOD</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="#features"
              className="px-8 py-4 rounded-xl bg-[#161412] hover:bg-[#201D1A] border border-[#2E2924] text-[#F3EFE6] font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200"
            >
              READ LINER NOTES
            </a>
          </motion.div>
        </motion.div>

        {/* Tactile Analog Vinyl Turntable Widget */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <VinylDeck />
          </motion.div>
        )}
      </div>
    </section>
  );
}