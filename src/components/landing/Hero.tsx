"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#080811] text-white pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-[#16162A]">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#26264A 1px, transparent 1px), linear-gradient(90deg, #26264A 1px, transparent 1px)`,
          backgroundSize: `48px 48px`,
        }}
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-left space-y-8"
        >
          {/* Small Top Badge / Equalizer Indicator */}
          <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span>NOW PLAYING / YOUR MOOD</span>
            <span className="text-[#6E36E4] font-bold">——————</span>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-[#6E36E4] animate-pulse" />
              <span className="w-0.5 h-3 bg-[#8B5CF6] animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-[#EC4899] animate-pulse delay-150" />
            </div>
          </div>

          {/* Main Headline from Lovable */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
            Music that gets <br />
            your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent italic font-serif font-normal">
              mood.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-xl leading-relaxed">
            Tell us how you&apos;re feeling. We&apos;ll find the music that fits.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#mood-discovery"
              className="px-8 py-4 rounded-xl bg-[#6E36E4] hover:bg-[#7E46F4] text-white font-semibold text-base transition-all duration-300 shadow-[0_0_30px_rgba(110,54,228,0.5)] hover:shadow-[0_0_40px_rgba(126,70,244,0.7)]"
            >
              Find my vibe
            </a>

            <a
              href="#demo"
              className="px-8 py-4 rounded-xl bg-[#121222] hover:bg-[#1A1A32] border border-[#232342] text-slate-200 font-semibold text-base transition-all duration-300"
            >
              Try a demo
            </a>
          </div>

          {/* Stats Bar at Bottom of Hero */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#18182E] text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">10 moods</div>
              <div className="text-xs text-slate-400 mt-0.5">hand-tuned, no genre lists</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">~4 seconds</div>
              <div className="text-xs text-slate-400 mt-0.5">from feeling to full mix</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">Spotify native</div>
              <div className="text-xs text-slate-400 mt-0.5">plays in your library</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}