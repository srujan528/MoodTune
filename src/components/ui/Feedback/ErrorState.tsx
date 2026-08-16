"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/helpers";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
  retryLabel = "Try again",
  className,
  icon,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-2xl",
        "bg-red-500/10 border border-red-500/20",
        className
      )}
      role="alert"
    >
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 mx-auto">
        {icon || (
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h3>
      <p className="text-muted-foreground/80 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-medium transition-colors hover:bg-red-500/30"
        >
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center text-center p-12 rounded-2xl", className)}
    >
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
        {icon || (
          <svg className="w-10 h-10 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground/80 mb-6 max-w-md text-center">{description}</p>
      )}
      {action && (
        <motion.button
          onClick={action.onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-violet-600 text-white font-medium transition-all hover:shadow-[0_8px_24px_rgba(167,139,250,0.4)]"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}

export function NotFoundState({ className }: { className?: string }) {
  return (
    <EmptyState
      title="Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      action={{
        label: "Go Home",
        onClick: () => window.location.href = "/",
      }}
      className={className}
    />
  );
}

export function OfflineState({ className, onRetry }: { className?: string; onRetry?: () => void }) {
  return (
    <ErrorState
      message="You appear to be offline. Please check your internet connection and try again."
      onRetry={onRetry}
      retryLabel="Try Again"
      className={className}
    />
  );
}