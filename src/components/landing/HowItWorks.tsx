"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Select your emotional state",
    description: "Pick from 10 curated mood states — from Late-Night Drive to Slow Sunday. No complex forms or quizzes.",
  },
  {
    number: "02",
    title: "Acoustic valence & tempo match",
    description: "Our recommendation engine translates your mood into acoustic metrics — valence, energy dynamics, tempo, and instrumental density.",
  },
  {
    number: "03",
    title: "Instant Spotify catalog resolution",
    description: "We query 100M+ tracks and resolve official high-resolution album artwork and exact audio previews in under a second.",
  },
  {
    number: "04",
    title: "Stream & save your soundtrack",
    description: "Play 30-second previews directly or connect Spotify to stream full songs and save your mood playlist straight to your library.",
  },
];

export function HowItWorks({ selectedMoodId }: { selectedMoodId?: string | null }) {
  return (
    <section
      id="how-it-works"
      className="relative py-24 bg-[#0D0C0A] border-b border-[#2A2622]"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-[#EAB308] uppercase tracking-widest bg-[#1A1714] px-4 py-1.5 rounded-full border border-[#332E28] mb-4">
            CURATION PROCESS
          </span>
          <h2 id="how-heading" className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#F3EFE6] leading-[1.1] mb-6">
            From state of mind to{" "}
            <span className="italic font-normal text-[#EAB308] underline decoration-[#EAB308]/40 underline-offset-8">
              soundtrack
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#A39E93] leading-relaxed font-sans">
            Four intentional steps designed for effortless listening.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#141210] border border-[#2E2924] flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-xs font-mono text-[#EAB308] tracking-widest uppercase block mb-3">
                  STEP {step.number}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F3EFE6] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#A39E93] leading-relaxed font-sans">
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