"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ParticlePortalModal } from "@/components/ui/ParticlePortalModal";

export function FinalCTA({ selectedMoodId }: { selectedMoodId?: string | null }) {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <>
      <ParticlePortalModal
        isOpen={showPortal}
        targetUrl="/auth/spotify"
        title="CONNECTING TO SPOTIFY"
      />

      {/* Section 04 / TAKE IT WITH YOU */}
      <section
        id="spotify-connect"
        className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left relative overflow-hidden shadow-2xl">
            
            {/* Left Graphic: Concentric Vinyl Rings */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-[#1DB954]/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-[#1DB954]/40 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#1DB954] bg-[#1DB954]/10 flex items-center justify-center shadow-[0_0_30px_rgba(29,185,84,0.4)]">
                    <svg className="w-12 h-12 fill-[#1DB954]" viewBox="0 0 24 24">
                      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title & Spotify CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
                04 / TAKE IT WITH YOU
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Your music. Your Spotify.
              </h2>

              <p className="text-base text-slate-300 font-sans leading-relaxed">
                Connect Spotify and listen to your personalized mixes directly through MoodTune.
              </p>

              <div>
                <button
                  onClick={() => setShowPortal(true)}
                  className="px-8 py-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(29,185,84,0.4)]"
                >
                  <span>CONNECT SPOTIFY</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M5 19L19 5M19 5H9M19 5V19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="text-xs font-mono text-slate-500 mt-2">
                  No credentials needed for this demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="relative py-24 lg:py-32 bg-[#080811] text-white text-center overflow-hidden border-b border-[#16162A]">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#1DB954]">
              <span>THE NEXT SONG IS CLOSER THAN YOU THINK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              What&apos;s your vibe today?
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              One mood. A whole new soundtrack.
            </p>

            <div className="flex items-center justify-center pt-4">
              <a
                href="#mood-discovery"
                className="px-8 py-4 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(29,185,84,0.4)]"
              >
                <span>FIND MY VIBE</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}