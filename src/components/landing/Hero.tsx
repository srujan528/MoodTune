"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#07080E] text-white pt-16 pb-16 lg:pt-24 lg:pb-24 border-b border-[#141522]">
      {/* Background Soundwave Graphic Visualizer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none overflow-hidden">
        <div className="flex items-center gap-1 w-full max-w-5xl h-48 px-4 justify-between">
          {Array.from({ length: 96 }).map((_, i) => {
            // Create a realistic sin wave distribution
            const centerDist = Math.abs(i - 48) / 48;
            const heightPercent = Math.max(10, (1 - centerDist * 0.7) * (30 + Math.sin(i * 0.3) * 50));
            return (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-purple-900/40 via-[#1DB954]/60 to-purple-500/40"
                animate={{
                  height: [`${heightPercent * 0.6}%`, `${heightPercent}%`, `${heightPercent * 0.4}%`, `${heightPercent}%`],
                }}
                transition={{
                  duration: 1.5 + (i % 7) * 0.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Top Right Section Tag */}
      <div className="absolute top-8 right-8 hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#1DB954] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
        <span>MOOD SIGNAL / 01</span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
          
          {/* Left Column: Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-7 text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-[#1DB954] uppercase font-semibold">
              <span className="w-6 h-0.5 bg-[#1DB954]" />
              <span>YOUR PERSONAL MUSIC COMPASS</span>
              <span>——————</span>
            </div>

            {/* Headline matching screenshot */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
              Music that gets <br />
              <span className="text-[#a78bfa] font-serif font-normal italic">
                your mood.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-md leading-relaxed">
              Tell us how you&apos;re feeling. We&apos;ll find the music that fits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mood-discovery"
                className="px-7 py-3.5 rounded-full bg-[#c2f0c2] hover:bg-[#a3e635] text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(194,240,194,0.4)] hover:shadow-[0_0_35px_rgba(163,230,53,0.6)]"
              >
                <span>FIND MY VIBE</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="#playlist"
                className="px-6 py-3 rounded-full bg-[#10111D] hover:bg-[#181A2D] border border-[#22243A] text-slate-200 font-semibold text-xs transition-all duration-300 flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center">
                  <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>Try a demo</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Floating Bottom-Right NOW TUNING INTO Widget matching target screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex justify-end lg:pt-28"
          >
            <div className="p-3.5 rounded-2xl bg-[#0B0C16]/90 border border-[#1E2035] shadow-2xl backdrop-blur-md flex items-center gap-3.5 text-left w-full max-w-xs">
              
              {/* Retro Brown/Sunset Album Art Square */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-950 border border-amber-600/30 flex items-center justify-center shrink-0 shadow-md relative overflow-hidden">
                <div className="w-5 h-5 rounded-md bg-amber-500/40 border border-amber-400/50" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                  NOW TUNING INTO
                </span>
                <h4 className="text-xs font-bold text-white truncate">something mellow</h4>
              </div>

              {/* Animated Equalizer Soundbars */}
              <div className="flex items-center gap-0.5 h-4 shrink-0">
                <motion.span
                  className="w-0.5 bg-[#1DB954] rounded-full"
                  animate={{ height: ["20%", "100%", "30%", "80%"] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.span
                  className="w-0.5 bg-[#1ed760] rounded-full"
                  animate={{ height: ["80%", "20%", "90%", "40%"] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.span
                  className="w-0.5 bg-[#10B981] rounded-full"
                  animate={{ height: ["40%", "90%", "20%", "100%"] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.span
                  className="w-0.5 bg-[#34D399] rounded-full"
                  animate={{ height: ["100%", "30%", "70%", "20%"] }}
                  transition={{ duration: 0.45, repeat: Infinity, repeatType: "mirror" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Row matching screenshot */}
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#141522] text-left text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">🎧</span>
            <span className="text-slate-400">Personalised for the moment you&apos;re in.</span>
          </div>

          <div className="text-center sm:text-center text-slate-500 uppercase tracking-widest text-[10px]">
            SOUNDTRACKING THE IN-BETWEEN
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-slate-500">01 —— 03</span>
            <span className="text-slate-500 text-[10px]">37° 46&apos; N / 122° 25&apos; W</span>
          </div>
        </div>
      </div>
    </section>
  );
}