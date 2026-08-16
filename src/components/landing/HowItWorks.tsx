"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Tell us how you feel",
    description: "Pick from 10 curated moods — Happy, Heartbroken, Late Night, Focus, and more. Or describe your feeling in your own words for nuanced recommendations.",
  },
  {
    number: "02",
    title: "MoodTune understands the vibe",
    description: "Our AI analyzes your mood using valence, energy, tempo, danceability, and lyrical themes. It understands the emotional DNA of music — not just genre tags.",
  },
  {
    number: "03",
    title: "We discover matching music",
    description: "We search Spotify's 100M+ catalog using audio features that match your mood profile. Results arrive in under a second with personalized explanations for every track.",
  },
  {
    number: "04",
    title: "Your soundtrack comes together",
    description: "Get a curated playlist with explanations for every track. Save to Spotify, share with friends, or play instantly. Your mood, your soundtrack.",
  },
];

export function HowItWorks({ selectedMoodId }: { selectedMoodId?: string | null }) {
  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3"
        >
          <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
            03 / HOW IT WORKS
          </div>
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            From feeling to soundtrack.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            Four seamless steps. No complexity, just results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-xs font-mono text-[#6E36E4] font-bold tracking-widest uppercase block mb-3">
                  STEP {step.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}