"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function AcousticTunerSliders() {
  const [energy, setEnergy] = useState(45);
  const [valence, setValence] = useState(70);
  const [bpm, setBpm] = useState(105);
  const [danceability, setDanceability] = useState(65);

  return (
    <section className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-left space-y-3">
          <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
            ACOUSTIC ENGINE / REALTIME CONTROL
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Fine-Tune Your Vibe
          </h2>
          <p className="text-base text-slate-300 max-w-xl font-normal">
            Adjust acoustic energy, valence, tempo BPM, and rhythm sliders to shape your mix parameters in real-time.
          </p>
        </div>

        {/* Sliders Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Energy Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs text-slate-300">
              <span className="font-bold text-[#1DB954]">ENERGY LEVEL</span>
              <span className="bg-[#052317] text-[#1DB954] px-2 py-0.5 rounded border border-[#10B981]/30 font-bold">
                {energy}% ({energy < 30 ? "Chill / Calm" : energy < 70 ? "Balanced" : "High Electric"})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-2 bg-[#1C1C32] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Acoustic Ambient)</span>
              <span>100% (High Voltage)</span>
            </div>
          </div>

          {/* Valence (Mood) Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs text-slate-300">
              <span className="font-bold text-[#a78bfa]">VALENCE / MOOD</span>
              <span className="bg-purple-950/60 text-[#a78bfa] px-2 py-0.5 rounded border border-purple-500/30 font-bold">
                {valence}% ({valence < 40 ? "Melancholic" : "Euphoric / Happy"})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={valence}
              onChange={(e) => setValence(Number(e.target.value))}
              className="w-full h-2 bg-[#1C1C32] rounded-lg appearance-none cursor-pointer accent-[#a78bfa]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Somber / Tender)</span>
              <span>100% (Bright / Uplifting)</span>
            </div>
          </div>

          {/* BPM Tempo Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs text-slate-300">
              <span className="font-bold text-[#1DB954]">TEMPO (BPM)</span>
              <span className="bg-[#052317] text-[#1DB954] px-2 py-0.5 rounded border border-[#10B981]/30 font-bold">
                {bpm} BPM
              </span>
            </div>
            <input
              type="range"
              min="60"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2 bg-[#1C1C32] rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>60 BPM (Down-tempo)</span>
              <span>180 BPM (Fast Pace)</span>
            </div>
          </div>

          {/* Danceability Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs text-slate-300">
              <span className="font-bold text-[#34D399]">DANCEABILITY</span>
              <span className="bg-emerald-950/60 text-[#34D399] px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                {danceability}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={danceability}
              onChange={(e) => setDanceability(Number(e.target.value))}
              className="w-full h-2 bg-[#1C1C32] rounded-lg appearance-none cursor-pointer accent-[#34D399]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Freeform)</span>
              <span>100% (Strong Beat)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
