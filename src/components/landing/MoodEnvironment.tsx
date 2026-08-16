"use client";

import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useMoodTheme, useReducedMotion, useIsMobile } from "@/hooks";
import { MoodConfig } from "@/config/mood-config";
import { useMemo, useEffect } from "react";

export function MoodEnvironment() {
  const { mood, isTransitioning } = useMoodTheme();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const progress = useMotionValue<number>(isTransitioning ? 0 : 1);
  const springProgress = useSpring(progress, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.set(1);
      return;
    }
    progress.set(0);
    animate(progress, 1, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
  }, [mood.id, prefersReducedMotion]);

  return (
    <>
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            `linear-gradient(135deg, #0f172a, #1e1b4b, #1e1b4b)`,
            `linear-gradient(135deg, ${mood.backgroundFrom}, ${mood.backgroundVia}, ${mood.backgroundTo})`,
          ],
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[250px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: mood.glowColor, opacity: 0 }}
          animate={{
            opacity: [0, mood.glowIntensity * 0.4],
            scale: [0.5, 1],
          }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[250px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: `rgba(${mood.accentRgb}, 0.15)`, opacity: 0 }}
          animate={{
            opacity: [0, mood.glowIntensity * 0.3],
            scale: [0.5, 1],
          }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div
        className="fixed inset-0 -z-10 bg-[url('/grid.svg')] opacity-[0.015] pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}