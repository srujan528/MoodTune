"use client";

import { cn } from "@/lib/utils/helpers";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 250,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#a78bfa",
  colorTo = "#34d399",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}

if (typeof window !== "undefined") {
  const styleId = "border-beam-keyframes";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes border-beam {
        100% {
          offset-distance: 100%;
        }
      }
      .animate-border-beam {
        animation: border-beam calc(var(--duration) * 1s) infinite linear;
      }
    `;
    document.head.appendChild(style);
  }
}
