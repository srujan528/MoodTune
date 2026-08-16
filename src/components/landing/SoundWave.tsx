"use client";

import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useMousePosition, useReducedMotion, useIsMobile } from "@/hooks";
import { useMemo } from "react";

interface SoundWaveProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function SoundWaveLoading() {
  const initialHeights = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      return 8 + Math.abs(Math.sin(i * 0.4)) * 50;
    });
  }, []);

  return (
    <div
      className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-end gap-1 h-24 w-80 pointer-events-none"
      style={{ opacity: 0.25 }}
      aria-hidden="true"
    >
      {Array.from({ length: 40 }, (_, i) => {
        return (
          <div
            key={i}
            className="w-1 rounded-t bg-gradient-to-t from-primary/50 to-primary/10"
            style={{ height: `${8 + Math.abs(Math.sin(i * 0.4)) * 50}px` }}
          />
        );
      })}
    </div>
  );
}

export function SoundWaveClient({ mouseX, mouseY }: SoundWaveProps) {
  const initialHeights = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      return 8 + Math.abs(Math.sin(i * 0.4)) * 50;
    });
  }, []);

  const animateHeights = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const baseHeight = 8 + Math.abs(Math.sin(i * 0.4)) * 50;
      const targetHeight = 8 + Math.abs(Math.cos(i * 0.4)) * 50;
      return [baseHeight, 8 + Math.abs(Math.cos(i * 0.4)) * 50];
    });
  }, []);

  return (
    <motion.div
      className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-end gap-1 h-24 w-80 pointer-events-none"
      animate={{ opacity: [0.25, 0.5, 0.35, 0.55, 0.25] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-t bg-gradient-to-t from-primary/50 to-primary/10"
          style={{
            left: `${(i / 40) * 100}%`,
            height: `${8 + Math.abs(Math.sin(i * 0.4)) * 50}px`,
          }}
          animate={{
            height: [
              `${8 + Math.abs(Math.sin(i * 0.4)) * 50}px`,
              `${8 + Math.abs(Math.cos(i * 0.4)) * 50}px`,
            ],
          }}
          transition={{
            duration: 1.8 + i * 0.03,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.015,
          }}
        >
          <div
            className="w-1 rounded-t bg-gradient-to-t from-primary/50 to-primary/10"
            style={{
              height: `${8 + Math.abs(Math.sin(i * 0.4)) * 50}px`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}