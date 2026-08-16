"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface MoodOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
  gradient: string;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "happy",
    label: "Happy",
    description: "Upbeat, feel-good vibes",
    iconName: "happy",
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    color: "text-yellow-400",
  },
  {
    id: "relaxed",
    label: "Relaxed",
    description: "Chill, laid-back atmosphere",
    iconName: "relaxed",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    color: "text-emerald-400",
  },
  {
    id: "heartbroken",
    label: "Heartbroken",
    description: "Emotional, healing tracks",
    iconName: "heartbroken",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
    color: "text-rose-400",
  },
  {
    id: "rainy",
    label: "Rainy Day",
    description: "Cozy, atmospheric sounds",
    iconName: "rainy",
    gradient: "from-blue-400 via-blue-600 to-indigo-700",
    color: "text-blue-400",
  },
  {
    id: "late-night",
    label: "Late Night",
    description: "Intimate, midnight vibes",
    iconName: "late-night",
    gradient: "from-indigo-500 via-purple-600 to-purple-800",
    color: "text-indigo-400",
  },
  {
    id: "workout",
    label: "Workout",
    description: "High-energy, pump-you-up",
    iconName: "workout",
    gradient: "from-red-400 via-red-600 to-red-800",
    color: "text-red-400",
  },
  {
    id: "party",
    label: "Party",
    description: "Dance, celebrate, repeat",
    iconName: "party",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    color: "text-pink-400",
  },
  {
    id: "angry",
    label: "Angry",
    description: "Heavy, intense release",
    iconName: "angry",
    gradient: "from-orange-500 via-red-600 to-red-900",
    color: "text-orange-400",
  },
  {
    id: "sleep",
    label: "Sleep",
    description: "Gentle, dreamy lullabies",
    iconName: "sleep",
    gradient: "from-slate-400 via-slate-600 to-slate-800",
    color: "text-slate-400",
  },
  {
    id: "focus",
    label: "Focus",
    description: "Deep work, concentration",
    iconName: "focus",
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    color: "text-violet-400",
  },
];

function MoodIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    happy: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    relaxed: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    heartbroken: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
    ),
    rainy: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
    ),
    "late-night": (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    ),
    workout: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    party: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
    angry: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    ),
    sleep: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    ),
    focus: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
    ),
  };

  return icons[name] || icons.happy;
}

interface MoodCardProps {
  mood: MoodOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function MoodCard({ mood, isSelected, onSelect }: MoodCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });
  const scaleSpring = useSpring(isHovered ? 1.04 : 1, { stiffness: 400, damping: 30 });
  const glowOpacity = useSpring(isHovered || isSelected ? 1 : 0, { stiffness: 300, damping: 30 });
  const borderGlow = useSpring(isSelected ? 1 : isHovered ? 0.6 : 0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const y = ((e.clientY - rect.top) / rect.height) * 200 - 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const gradientColors = mood.gradient.split(" ").filter(Boolean);
  const gradient = `linear-gradient(135deg, ${gradientColors.join(", ")})`;

  return (
    <motion.button
      ref={ref}
      onClick={() => onSelect(mood.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative group p-6 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        isSelected
          ? "border-primary/50 bg-primary/10 shadow-[0_0_40px_rgba(124,58,237,0.2)]"
          : "border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
      )}
      aria-pressed={isSelected}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scaleSpring,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: gradient,
          filter: "blur(20px)",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: borderGlow,
          boxShadow: `inset 0 0 60px ${mood.gradient.split(" ")[1] || mood.gradient}`,
        }}
      />

      <div className="relative z-10">
        <motion.div
          className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          animate={{ scale: isSelected ? 1.1 : isHovered ? 1.08 : 1, rotate: isSelected ? [0, 5, -5, 0] : 0 }}
          transition={{ duration: 0.8, repeat: isSelected ? Infinity : 0 }}
          whileHover={{ scale: 1.12, rotate: [0, 3, -3, 0] }}
        >
          <div className="absolute inset-0 rounded-xl opacity-20 blur-sm" style={{ background: gradient }} />
          <div className="relative z-10 text-3xl sm:text-4xl" aria-hidden="true">
            <MoodIcon name={mood.iconName} />
          </div>
          {isSelected && (
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        <motion.h3
          className="font-semibold text-foreground mb-1"
          animate={{ color: isSelected ? "var(--primary)" : "inherit" }}
        >
          {mood.label}
        </motion.h3>
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: isSelected ? 0.9 : 0.7 }}
        >
          {mood.description}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.8 }}
        style={{ background: gradient }}
      >
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </motion.div>
    </motion.button>
  );
}

interface MoodSelectorProps {
  onSelect: (moodId: string) => void;
  selectedMood?: string;
}

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="mood-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 id="mood-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How are you feeling?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a mood or describe it in your own words. Our AI understands nuance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          role="group"
          aria-label="Select your mood"
        >
          {MOOD_OPTIONS.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <MoodCard
                mood={mood}
                isSelected={selectedMood === mood.id}
                onSelect={onSelect}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}