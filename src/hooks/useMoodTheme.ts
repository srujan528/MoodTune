"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { MoodConfig, getMoodConfig } from "@/config/mood-config";

export function useMoodTheme(initialMoodId: string = "default"): {
  mood: MoodConfig;
  selectedMoodId: string;
  setMood: (id: string) => void;
  isTransitioning: boolean;
} {
  const [selectedMoodId, setSelectedMoodId] = useState<string>(initialMoodId);
  const [mood, setMood] = useState<MoodConfig>(() => getMoodConfig(initialMoodId));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setMoodById = useCallback((id: string) => {
    if (id === selectedMoodId) return;
    
    setIsTransitioning(true);
    setSelectedMoodId(id);
    
    requestAnimationFrame(() => {
      const moodConfig = getMoodConfig(id);
      setMood(moodConfig);
      setTimeout(() => setIsTransitioning(false), 600);
    });
  }, [selectedMoodId]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mood-accent", mood.accentColor);
    root.style.setProperty("--mood-accent-rgb", mood.accentRgb);
    root.style.setProperty("--mood-glow", mood.glowColor);
    root.style.setProperty("--mood-particle-color", mood.particleColor);
    root.style.setProperty("--mood-particle-speed", `${mood.particleSpeed}s`);
    root.style.setProperty("--mood-blur", `${mood.blurIntensity}px`);
    root.style.setProperty("--mood-animation-speed", `${mood.animationSpeed}s`);
    root.style.setProperty("--mood-gradient-angle", `${mood.gradientAngle}deg`);
    root.style.setProperty("--mood-glow-intensity", `${mood.glowIntensity}`);
    root.style.setProperty("--mood-bg-from", mood.backgroundFrom);
    root.style.setProperty("--mood-bg-via", mood.backgroundVia);
    root.style.setProperty("--mood-bg-to", mood.backgroundTo);
  }, [mood]);

  return { mood, selectedMoodId, setMood: setMoodById, isTransitioning };
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

function subscribeIsMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getIsMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribeIsMobile, getIsMobileSnapshot, () => false);
}