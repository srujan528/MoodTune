"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const DEMO_VIBES = [
  {
    id: "late-night-drive",
    label: "Late-night drive",
    icon: "🌙",
    color: "#818cf8",
    track: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    bpm: "171 BPM",
    energy: "High Energy",
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5a86d7",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    explanation: "Atmospheric synthwave baseline with driving rhythm for midnight cruising.",
  },
  {
    id: "something-mellow",
    label: "Something mellow",
    icon: "🌿",
    color: "#34d399",
    track: "Chamber of Reflection",
    artist: "Mac DeMarco",
    album: "Salad Days",
    bpm: "114 BPM",
    energy: "Chill Vibes",
    cover: "https://i.scdn.co/image/ab67616d0000b27341cfd744f6f8902506e300ce",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    explanation: "Laid-back lo-fi keys with gentle, soothing reverb dynamics.",
  },
  {
    id: "need-pick-me-up",
    label: "Need a pick-me-up",
    icon: "☀️",
    color: "#f97316",
    track: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    bpm: "174 BPM",
    energy: "Uplifting",
    cover: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    explanation: "Bright indie-pop synth melodies that elevate your mood instantly.",
  },
  {
    id: "locked-in",
    label: "Locked in",
    icon: "🔒",
    color: "#a78bfa",
    track: "Awake",
    artist: "Tycho",
    album: "Awake",
    bpm: "105 BPM",
    energy: "Deep Focus",
    cover: "https://i.scdn.co/image/ab67616d0000b2731215d862f928e469c47e8346",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    explanation: "Minimal vocal texture with organic ambient rhythms for sustained flow.",
  },
];

export function InteractiveVibeDemo() {
  const [selectedVibe, setSelectedVibe] = useState(DEMO_VIBES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handlePlayToggle = (vibe = selectedVibe) => {
    if (isPlaying && selectedVibe.id === vibe.id && audioObj) {
      audioObj.pause();
      setIsPlaying(false);
    } else {
      if (audioObj) audioObj.pause();
      const newAudio = new Audio(vibe.previewUrl);
      newAudio.volume = 0.6;
      newAudio.play().catch(() => {});
      setAudioObj(newAudio);
      setSelectedVibe(vibe);
      setIsPlaying(true);

      newAudio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* Vibe Selection Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {DEMO_VIBES.map((vibe) => {
          const active = selectedVibe.id === vibe.id;
          return (
            <motion.button
              key={vibe.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedVibe(vibe);
                if (isPlaying) handlePlayToggle(vibe);
              }}
              style={{
                borderColor: active ? vibe.color : "rgba(255, 255, 255, 0.15)",
                backgroundColor: active ? `${vibe.color}25` : "rgba(255, 255, 255, 0.03)",
                boxShadow: active ? `0 0 20px ${vibe.color}40` : undefined,
              }}
              className="px-5 py-2.5 rounded-full border text-sm font-semibold text-white flex items-center gap-2 backdrop-blur-md transition-all"
            >
              <span>{vibe.icon}</span>
              <span>{vibe.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Live Interactive Player Card */}
      <SpotlightCard className="bg-slate-950/80 border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVibe.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Left: Album Artwork */}
            <div className="md:col-span-4 relative group rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl">
              <img
                src={selectedVibe.cover}
                alt={selectedVibe.track}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePlayToggle()}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 text-white flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    {isPlaying ? (
                      <>
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </>
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Right: Track Details & AI Insights */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${selectedVibe.color}20`,
                    color: selectedVibe.color,
                    border: `1px solid ${selectedVibe.color}40`,
                  }}
                >
                  {selectedVibe.energy} • {selectedVibe.bpm}
                </span>
                <span className="text-xs font-mono text-muted-foreground">AI MATCH 98%</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedVibe.track}</h3>
                <p className="text-base text-muted-foreground font-medium">{selectedVibe.artist} — {selectedVibe.album}</p>
              </div>

              {/* Animated Equalizer Wave */}
              <div className="flex items-end gap-1 h-8 py-1">
                {Array.from({ length: 28 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{ backgroundColor: selectedVibe.color }}
                    animate={
                      isPlaying
                        ? { height: ["20%", "100%", "30%", "85%", "20%"] }
                        : { height: "20%" }
                    }
                    transition={{
                      duration: 0.8 + (i % 5) * 0.2,
                      repeat: isPlaying ? Infinity : 0,
                      repeatType: "mirror",
                    }}
                  />
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-white block mb-1">✨ AI Recommendation Reason:</span>
                {selectedVibe.explanation}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </SpotlightCard>
    </div>
  );
}
