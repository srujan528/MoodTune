"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMousePosition, useReducedMotion, useIsMobile } from "@/hooks";
import { useMoodTheme } from "@/hooks";
import { useEffect } from "react";
import { cn } from "@/lib/utils/helpers";

export function MusicVisualizer({ className }: { className?: string }) {
  const { mood } = useMoodTheme();
  const mouse = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const mouseX = useMotionValue<number>(50);
  const mouseY = useMotionValue<number>(50);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    mouseX.set(mouse.xPercent);
    mouseY.set(mouse.yPercent);
  }, [mouse.xPercent, mouse.yPercent, prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) return null;

  const freqBars = 32;

  return (
    <div
      className={cn("fixed inset-0 -z-10 pointer-events-none", className)}
      aria-hidden="true"
      style={{ opacity: 0.3 }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] flex items-end justify-center gap-[0.4%] px-4 pointer-events-none">
        {Array.from({ length: freqBars }, (_, i) => (
          <FrequencyBar
            key={i}
            index={i}
            mood={mood}
            // @ts-ignore - MotionValue<number> passed as unknown
            mouseX={mouseX}
            // @ts-ignore
            mouseY={mouseY}
            delay={i * 0.015}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-[30vh] flex items-start justify-center gap-[0.4%] px-4 pointer-events-none">
        {Array.from({ length: freqBars }, (_, i) => (
          <FrequencyBar
            key={`top-${i}`}
            index={i}
            mood={mood}
            // @ts-ignore - MotionValue<number> passed as unknown
            mouseX={mouseX}
            // @ts-ignore
            mouseY={mouseY}
            delay={i * 0.015 + 0.3}
            inverted
          />
        ))}
      </div>

      <FlowingLine mood={mood} 
            // @ts-ignore - MotionValue<number> passed as unknown
            mouseX={mouseX} 
            // @ts-ignore
            mouseY={mouseY} />
    </div>
  );
}

function FrequencyBar({
  index,
  mood,
  delay,
  inverted = false,
}: {
  index: number;
  mood: { accentColor: string; accentRgb: string; particleSpeed: number };
  mouseX?: any;
  mouseY?: any;
  delay: number;
  inverted?: boolean;
}) {
  const baseHeight = 12 + Math.sin(index * 0.25) * 35;
  const targetHeight = baseHeight + 25 + Math.cos(index * 0.4) * 20;

  return (
    <motion.div
      className="relative flex-1 max-w-[3%] min-w-[2px] pointer-events-none"
      style={{
        transformOrigin: inverted ? "top center" : "bottom center",
      }}
      animate={{
        scaleY: [0.3, 1, 0.4, 0.9, 0.3],
        opacity: [0.2, 0.45, 0.25, 0.4, 0.2],
      }}
      transition={{
        duration: 2 + (index % 5) * 0.3,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      initial={false}
    >
      <div
        className="absolute inset-0 rounded-t pointer-events-none"
        style={{
          background: `linear-gradient(${inverted ? "to bottom" : "to top"}, rgba(${mood.accentRgb}, 0.5), rgba(${mood.accentRgb}, 0.08))`,
          filter: `drop-shadow(0 0 4px ${mood.accentColor})`,
          transformOrigin: inverted ? "top center" : "bottom center",
          height: `${targetHeight}px`,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full pointer-events-none"
        style={{
          background: `rgba(${mood.accentRgb}, 0.7)`,
          filter: `blur(1px) drop-shadow(0 0 3px ${mood.accentColor})`,
          transformOrigin: "center center",
        }}
        animate={{
          scaleX: [0.4, 1, 0.4],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.8 + index * 0.015,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

function FlowingLine({
  mood,
  mouseX,
  mouseY,
}: {
  mood: { accentColor: string; accentRgb: string; particleSpeed: number };
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
}) {
  const points = 18;
  const amplitude = 30;
  const frequency = 0.018;
  const speed = 0.25 * mood.particleSpeed;

  const svgPath = useMotionValue<string>("");
  const pathOpacity = useMotionValue<number>(0.12);

  useEffect(() => {
    let frame: number;
    let phase = 0;
    const animate = () => {
      phase += speed * 0.01;
      let path = `M 0 ${50 + Math.sin(phase) * 15}`;
      for (let i = 1; i <= points; i++) {
        const x = (i / points) * 100;
        const y = 50 + Math.sin(x * frequency + phase) * amplitude + Math.sin(x * 0.008 + phase * 0.5) * 12;
        path += ` Q ${x - 100 / points / 2} ${y} ${x} ${y + Math.sin(phase + x * 0.04) * 8}`;
      }
      svgPath.set(path);
      pathOpacity.set(0.08 + Math.sin(phase * 0.4) * 0.04);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [svgPath, pathOpacity, mood.particleSpeed]);

  // @ts-ignore - useTransform returns string MotionValue for percentage values
  const mouseInfluenceX = useTransform(mouseX, [0, 100], [-10, 10]);
  // @ts-ignore
  const mouseInfluenceY = useTransform(mouseY, [0, 100], [-6, 6]);

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
      }}
      // @ts-ignore - MotionValue<number> in animate prop
      animate={{
        // @ts-ignore - MotionValue<string> from useTransform
        x: mouseInfluenceX,
        // @ts-ignore
        y: mouseInfluenceY,
      }}
    >
      <motion.path
        fill="none"
        stroke={`rgba(${mood.accentRgb}, 0.2)`}
        strokeWidth="1"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${mood.accentColor})` }}
        animate={{ d: svgPath as any, opacity: pathOpacity as any }}
      />
    </motion.svg>
  );
}