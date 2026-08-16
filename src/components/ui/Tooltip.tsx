"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delay?: number;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const sideStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  const alignStyles = {
    start: side === "top" || side === "bottom" ? "left-0 -translate-x-0" : "top-0 -translate-y-0",
    center: side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2",
    end: side === "top" || side === "bottom" ? "right-0 translate-x-0" : "bottom-0 translate-y-0",
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm font-medium text-popover-foreground bg-popover rounded-md shadow-lg border animate-fade-in",
            sideStyles[side],
            alignStyles[align]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}