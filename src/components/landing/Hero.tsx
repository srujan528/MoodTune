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

          {/* Right Column: Pure Live Animated Soundscape Spectrum Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="p-6 rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] shadow-2xl space-y-6 text-left relative overflow-hidden">
              
              {/* Card Top Technical Header */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-[#1E1E38] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                  <span className="text-[#1DB954] font-bold tracking-wider">LIVE ACOUSTIC SIGNAL</span>
                </div>
                <span className="text-slate-400 text-[11px] font-mono">44.1 kHz • STEREO</span>
              </div>

              {/* Center Pure Animated Visualizer Orb & Waveform */}
              <div className="flex items-center justify-center py-4 relative">
                
                {/* Glowing Concentric Animated Pulse Circles */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  
                  {/* Outer Outer Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#1DB954]/20"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Middle Ring */}
                  <motion.div
                    className="absolute inset-2 rounded-full border-2 border-[#1DB954]/40"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Core Orb with Equalizer Bars */}
                  <div className="w-24 h-24 rounded-full bg-[#052317] border-2 border-[#1DB954] shadow-[0_0_30px_rgba(29,185,84,0.4)] flex items-center justify-center gap-1.5 z-10">
                    <motion.span
                      className="w-1.5 bg-[#1DB954] rounded-full"
                      animate={{ height: ["25%", "90%", "30%", "100%", "25%"] }}
                      transition={{ duration: 0.7, repeat: Infinity, repeatType: "mirror" }}
                    />
                    <motion.span
                      className="w-1.5 bg-[#1ed760] rounded-full"
                      animate={{ height: ["70%", "20%", "100%", "40%", "70%"] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                    />
                    <motion.span
                      className="w-1.5 bg-[#10B981] rounded-full"
                      animate={{ height: ["100%", "40%", "85%", "15%", "100%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
                    />
                    <motion.span
                      className="w-1.5 bg-[#34D399] rounded-full"
                      animate={{ height: ["35%", "85%", "20%", "75%", "35%"] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Multi-Channel Soundbar Spectrum Analyzer */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <span>SPECTRUM ANALYZER</span>
                  <span className="text-[#1DB954] font-bold">REALTIME TUNING</span>
                </div>

                <div className="flex items-end gap-1 h-10">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-full bg-[#1DB954]"
                      animate={{
                        height: ["15%", "100%", "30%", "85%", "15%"],
                      }}
                      transition={{
                        duration: 0.4 + (i % 6) * 0.12,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    />
                  ))}
                </div>
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