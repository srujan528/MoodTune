"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParticlePortalModalProps {
  isOpen: boolean;
  onComplete?: () => void;
  targetUrl?: string;
  title?: string;
}

export function ParticlePortalModal({
  isOpen,
  onComplete,
  targetUrl = "/auth/spotify",
  title = "CONNECTING TO SPOTIFY",
}: ParticlePortalModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stepText, setStepText] = useState("[01/03] INITIALIZING ACOUSTIC NEURAL ENGINE...");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Phase Timeline Text Updates & Percent Counter
    const timer1 = setTimeout(() => setStepText("[01/03] SYNCHRONIZING SPOTIFY LIBRARY & ARTIST SEEDS..."), 600);
    const timer2 = setTimeout(() => setStepText("[02/03] TUNING 2D ACOUSTIC VALENCE & ENERGY SPECTRUM..."), 1500);
    const timer3 = setTimeout(() => setStepText("[03/03] VIBE MATCHED! ENTERING MOODTUNE..."), 2600);

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const redirectTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else if (targetUrl) {
        window.location.href = targetUrl;
      }
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [isOpen, onComplete, targetUrl]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = 600;
    const particles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 40 + Math.random() * 220;
      return {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        z: Math.random() * 1000,
        radius: radius,
        angle: angle,
        speed: 0.02 + Math.random() * 0.03,
        size: 1 + Math.random() * 2.5,
        color: i % 5 === 0 ? "#ffffff" : i % 3 === 0 ? "#1ed760" : "#1DB954",
      };
    });

    let time = 0;
    let exploding = false;

    const explodeTimer = setTimeout(() => {
      exploding = true;
    }, 2800);

    const render = () => {
      time += 0.04;
      ctx.fillStyle = "rgba(8, 8, 17, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p, idx) => {
        if (!exploding) {
          // Spinning 3D Portal Vortex Ring
          p.angle += p.speed;
          const currentR = p.radius + Math.sin(time * 3 + idx) * 15;
          p.x = centerX + Math.cos(p.angle) * currentR;
          p.y = centerY + Math.sin(p.angle) * currentR;
        } else {
          // Hyper-speed particle explosion outwards towards camera
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          p.x += dx * 0.15;
          p.y += dy * 0.15;
          p.size *= 1.05;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = exploding ? 25 : 12;
        ctx.globalAlpha = exploding ? 0.9 : 0.75;
        ctx.fill();
        ctx.restore();
      });

      // Connect Center Ring Light Rays
      if (!exploding) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 12) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.strokeStyle = "rgba(29, 185, 84, 0.15)";
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(explodeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#080811] flex flex-col items-center justify-center overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

        {/* Central Glowing Audio Orb & Progress Text */}
        <div className="relative z-10 text-center space-y-6 max-w-lg px-4 pointer-events-none">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#1DB954]/20 border-2 border-[#1DB954] flex items-center justify-center shadow-[0_0_50px_rgba(29,185,84,0.6)] animate-pulse">
            <div className="flex items-end gap-1.5 h-8">
              <span className="w-1.5 h-6 bg-[#1DB954] animate-pulse" />
              <span className="w-1.5 h-8 bg-[#1ed760] animate-pulse delay-75" />
              <span className="w-1.5 h-4 bg-[#10B981] animate-pulse delay-150" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#1DB954] uppercase bg-[#052317] px-4 py-1.5 rounded-full border border-[#10B981]/30">
              <span>{title}</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight font-sans">
              Syncing Soundscape...
            </h2>

            <p className="text-xs font-mono text-slate-300 transition-all duration-300 min-h-[20px]">
              {stepText}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#16162E] h-2 rounded-full overflow-hidden border border-[#232342] max-w-xs mx-auto">
            <motion.div
              className="bg-[#1DB954] h-full shadow-[0_0_15px_rgba(29,185,84,0.8)]"
              style={{ width: `${percent}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
