"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMousePosition, useReducedMotion, useIsMobile } from "@/hooks";
import { useMoodTheme } from "@/hooks";
import { cn } from "@/lib/utils/helpers";
import { useMemo, useEffect, useRef, useState } from "react";

// Deterministic pseudo-random generator for consistent server/client rendering
function seededRandom(seed: number) {
  // Simple LCG (Linear Congruential Generator)
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateCTAParticles(count: number, moodRgb: string) {
  const baseSeed = 12345; // Fixed seed for deterministic generation
  return Array.from({ length: count }, (_, i) => {
    const seed = baseSeed + i * 7;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    const r5 = seededRandom(seed + 4);
    const r6 = seededRandom(seed + 5);
    return {
      id: i,
      x: r1 * 100,
      y: r2 * 100,
      size: r3 * 2 + 0.5,
      baseOpacity: r4 * 0.3 + 0.05,
      speedX: (r5 - 0.5) * 0.12,
      speedY: (r6 - 0.5) * 0.12,
      color: r1 > 0.5 ? `rgba(${moodRgb},` : "rgba(255, 255, 255,",
    };
  });
}

export function FinalCTA({ selectedMoodId }: { selectedMoodId: string | null }) {
  const { mood } = useMoodTheme();
  const mouse = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mouseX = useMotionValue<number>(50);
  const mouseY = useMotionValue<number>(50);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    mouseX.set(mouse.xPercent);
    mouseY.set(mouse.yPercent);
  }, [mouse.xPercent, mouse.yPercent, prefersReducedMotion, isMobile]);

  // @ts-ignore - useTransform returns string MotionValue for percentage values
  const glowX = useTransform(mouseX, [0, 100], ["-20%", "120%"]);
  // @ts-ignore
  const glowY = useTransform(mouseY, [0, 100], ["-20%", "120%"]);

  const ctaParticles = useMemo(() => generateCTAParticles(20, mood.accentRgb), [mood.accentRgb]);

  return (
    <section
      id="final-cta"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 60%, #1e1b4b 100%)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background: `rgba(${mood.accentRgb}, 0.1)`,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background: `rgba(${mood.accentRgb}, 0.12)`,
            opacity: 0,
          }}
          animate={{
            // @ts-ignore - MotionValue<string> from useTransform
            x: glowX as any,
            // @ts-ignore
            y: glowY as any,
            opacity: [0, 0.3, 0.15, 0.3, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(167,139,250,0.06)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.01]" />
      </div>

      {mounted && !prefersReducedMotion && !isMobile && (
        <CTAParticles particles={ctaParticles} />
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
          >
            Find something that
            <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">
              fits the moment
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Pick a vibe and let MoodTune take it from there.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticLink
              href="/auth/spotify"
              className={cn(
                "relative inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-medium transition-all duration-300",
                "bg-gradient-to-r from-primary to-violet-600 text-white",
                "shadow-[0_8px_32px_rgba(167,139,250,0.35)]",
                "hover:shadow-[0_12px_40px_rgba(167,139,250,0.45)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              )}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Find my vibe
            </MagneticLink>
            <MagneticLink
              href="/demo"
              variant="outline"
              className={cn(
                "relative inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-medium transition-all duration-300",
                "border-white/30 text-white hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              )}
            >
              Try demo
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground/60"
          >
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              Free to start
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              Private by default
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Spotify</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTAParticles({ particles }: { particles: ReturnType<typeof generateCTAParticles> }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <CTAParticle key={p.id} particle={p} />
      ))}
    </div>
  );
}

function CTAParticle({ particle }: { particle: ReturnType<typeof generateCTAParticles>[0] }) {
  // Pre-compute a few drift waypoints instead of running a JS rAF loop per particle
  const driftRange = 30 + particle.id * 2;
  const xWaypoints = [
    particle.x,
    Math.min(100, particle.x + driftRange * particle.speedX * 80),
    Math.max(0, particle.x - driftRange * particle.speedX * 40),
    Math.min(100, particle.x + driftRange * particle.speedX * 60),
    particle.x,
  ];
  const yWaypoints = [
    particle.y,
    Math.min(100, particle.y + driftRange * particle.speedY * 80),
    Math.max(0, particle.y - driftRange * particle.speedY * 40),
    Math.min(100, particle.y + driftRange * particle.speedY * 60),
    particle.y,
  ];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${particle.size * 4}px`,
        height: `${particle.size * 4}px`,
      }}
      animate={{
        left: xWaypoints.map((v) => `${v}%`),
        top: yWaypoints.map((v) => `${v}%`),
        scale: [1, 1.2, 0.85, 1.15, 1],
        opacity: [particle.baseOpacity, particle.baseOpacity * 1.3, particle.baseOpacity * 0.6, particle.baseOpacity * 1.2, particle.baseOpacity],
      }}
      transition={{
        duration: 18 + particle.id * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 rounded-full blur-[1.5px]"
        style={{ background: `${particle.color}${particle.baseOpacity})` }}
      />
    </motion.div>
  );
}

interface MagneticLinkProps {
  href: string;
  className?: string;
  variant?: "default" | "outline";
  children: React.ReactNode;
}

function MagneticLink({ href, className, variant = "default", children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}