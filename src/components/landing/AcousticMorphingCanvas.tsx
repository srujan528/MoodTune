"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { usePlayer } from "@/components/player/PlayerContext";
import { ParticlePortalModal } from "@/components/ui/ParticlePortalModal";

const SPECTRUM_TRACKS = [
  {
    id: "levitating",
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    valence: 90,
    energy: 88,
    cover: "https://i.scdn.co/image/ab67616d0000b2732049e6f332968396d2e3a1f8",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    quadrant: "High Energy • Euphoric",
    color: "#1DB954",
  },
  {
    id: "blinding-lights",
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    valence: 45,
    energy: 92,
    cover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5a8636",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    quadrant: "High Energy • Intense Drive",
    color: "#10B981",
  },
  {
    id: "texas-sun",
    name: "Texas Sun",
    artist: "Khruangbin & Leon Bridges",
    album: "Texas Sun",
    valence: 82,
    energy: 35,
    cover: "https://i.scdn.co/image/ab67616d0000b273aa55d14fa0c5f21d374465d6",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    quadrant: "Low Energy • Cozy Warmth",
    color: "#F59E0B",
  },
  {
    id: "chamber-of-reflection",
    name: "Chamber of Reflection",
    artist: "Mac DeMarco",
    album: "Salad Days",
    valence: 32,
    energy: 40,
    cover: "https://i.scdn.co/image/ab67616d0000b2738f657a79e43f114c0a5e81d7",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    quadrant: "Low Energy • Melancholic Solitude",
    color: "#3B82F6",
  },
];

export function AcousticMorphingCanvas({ user }: { user?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ xPercent: 50, yPercent: 50 });
  const [activeTrack, setActiveTrack] = useState(SPECTRUM_TRACKS[0]);
  const [imgSrc, setImgSrc] = useState(activeTrack.cover);
  const [showPortal, setShowPortal] = useState(false);
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayer();

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

    if (activeTrack.id !== closest.id) {
      setActiveTrack(closest);
      setImgSrc(closest.cover);
    }
  };

  const isCurrentPlaying = currentTrack?.name === activeTrack.name && isPlaying;

  const handlePlayActive = () => {
    if (!user) {
      setShowPortal(true);
      return;
    }
    if (isCurrentPlaying) {
      pauseTrack();
    } else {
      playTrack({
        id: activeTrack.name,
        name: activeTrack.name,
        artist: activeTrack.artist,
        album: activeTrack.album,
        albumImageUrl: activeTrack.cover,
      });
    }
  };

  return (
    <>
      <ParticlePortalModal
        isOpen={showPortal}
        targetUrl="/login"
        title="CONNECTING TO SPOTIFY"
      />

      <div id="vibe-canvas" className="w-full max-w-5xl mx-auto my-12 font-sans px-4">
        <div className="text-left mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#1DB954] uppercase bg-[#052317] px-3.5 py-1 rounded-full border border-[#10B981]/30">
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
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#1DB954] uppercase tracking-widest pointer-events-none">
                PURE EUPHORIA
              </div>
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[#3B82F6] uppercase tracking-widest pointer-events-none">
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
                <span className="text-[#1DB954] font-bold text-xs">{activeTrack.quadrant}</span>
              </div>
            </div>

            {/* Matched Track Card */}
            <div className="p-6 rounded-3xl bg-[#0E0E1B] border-2 border-[#26264A] space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4">
                <img
                  src={imgSrc}
                  alt={activeTrack.name}
                  onError={() =>
                    setImgSrc(
                      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                    )
                  }
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
                className="w-full py-3.5 rounded-xl text-black font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                style={{
                  backgroundColor: activeTrack.color,
                  boxShadow: `0 0 25px ${activeTrack.color}60`,
                }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  {isCurrentPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
                <span>{isCurrentPlaying ? "PAUSE MATCHED TRACK" : "PLAY MATCHED TRACK"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
