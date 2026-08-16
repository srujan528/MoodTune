"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    xPercent: 50,
    yPercent: 50,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let ticking = false;
    let lastUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Always update CSS custom properties on documentElement without triggering React re-renders
      document.documentElement.style.setProperty("--mouse-x", `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--mouse-y", `${(e.clientY / window.innerHeight) * 100}%`);

      if (ticking || now - lastUpdate < 30) return;
      ticking = true;
      requestAnimationFrame(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
          xPercent: (e.clientX / window.innerWidth) * 100,
          yPercent: (e.clientY / window.innerHeight) * 100,
        });
        ticking = false;
        lastUpdate = performance.now();
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

export function useMousePositionInElement(ref: React.RefObject<HTMLElement>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    xPercent: 50,
    yPercent: 50,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const element = ref.current;
    if (!element) return;

    let ticking = false;
    let lastUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (ticking || now - lastUpdate < 30) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPosition({
          x,
          y,
          xPercent: rect.width > 0 ? (x / rect.width) * 100 : 50,
          yPercent: rect.height > 0 ? (y / rect.height) * 100 : 50,
        });
        ticking = false;
        lastUpdate = performance.now();
      });
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);

  return position;
}