"use client";

import { motion } from "framer-motion";
import React from "react";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Base dark canvas */}
      <div className="absolute inset-0 bg-[#07080E]" />

      {/* Blob 1: Vibrant Violet */}
      <motion.div
        className="absolute -top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-30"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, #4c1d95 70%, transparent 100%)" }}
        animate={{
          scale: [1, 1.2, 1.05, 1.15, 1],
          x: [0, 80, -40, 60, 0],
          y: [0, 50, 100, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blob 2: Vibrant Emerald */}
      <motion.div
        className="absolute top-[20%] right-[5%] w-[550px] h-[550px] rounded-full blur-[150px] opacity-25"
        style={{ background: "radial-gradient(circle, #10b981 0%, #064e3b 70%, transparent 100%)" }}
        animate={{
          scale: [1.1, 0.95, 1.15, 1],
          x: [0, -70, 50, -30, 0],
          y: [0, 90, -40, 60, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Blob 3: Neon Rose / Pink */}
      <motion.div
        className="absolute top-[50%] left-[30%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-20"
        style={{ background: "radial-gradient(circle, #ec4899 0%, #831843 70%, transparent 100%)" }}
        animate={{
          scale: [0.9, 1.2, 1, 1.1, 0.9],
          x: [0, 60, -80, 40, 0],
          y: [0, -60, 40, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle Noise / Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(167,139,250,0.04)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015]" />
    </div>
  );
}
