"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { useState } from "react";

export function BentoGridSection() {
  const [activeTab, setActiveTab] = useState<"valence" | "energy" | "danceability">("energy");

  return (
    <section id="features" className="relative py-24 z-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            ✨ Engineered for Music Lovers
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1]">
            Powered by acoustic intelligence,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              built for real emotions
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Explore how MoodTune translates your emotional state into your perfect Spotify soundtrack.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Tile 1: AI Acoustic Radar Analysis (Large 2x2) */}
          <SpotlightCard className="md:col-span-2 lg:col-span-2 md:row-span-2 flex flex-col justify-between p-8 bg-slate-900/80 border-white/10 hover:border-violet-500/30 shadow-2xl relative">
            <BorderBeam size={300} duration={14} colorFrom="#8b5cf6" colorTo="#10b981" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3 rounded-2xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                  ACOUSTIC ENGINE v2
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Acoustic Radar & Valence Matching
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed mb-6">
                Unlike simple keyword searches, MoodTune measures acoustic valence (positivity), energy dynamics, danceability, and tempo curves to find tracks that match your exact wavelength.
              </p>
            </div>

            {/* Interactive Feature Meter */}
            <div className="space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Metric</span>
                <span>Value</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-emerald-400">Valence (Positivity)</span>
                    <span className="text-emerald-400 font-mono">84%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "84%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-violet-400">Energy & Dynamics</span>
                    <span className="text-violet-400 font-mono">72%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "72%" }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-pink-400">Acoustic Resonance</span>
                    <span className="text-pink-400 font-mono">91%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "91%" }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Tile 2: Real Spotify Sync */}
          <SpotlightCard className="md:col-span-1 lg:col-span-2 p-8 bg-slate-900/80 border-white/10 hover:border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  SPOTIFY SDK SYNC
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                1-Click Spotify Integration
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                Connect your Spotify account to personalize recommendations based on your listening history, or save generated mood playlists straight to your Spotify library.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80"
                alt="Album Cover"
                className="w-12 h-12 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">As It Was</h4>
                <p className="text-xs text-muted-foreground truncate">Harry Styles • Harry&apos;s House</p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 rounded-md border border-emerald-500/30">
                PLAYING
              </span>
            </div>
          </SpotlightCard>

          {/* Tile 3: AI Explanation Engine */}
          <SpotlightCard className="md:col-span-1 lg:col-span-2 p-8 bg-slate-900/80 border-white/10 hover:border-pink-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <span className="text-xs font-mono text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  AI INSIGHTS
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                &ldquo;Why These Tracks?&rdquo; AI Insights
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                Get intelligent explanations for why every track was picked, breaking down acoustic keys, tempo transitions, and emotional harmony.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-200 leading-relaxed">
              <span className="font-semibold text-pink-400 block mb-1">✨ AI Explanation:</span>
              &ldquo;This track features gentle acoustic strumming with warm sub-bass frequencies at 92 BPM, matching your mellow introspective state.&rdquo;
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
