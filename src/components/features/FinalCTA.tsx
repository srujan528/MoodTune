"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function FinalCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const newParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "rgba(124, 58, 237," : "rgba(168, 85, 247,",
    }));
    setParticles(newParticles);

    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setParticles((prev) =>
        prev.map((p) => {
          const newX = p.x + p.vx;
          const newY = p.y + p.vy;
          const bouncedX = newX <= 0 || newX >= canvas.offsetWidth ? -p.vx : p.vx;
          const bouncedY = newY <= 0 || newY >= canvas.offsetHeight ? -p.vy : p.vy;
          return {
            ...p,
            x: Math.max(0, Math.min(canvas.offsetWidth, newX)),
            y: Math.max(0, Math.min(canvas.offsetHeight, newY)),
            vx: bouncedX,
            vy: bouncedY,
          };
        })
      );
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [particles]);

  const ctaButtonStyles = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-violet-500/10 to-pink-500/5" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[200px] -translate-x-1/2 -translate-y-1/2" style={{ animation: "float 8s ease-in-out infinite" }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium text-primary mb-8"
          >
            <motion.span
              className="relative flex h-2 w-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </motion.span>
            Ready to find your soundtrack?
          </motion.div>

          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Music that <span className="bg-gradient-to-r from-primary via-violet-500 to-pink-500 bg-clip-text text-transparent">understands you</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Join thousands discovering music that matches their mood. AI-powered, privacy-first, and free to start.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="/auth/spotify"
              className={`w-full sm:w-auto gap-2 ${ctaButtonStyles} bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/25`}
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with Spotify
            </motion.a>
            <motion.a
              href="/demo"
              className={`w-full sm:w-auto ${ctaButtonStyles} border-white/30 text-white hover:bg-white/10`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Interactive Demo
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground/70"
          >
            <span>Trusted by music lovers</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9/5</span>
              <span className="w-px h-4 bg-white/20 mx-2" />
              <span>10K+ users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}