"use client";

import { motion } from "framer-motion";

export function FinalCTA({ selectedMoodId }: { selectedMoodId?: string | null }) {
  return (
    <section
      id="final-cta"
      className="relative py-24 lg:py-32 bg-[#080811] text-white text-center overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1DB95415 1px, transparent 1px), linear-gradient(90deg, #1DB95415 1px, transparent 1px)`,
          backgroundSize: `48px 48px`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#052317] border border-[#10B981]/30 text-xs font-mono tracking-widest uppercase text-[#1DB954]">
            <span>START YOUR SESSION</span>
          </div>

          <h2
            id="final-cta-heading"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Find something that <br />
            <span className="bg-gradient-to-r from-[#1DB954] via-emerald-300 to-teal-200 bg-clip-text text-transparent italic font-serif font-normal">
              fits the moment.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Pick a vibe and let MoodTune take it from there. Free to use with zero setup required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#mood-discovery"
              className="px-8 py-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(29,185,84,0.4)]"
            >
              Find my vibe
            </a>

            <a
              href="/auth/spotify"
              className="px-8 py-4 rounded-xl bg-[#121222] hover:bg-[#1A1A32] border border-[#232342] text-white font-semibold text-base transition-all duration-300"
            >
              Connect Spotify
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}