"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { InteractiveVibeDemo } from "./InteractiveVibeDemo";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center py-20 lg:py-28">
      <AuroraBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300 shadow-[0_0_20px_rgba(167,139,250,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>⚡ AI Acoustic Intelligence & Spotify Sync</span>
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6"
          >
            Music tuned to your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-emerald-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(167,139,250,0.4)]">
              exact mood & vibe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
          >
            Select how you feel right now. MoodTune analyzes acoustic valence, tempo, and energy to generate your perfect Spotify playlist in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(167, 139, 250, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              href="#mood-selector"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 text-white font-semibold text-base shadow-[0_10px_30px_rgba(129,140,248,0.35)] transition-all duration-300 flex items-center gap-2"
            >
              <span>Pick Your Vibe</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-base transition-all duration-300 backdrop-blur-md"
            >
              How It Works
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Live Interactive Player Demo Widget in Hero */}
        {mounted && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveVibeDemo />
          </motion.div>
        )}
      </div>
    </section>
  );
}