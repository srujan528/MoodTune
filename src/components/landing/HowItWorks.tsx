"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Pick your mood",
    desc: "Tell MoodTune what you're feeling right now. From mellow to high-energy.",
  },
  {
    step: "02",
    title: "We build your mix",
    desc: "Our acoustic engine compiles a custom track list tailored to your exact emotional frequency.",
  },
  {
    step: "03",
    title: "Press play",
    desc: "Stream 30-second previews instantly or connect Spotify to save the full playlist.",
  },
];

export function HowItWorks({ selectedMoodId }: { selectedMoodId?: string | null }) {
  return (
    <section
      id="how-it-works"
      className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left space-y-3"
        >
          <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
            03 / THE SIMPLE PART
          </div>
          <h2 id="how-it-works-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Less searching. More finding.
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[#0E0E1B] border border-[#1C1C32] text-left space-y-4 hover:border-[#1DB954]/50 transition-colors"
            >
              <div className="text-sm font-mono font-bold text-[#1DB954]">
                {item.step}
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}