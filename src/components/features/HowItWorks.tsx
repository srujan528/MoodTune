"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Choose Your Mood",
    description: "Pick from 10 curated moods like Happy, Heartbroken, Late Night, or Focus. Or describe your feeling in your own words for nuanced recommendations.",
    icon: (
      <motion.svg
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </motion.svg>
    ),
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI analyzes your mood using valence, energy, tempo, and lyrical themes. It understands the emotional DNA of music.",
    icon: (
      <motion.svg
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </motion.svg>
    ),
  },
  {
    number: "03",
    title: "Spotify Recommendation",
    description: "We search Spotify's 100M+ catalog using audio features that match your mood. Results arrive in under a second.",
    icon: (
      <motion.svg
        className="h-7 w-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </motion.svg>
    ),
  },
  {
    number: "04",
    title: "Playlist Generated",
    description: "Get a curated playlist with explanations for every track. Save, share, or play instantly in Spotify.",
    icon: (
      <motion.svg
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </motion.svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative" aria-labelledby="how-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 id="how-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How MoodTune Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From mood to music in four seamless steps. No complexity, just results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent -translate-x-1/2" aria-hidden="true" />
          
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex gap-8",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 text-primary text-2xl font-bold lg:absolute lg:left-1/2 lg:-translate-x-1/2",
                    index % 2 === 0 ? "lg:-translate-y-1/2" : "lg:-translate-y-1/2"
                  )}
                  whileHover={{ scale: 1.1, rotate: 5 }}
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
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.2 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 lg:order-2"
                    >
                      {step.icon}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="text-xl font-semibold text-foreground"
                    >
                      {step.title}
                    </motion.h3>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}