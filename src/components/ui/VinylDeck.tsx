"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VINYL_TRACKS = [
  {
    id: "late-night-drive",
    mood: "Late-Night Drive",
    emoji: "🌙",
    track: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    bpm: 171,
    valence: "48%",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/91/92/7d/91927d6d-2d4e-1288-66a9-83c9d7d42cf8/20UMGIM07412.rgb.jpg/600x600bb.jpg",
    accent: "#EAB308",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    note: "Driving synthwave bassline engineered for 2 AM highway solitude.",
  },
  {
    id: "need-pick-me-up",
    mood: "Need a Pick-Me-Up",
    emoji: "☀️",
    track: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    bpm: 174,
    valence: "88%",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/21/ee/b2/2ceeb2a4-db01-923f-e14f-6f9160ebce0f/886449976735.jpg/600x600bb.jpg",
    accent: "#F97316",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    note: "Bright indie-pop chimes designed to lift your energy instantly.",
  },
  {
    id: "something-mellow",
    mood: "Something Mellow",
    emoji: "🌿",
    track: "Chamber of Reflection",
    artist: "Mac DeMarco",
    album: "Salad Days",
    bpm: 114,
    valence: "62%",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg",
    accent: "#10B981",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    note: "Analog tape warmth with gentle lo-fi synth reverberations.",
  },
  {
    id: "locked-in",
    mood: "Locked In",
    emoji: "🔒",
    track: "Awake",
    artist: "Tycho",
    album: "Awake",
    bpm: 105,
    valence: "74%",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/7e/cb/3f/7ecb3f46-0b1a-2895-177b-6c4ed4750bb8/800448021824.jpg/600x600bb.jpg",
    accent: "#8B5CF6",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    note: "Rhythmic organic guitars & ambient pads for deep cognitive focus.",
  },
];

export function VinylDeck() {
  const [selectedTrack, setSelectedTrack] = useState(VINYL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handlePlayToggle = (item = selectedTrack) => {
    if (isPlaying && selectedTrack.id === item.id && audioObj) {
      audioObj.pause();
      setIsPlaying(false);
    } else {
      if (audioObj) audioObj.pause();
      const newAudio = new Audio(item.audioUrl);
      newAudio.volume = 0.5;
      newAudio.play().catch(() => {});
      setAudioObj(newAudio);
      setSelectedTrack(item);
      setIsPlaying(true);
      newAudio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 font-sans">
      {/* Track Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {VINYL_TRACKS.map((item) => {
          const active = selectedTrack.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTrack(item);
                if (isPlaying) handlePlayToggle(item);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                active
                  ? "bg-[#25221E] text-[#EAB308] border-[#EAB308] shadow-[0_4px_20px_rgba(234,179,8,0.15)]"
                  : "bg-[#161412] text-[#A39E93] border-[#2A2622] hover:border-[#423C36] hover:text-[#F3EFE6]"
              }`}
            >
              <span className="mr-2">{item.emoji}</span>
              <span>{item.mood}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analog Vinyl Player Deck */}
      <div className="relative bg-[#141210] border border-[#2E2924] rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle Paper Texture Line Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Physical Turntable Platter & Vinyl Disc */}
          <div className="md:col-span-6 flex justify-center items-center relative">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#0A0908] border-4 border-[#221F1B] flex items-center justify-center shadow-2xl">
              {/* Vinyl Grooves */}
              <div className="absolute inset-2 rounded-full border border-[#1A1815]" />
              <div className="absolute inset-6 rounded-full border border-[#1A1815]" />
              <div className="absolute inset-10 rounded-full border border-[#1E1B18]" />
              <div className="absolute inset-14 rounded-full border border-[#1E1B18]" />

              {/* Spinning Record Disc */}
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-full h-full rounded-full flex items-center justify-center relative p-3"
              >
                {/* Center Record Label */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#EAB308]/40 relative shadow-inner">
                  <img
                    src={selectedTrack.cover}
                    alt={selectedTrack.track}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#0A0908] border border-[#EAB308]" />
                  </div>
                </div>
              </motion.div>

              {/* Turntable Tonearm */}
              <motion.div
                animate={{ rotate: isPlaying ? 22 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 w-28 h-28 pointer-events-none origin-top-right z-20"
              >
                <div className="w-3 h-3 rounded-full bg-[#A39E93] border border-[#2A2622] absolute right-0 top-0" />
                <div className="w-1.5 h-24 bg-[#423C36] absolute right-1 top-1 rotate-[45deg] origin-top" />
                <div className="w-3 h-5 bg-[#EAB308] absolute left-4 bottom-2 rounded-sm rotate-[45deg]" />
              </motion.div>
            </div>
          </div>

          {/* Right: Album Sleeve & Track Metadata */}
          <div className="md:col-span-6 space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-[#2E2924] pb-3">
              <span className="text-[11px] font-mono text-[#EAB308] tracking-wider uppercase">
                SIDE A • STEREO HI-FI
              </span>
              <span className="text-[11px] font-mono text-[#A39E93]">
                {selectedTrack.bpm} BPM • {selectedTrack.valence} VALENCE
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-[#F3EFE6] tracking-tight">
                {selectedTrack.track}
              </h3>
              <p className="text-sm font-sans text-[#A39E93] mt-1">
                {selectedTrack.artist} — <span className="italic">{selectedTrack.album}</span>
              </p>
            </div>

            {/* Liner Note Quote Box */}
            <div className="p-4 rounded-xl bg-[#1A1714] border border-[#2E2924] text-xs font-mono text-[#C4BFB5] leading-relaxed">
              <span className="text-[#EAB308] font-bold block mb-1">LINER NOTES:</span>
              &ldquo;{selectedTrack.note}&rdquo;
            </div>

            {/* Physical Cue/Play Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => handlePlayToggle()}
                className="px-6 py-3 rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-[#0A0908] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(234,179,8,0.25)] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {isPlaying ? (
                    <>
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </>
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
                <span>{isPlaying ? "CUE PAUSE" : "PLAY CUE PREVIEW"}</span>
              </button>

              <span className="text-xs font-mono text-[#A39E93]">
                {isPlaying ? "RECORD SPINNING..." : "TURNTABLE READY"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
