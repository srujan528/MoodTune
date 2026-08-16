"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { usePlayer } from "@/components/player/PlayerContext";

// Sample tracks mapped across the 2D Valence vs Energy spectrum
const SPECTRUM_TRACKS = [
  {
    id: "levitating",
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    valence: 90, // High Valence
    energy: 88,  // High Energy
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    quadrant: "High Energy • Euphoric",
    color: "#EC4899",
  },
  {
    id: "blinding-lights",
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    valence: 45, // Low-Mid Valence
    energy: 92,  // High Energy
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/91/92/7d/91927d6d-2d4e-1288-66a9-83c9d7d42cf8/20UMGIM07412.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    quadrant: "High Energy • Intense Drive",
    color: "#818CF8",
  },
  {
    id: "texas-sun",
    name: "Texas Sun",
    artist: "Khruangbin & Leon Bridges",
    album: "Texas Sun",
    valence: 82, // High Valence
    energy: 35,  // Low Energy
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    quadrant: "Low Energy • Cozy Warmth",
    color: "#F59E0B",
  },
  {
    id: "chamber-of-reflection",
    name: "Chamber of Reflection",
    artist: "Mac DeMarco",
    album: "Salad Days",
    valence: 32, // Low Valence
    energy: 40,  // Low Energy
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    quadrant: "Low Energy • Melancholic Solitude",
    color: "#10B981",
  },
];

export function AcousticMorphingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ xPercent: 50, yPercent: 50 });
  const [activeTrack, setActiveTrack] = useState(SPECTRUM_TRACKS[0]);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handleDrag = (_: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let x = info.point.x - rect.left;
    let y = info.point.y - rect.top;

    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((1 - y / rect.height) * 100);

    setPosition((prev) => {
      if (prev.xPercent === xPercent && prev.yPercent === yPercent) return prev;
      return { xPercent, yPercent };
    });

    let closest = SPECTRUM_TRACKS[0];
    let minDistance = Infinity;

    SPECTRUM_TRACKS.forEach((track) => {
      const dx = track.valence - xPercent;
      const dy = track.energy - yPercent;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < minDistance) {
        minDistance = distance;
        closest = track;
      }
    });

    setActiveTrack((prev) => (prev.id === closest.id ? prev : closest));
  };

  const handlePlayActive = () => {
    playTrack({
      id: activeTrack.id,
      name: activeTrack.name,
      artist: activeTrack.artist,
      album: activeTrack.album,
      albumImageUrl: activeTrack.cover,
      previewUrl: activeTrack.previewUrl,
    });
  };

  return (
    <div id="vibe-canvas" className="w-full max-w-5xl mx-auto my-12 font-sans">
      <div className="text-left mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#10B981] uppercase bg-[#052317] px-3.5 py-1 rounded-full border border-[#10B981]/30">
          <span>DYNAMIC 2D ACOUSTIC RADAR</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Drag the Puck to Morph Your Soundscape
        </h3>
        <p className="text-sm text-slate-400 max-w-xl">
          Move the glowing crosshair across the 2D spectrum to tune acoustic valence and energy dynamics in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 2D Drag Canvas */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            className="relative w-full aspect-square max-w-md mx-auto bg-[#0A0A14] border-2 border-[#1E1E38] rounded-3xl overflow-hidden shadow-2xl p-6 select-none"
          >
            {/* Grid Crosshair Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-px bg-slate-400" />
              <div className="h-full w-px bg-slate-400 absolute" />
            </div>

            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none">
              INTENSE DRIVE
            </div>
            <div className="absolute top-4 right-4 text-[10px] font-mono text-[#EC4899] uppercase tracking-widest pointer-events-none">
              PURE EUPHORIA
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[#10B981] uppercase tracking-widest pointer-events-none">
              MELANCHOLIC SOLITUDE
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest pointer-events-none">
              COZY WARMTH
            </div>

            {/* Draggable Puck / Orb */}
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
              style={{
                left: `${position.xPercent}%`,
                top: `${100 - position.yPercent}%`,
              }}
              className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center z-20"
            >
              <div
                className="w-full h-full rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                style={{
                  backgroundColor: activeTrack.color,
                  boxShadow: `0 0 30px ${activeTrack.color}`,
                }}
              >
                <div className="w-3 h-3 rounded-full bg-white animate-ping opacity-75" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Dynamic Matched Track Card & Audio Controls */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Live Coordinates Display */}
          <div className="p-4 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] flex items-center justify-between font-mono text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block">VALENCE (X)</span>
              <span className="text-white font-bold text-sm">{position.xPercent}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">ENERGY (Y)</span>
              <span className="text-white font-bold text-sm">{position.yPercent}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">ZONE</span>
              <span className="text-[#10B981] font-bold text-xs">{activeTrack.quadrant}</span>
            </div>
          </div>

          {/* Matched Track Card */}
          <div className="p-6 rounded-3xl bg-[#0E0E1B] border-2 border-[#26264A] space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4">
              <img
                src={activeTrack.cover}
                alt={activeTrack.name}
                className="w-20 h-20 rounded-2xl object-cover border border-[#26264A] shadow-md"
              />
              <div className="flex-1 min-w-0">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold text-white bg-white/10 mb-1 inline-block">
                  ACOUSTIC MATCH 99%
                </span>
                <h4 className="text-xl font-bold text-white truncate">{activeTrack.name}</h4>
                <p className="text-sm text-slate-400 truncate">{activeTrack.artist} — {activeTrack.album}</p>
              </div>
            </div>

            {/* Equalizer animation */}
            <div className="flex items-end gap-1 h-6 py-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{ backgroundColor: activeTrack.color }}
                  animate={{
                    height: ["20%", "100%", "30%", "80%", "20%"],
                  }}
                  transition={{
                    duration: 0.8 + (i % 4) * 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              ))}
            </div>

            {/* Play Button */}
            <button
              onClick={handlePlayActive}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              style={{
                backgroundColor: activeTrack.color,
                boxShadow: `0 0 25px ${activeTrack.color}60`,
              }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>PLAY MATCHED TRACK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
