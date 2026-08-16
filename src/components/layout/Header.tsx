"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/helpers";
import { MOOD_CONFIGS } from "@/config/mood-config";

interface HeaderProps {
  user?: {
    spotify_display_name?: string | null;
    full_name?: string | null;
    spotify_avatar_url?: string | null;
  } | null;
}

export function Header({ user: userProp }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(userProp || null);

  useEffect(() => {
    if (userProp !== undefined) {
      setUser(userProp);
      return;
    }
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        // Not logged in
      }
    }
    fetchUser();
  }, [userProp]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use a vibrant mood color for the CTA
  const ctaColor = MOOD_CONFIGS["late-night-drive"].accentColor;
  const ctaRgb = MOOD_CONFIGS["late-night-drive"].accentRgb;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-slate-950/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent"
      )}
      aria-label="Main navigation"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="MoodTune Home">
            <svg
              className="h-7 w-7 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
            <span className="text-lg font-bold text-foreground">MoodTune</span>
          </Link>

          <div className="hidden md:flex md:gap-5">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground hover:text-primary">
              How it works
            </Link>
            <Link href="/demo" className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground hover:text-primary">
              Try demo
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2.5">
              {user.spotify_avatar_url ? (
                <img
                  src={user.spotify_avatar_url}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              ) : null}
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {user.spotify_display_name || user.full_name || "User"}
              </span>
              <a
                href="/auth/spotify"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1DB954] hover:bg-[#1ed760] text-black transition-colors shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Connect Spotify
              </a>
              <Link href="/logout" className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground">
                Sign out
              </Link>
            </div>
          ) : (
            <>
              <a
                href="/auth/spotify"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1DB954] hover:bg-[#1ed760] text-black transition-colors shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Connect Spotify
              </a>
              <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground/70 transition-colors hover:text-foreground">
                Sign in
              </Link>
              <Link
                href="/auth/spotify"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                  "text-white",
                  "shadow-[0_2px_12px_rgba(167,139,250,0.25)]",
                  "hover:shadow-[0_4px_20px_rgba(167,139,250,0.35)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                )}
                style={{ background: `linear-gradient(135deg, ${ctaColor}, ${MOOD_CONFIGS["in-my-feelings"].accentColor})` }}
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.931.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Find my vibe
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}