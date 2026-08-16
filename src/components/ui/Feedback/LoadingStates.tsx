"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <motion.div
      className={cn(sizes[size], "border-2 border-primary/20 border-t-primary rounded-full", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      aria-label="Loading"
    />
  );
}

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
}

export function LoadingSkeleton({ className, variant = "text", width, height }: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-white/10 rounded";

  const variants = {
    text: "h-4",
    circular: "rounded-full",
    rectangular: "",
  };

  return (
    <motion.div
      className={cn(
        baseClasses,
        variants[variant],
        width ? `w-${width}` : "w-full",
        height ? `h-${height}` : undefined,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("rounded-2xl bg-white/5 border border-white/10 p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <LoadingSkeleton variant="text" width="1/3" className="w-1/3" />
        <LoadingSkeleton variant="text" width="1/2" className="w-1/2" />
        <LoadingSkeleton variant="rectangular" height="32" className="h-8" />
        <LoadingSkeleton variant="rectangular" height="32" className="h-8" />
      </div>
    </motion.div>
  );
}

export function LoadingGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <motion.div
      className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="aspect-square rounded-xl bg-white/5 border border-white/10 animate-pulse"
        />
      ))}
    </motion.div>
  );
}

export function LoadingList({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <motion.div
      className={cn("space-y-3", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10" />
          <div className="flex-1">
            <LoadingSkeleton variant="text" width="3/4" className="w-3/4" />
            <LoadingSkeleton variant="text" width="1/2" className="w-1/2 mt-1" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}