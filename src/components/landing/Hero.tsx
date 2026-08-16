"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080811] text-white pt-20 pb-16 lg:pt-28 lg:pb-24 border-b border-[#16162A]">
      {/* Ambient Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1DB95415 1px, transparent 1px), linear-gradient(90deg, #1DB95415 1px, transparent 1px)`,
          backgroundSize: `48px 48px`,
        }}
      />

      {/* Ambient Spotify Green Radial Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1DB954]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-[#1DB954] uppercase">
              <span className="w-6 h-0.5 bg-[#1DB954]" />
              <span>YOUR PERSONAL MUSIC COMPASS</span>
              <span>——————</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
              Music that gets <br />
              your{" "}
              <span className="bg-gradient-to-r from-[#1DB954] via-emerald-300 to-teal-200 bg-clip-text text-transparent italic font-serif font-normal">
                mood.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed">
              Tell us how you&apos;re feeling. We&apos;ll find the music that fits.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mood-discovery"
                className="px-8 py-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(29,185,84,0.4)] hover:shadow-[0_0_40px_rgba(29,185,84,0.6)]"
              >
                <span>Find my vibe</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="#playlist"
                className="px-8 py-4 rounded-full bg-[#121222] hover:bg-[#1A1A32] border border-[#232342] text-slate-200 font-semibold text-base transition-all duration-300 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>Try a demo</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Floating Live Player Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="p-6 rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] shadow-2xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-[#1E1E38] pb-3">
                <span className="text-[#1DB954] font-bold">NOW TUNING INTO</span>
                <span className="uppercase text-slate-300">something mellow</span>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 via-emerald-800 to-indigo-900 border border-[#26264A] flex items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30" />
                  <svg className="w-8 h-8 text-white/80 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1DB954] block mb-0.5">
                    MOODTUNE SIGNAL
                  </span>
                  <h4 className="text-lg font-bold text-white truncate">Texas Sun</h4>
                  <p className="text-xs text-slate-400 truncate">Khruangbin & Leon Bridges</p>
                </div>
              </div>

              {/* Animated Sound Bars */}
              <div className="flex items-end gap-1 h-8 pt-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-[#1DB954]"
                    animate={{
                      height: ["20%", "90%", "35%", "75%", "20%"],
                    }}
                    transition={{
                      duration: 0.6 + (i % 5) * 0.15,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Row */}
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#18182E] text-left text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1DB954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"/>
            </svg>
            <span>Personalised for the moment you&apos;re in.</span>
          </div>

          <div className="text-center sm:text-center text-slate-500 uppercase tracking-widest">
            SOUNDTRACKING THE IN-BETWEEN
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-[#1DB954] font-bold">01 —— 03</span>
            <span className="text-slate-500">37° 46&apos; N / 122° 25&apos; W</span>
          </div>
        </div>
      </div>
    </section>
  );
}