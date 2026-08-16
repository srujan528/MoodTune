"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const differentiators = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
    ),
    title: "AI That Explains",
    description: "Spotify recommends. MoodTune explains. Every track comes with a detailed breakdown of why it matches your mood — tempo, key, valence, lyrical themes, production style.",
    highlight: "Transparent AI",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
    ),
    title: "Your Data, Yours",
    description: "Unlike Spotify's algorithm that optimizes for engagement, MoodTune optimizes for you. Your mood history never leaves your device unless you choose to share it.",
    highlight: "Privacy First",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
    ),
    title: "Mood Memory",
    description: "Track your emotional journey over months. See patterns in your moods, the music that helped, and how your taste evolves. Spotify shows you what you played. MoodTune shows you why.",
    highlight: "Emotional Intelligence",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
    ),
    title: "Share the Feeling",
    description: "Create collaborative mood playlists with friends. Host a \"Rainy Day\" session where everyone adds their perfect cozy track. Music is social — MoodTune makes it feel that way.",
    highlight: "Social Discovery",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    ),
    title: "Instant, Not Algorithmic",
    description: "No waiting for weekly discovery playlists. Tell MoodTune how you feel right now, get recommendations in under a second. Your mood doesn't wait for Monday.",
    highlight: "Real-time",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
    ),
    title: "Built for Music Lovers",
    description: "Every feature designed by people who obsess over audio quality, album artwork, liner notes, and the ritual of listening. Not engagement metrics — the music itself.",
    highlight: "Craft First",
  },
];

export function WhyMoodTune() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" aria-labelledby="why-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          style={{ animation: "float 15s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl"
          style={{ animation: "float 18s ease-in-out infinite reverse" }}
        />
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Why MoodTune?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Spotify has great recommendations. MoodTune has explanations, privacy, and emotional intelligence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {differentiators.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={cn(
                "relative group p-6 rounded-2xl border bg-white/5 backdrop-blur-sm transition-all duration-300",
                "border-white/10 hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]"
              )}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.1 }}
                className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                {item.icon}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-primary/80 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {item.highlight}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="text-xl font-semibold text-foreground mb-3"
              >
                {item.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="text-muted-foreground leading-relaxed"
              >
                {item.description}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            MoodTune isn&apos;t a replacement for Spotify. It&apos;s the layer that makes Spotify truly personal.
          </p>
          <motion.a
            href="/auth/spotify"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-white font-medium hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 transition-all duration-200"
          >
            Start Discovering
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}