"use client";

import { motion } from "framer-motion";
import { useMoodTheme } from "@/hooks";
import { cn } from "@/lib/utils/helpers";

const STEPS = [
  {
    number: "01",
    title: "Tell us how you feel",
    description: "Pick from 10 curated moods — Happy, Heartbroken, Late Night, Focus, and more. Or describe your feeling in your own words for nuanced recommendations.",
    visual: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    visualAlt: "Mood selection",
  },
  {
    number: "02",
    title: "MoodTune understands the vibe",
    description: "Our AI analyzes your mood using valence, energy, tempo, danceability, and lyrical themes. It understands the emotional DNA of music — not just genre tags.",
    visual: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    visualAlt: "AI analysis",
  },
  {
    number: "03",
    title: "We discover matching music",
    description: "We search Spotify's 100M+ catalog using audio features that match your mood profile. Results arrive in under a second with personalized explanations for every track.",
    visual: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    visualAlt: "Spotify search",
  },
  {
    number: "04",
    title: "Your soundtrack comes together",
    description: "Get a curated playlist with explanations for every track. Save to Spotify, share with friends, or play instantly. Your mood, your soundtrack.",
    visual: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    visualAlt: "Playlist generated",
  },
];

export function HowItWorks({ selectedMoodId }: { selectedMoodId?: string | null }) {
  const { mood } = useMoodTheme();

  return (
    <section
      id="how-it-works"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="how-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Step 4 of 4
          </motion.span>
          <h2 id="how-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            From feeling to{" "}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
              soundtrack
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground/80 leading-relaxed">
            Four seamless steps. No complexity, just results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(${mood.accentRgb}, 0.3), transparent)`,
                transformOrigin: "top center",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="space-y-10 lg:space-y-16">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex gap-6 sm:gap-8",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.12 }}
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold lg:absolute lg:left-1/2 lg:-translate-x-1/2",
                    "bg-white/5 backdrop-blur-sm border border-white/10 text-foreground"
                  )}
                  whileHover={{ scale: 1.1, rotate: 6 }}
                >
                  {step.number}
                </motion.div>

                <motion.div
                  className={cn(
                    "flex-1 max-w-md lg:max-w-xs lg:w-1/2",
                    index % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:pl-20"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4 lg:justify-end">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.12 }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl lg:order-2"
                      style={{
                        background: `linear-gradient(135deg, rgba(${mood.accentRgb}, 0.15), rgba(${mood.accentRgb}, 0.05))`,
                        border: `1px solid rgba(${mood.accentRgb}, 0.2)`,
                      }}
                    >
                      {step.visual}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.12 + 0.15 }}
                      className="text-xl sm:text-2xl font-semibold text-foreground"
                    >
                      {step.title}
                    </motion.h3>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
                    className="text-muted-foreground/80 leading-relaxed text-base sm:text-lg"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.12 + 0.3 }}
                  className="absolute lg:static hidden lg:block w-20 h-20 rounded-2xl flex items-center justify-center pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(${mood.accentRgb}, 0.1), transparent)`,
                    border: `1px solid rgba(${mood.accentRgb}, 0.1)`,
                  }}
                >
                  <div className="text-6xl font-bold text-white/5" aria-hidden="true">{index + 1}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}