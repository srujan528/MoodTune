"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePlayer } from "@/components/player/PlayerContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  speed: number;
}

export function AcousticParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPlaying } = usePlayer();
  const [preset, setPreset] = useState<"vortex" | "beam" | "wave" | "solar">("vortex");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Particle Swarm Generator
    const count = 350;
    const particles: Particle[] = [];
    const colors = ["#1DB954", "#1ed760", "#10B981", "#34D399", "#F59E0B"];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 60 + Math.random() * 120;
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        baseX: width / 2 + Math.cos(angle) * radius,
        baseY: height / 2 + Math.sin(angle) * radius,
        size: Math.random() * 2.5 + 1,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.7 + 0.3,
        angle: angle,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.fillStyle = "rgba(8, 8, 17, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p, index) => {
        p.angle += p.speed * (isPlaying ? 2.5 : 1);

        if (preset === "vortex") {
          // Dynamic Swarm Vortex Around Center/Mouse
          const targetX = mouse.x + Math.cos(p.angle + index) * 90;
          const targetY = mouse.y + Math.sin(p.angle + index) * 90;
          p.x += (targetX - p.x) * 0.05;
          p.y += (targetY - p.y) * 0.05;
        } else if (preset === "beam") {
          // Volumetric Light Beam (Like Lamp Light from particles.casberry.in)
          const coneWidth = (p.y / height) * 140 + 20;
          const targetX = centerX + Math.sin(p.y * 0.03 + time) * coneWidth;
          p.y += (p.vy + 1.5) * (isPlaying ? 1.8 : 1);
          if (p.y > height) p.y = 20;
          p.x += (targetX - p.x) * 0.04;
        } else if (preset === "wave") {
          // Acoustic Soundwave Ripples
          p.x += Math.cos(p.angle) * 1.2;
          p.y = centerY + Math.sin(p.x * 0.02 + time * 2) * (isPlaying ? 60 : 35);
          if (p.x > width) p.x = 0;
        } else {
          // Solar Magnetic Field Rings
          const ringR = 120 + Math.sin(time + index * 0.1) * 30;
          p.x = centerX + Math.cos(p.angle) * ringR;
          p.y = centerY + Math.sin(p.angle) * ringR;
        }

        // Draw Glowing Particle Mote
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isPlaying ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      });

      // Connect Nearest Neighbors with Light Filament Lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i += 6) {
        for (let j = i + 1; j < particles.length; j += 12) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(29, 185, 84, ${0.25 - dist / 260})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvas) canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isPlaying, preset]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 font-sans px-4 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="text-left space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#1DB954] uppercase bg-[#052317] px-3.5 py-1 rounded-full border border-[#10B981]/30">
            <span>3D ACOUSTIC PARTICLE SIMULATOR</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Interactive Particle Swarm</h3>
        </div>

        {/* Preset Switcher Bar */}
        <div className="flex items-center gap-2 bg-[#0E0E1B] p-1.5 rounded-2xl border border-[#1C1C32]">
          {(["vortex", "beam", "wave", "solar"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPreset(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                preset === mode
                  ? "bg-[#1DB954] text-black font-bold shadow-[0_0_15px_rgba(29,185,84,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Container */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#1E1E38] bg-[#080811] shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-[420px] block cursor-crosshair" />
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
          MOVE CURSOR TO ATTRACT SWARM • CLICK PRESETS TO MORPH SIMULATION
        </div>
      </div>
    </div>
  );
}
