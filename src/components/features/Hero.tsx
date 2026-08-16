"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const floatingShapes = [
  { x: 10, y: 15, size: 120, color: "rgba(124, 58, 237, 0.15)", delay: 0 },
  { x: 85, y: 20, size: 80, color: "rgba(168, 85, 247, 0.12)", delay: 1 },
  { x: 15, y: 70, size: 100, color: "rgba(236, 72, 153, 0.1)", delay: 2 },
  { x: 75, y: 80, size: 90, color: "rgba(124, 58, 237, 0.15)", delay: 0.5 },
  { x: 45, y: 45, size: 150, color: "rgba(168, 85, 247, 0.08)", delay: 1.5 },
  { x: 30, y: 85, size: 70, color: "rgba(236, 72, 153, 0.1)", delay: 2.5 },
  { x: 90, y: 60, size: 110, color: "rgba(124, 58, 237, 0.1)", delay: 3 },
  { x: 5, y: 50, size: 85, color: "rgba(168, 85, 247, 0.1)", delay: 1.8 },
];

export function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursorPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    element.addEventListener("mousemove", handleMouseMove);
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[90vh] flex items-center justify-center"
      aria-labelledby="hero-heading"
      onMouseMove={(e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" aria-hidden="true" />
      
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute rounded-full blur-[150px] opacity-40"
          style={{
            width: "600px",
            height: "600px",
            left: `${cursorPos.x - 5}%`,
            top: `${cursorPos.y - 5}%`,
            background: `radial-gradient(ellipse at center, rgba(124, 58, 237, 0.4) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.3s ease-out, top 0.3s ease-out",
            pointerEvents: "none",
          }}
        />
        <div
          className="absolute rounded-full blur-[150px] opacity-30"
          style={{
            width: "500px",
            height: "500px",
            left: `${100 - cursorPos.x - 5}%`,
            top: `${100 - cursorPos.y - 5}%`,
            background: `radial-gradient(ellipse at center, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.5s ease-out, top 0.5s ease-out",
            pointerEvents: "none",
          }}
        />
        <div
          className="absolute rounded-full blur-[150px] opacity-25"
          style={{
            width: "400px",
            height: "400px",
            left: "50%",
            top: "50%",
            background: `radial-gradient(ellipse at center, rgba(124, 58, 237, 0.2) 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            animation: "float 8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="absolute inset-0" aria-hidden="true">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px] pointer-events-none"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: shape.color,
            }}
            animate={{
              x: [0, 20, -15, 25, 0],
              y: [0, -20, 25, -15, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-sm font-medium text-primary mb-8"
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </motion.span>
            AI-powered music discovery
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Music that{" "}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
              understands your mood
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            MoodTune combines AI with Spotify&apos;s 100M+ track catalog to recommend songs that match how you feel.
            Every recommendation comes with a personalized explanation of why it fits your mood.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90"
              href="/auth/spotify"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with Spotify
            </MagneticButton>
            <MagneticButton
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              href="/demo"
            >
              Try Demo
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground/70">
              <span>Powered by</span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                Spotify
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-mono text-purple-400">AI</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "100M+", label: "Tracks in catalog" },
              { value: "95%", label: "Match accuracy" },
              { value: "<1s", label: "Avg response time" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  variant?: "default" | "outline";
}

function MagneticButton({ children, className, href, variant = "default" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
  const variants = {
    default: "bg-gradient-to-r from-primary to-violet-600 text-white hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className || ""}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}