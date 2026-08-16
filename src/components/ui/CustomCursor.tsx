"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-violet-400/40 bg-violet-500/10 backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(167, 139, 250, 0.4), inset 0 0 10px rgba(167, 139, 250, 0.3)"
            : "0 0 10px 2px rgba(167, 139, 250, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-violet-300 shadow-[0_0_8px_#a78bfa] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
