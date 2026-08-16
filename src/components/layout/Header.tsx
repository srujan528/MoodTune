"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ParticlePortalModal } from "@/components/ui/ParticlePortalModal";

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
  const [showPortal, setShowPortal] = useState(false);
  const [portalTarget, setPortalTarget] = useState("/auth/spotify");

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

  const handleConnectSpotify = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setPortalTarget(url);
    setShowPortal(true);
  };

  return (
    <>
      <ParticlePortalModal
        isOpen={showPortal}
        targetUrl={portalTarget}
        title="CONNECTING TO SPOTIFY"
      />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-[#080811]/95 backdrop-blur-md border-b border-[#16162A]"
            : "bg-[#080811] border-b border-[#16162A]/50"
        }`}
        aria-label="Main navigation"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Left: Logo with Equalizer */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5" aria-label="MoodTune Home">
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 h-2.5 bg-[#1DB954] animate-pulse" />
                <span className="w-1 h-4 bg-[#1ed760] animate-pulse delay-75" />
                <span className="w-1 h-2 bg-[#10B981] animate-pulse delay-150" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MoodTune</span>
            </Link>

            <div className="hidden md:flex md:items-center md:gap-6 text-sm font-medium text-slate-400">
              <Link href="#how-it-works" className="hover:text-white transition-colors">
                How it works
              </Link>
              <Link href="/demo" className="hover:text-white transition-colors">
                Try demo
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.spotify_avatar_url ? (
                  <img
                    src={user.spotify_avatar_url}
                    alt=""
                    className="w-7 h-7 rounded-full border border-[#1DB954]"
                  />
                ) : null}
                <span className="text-sm font-semibold text-[#1DB954] hidden sm:block">
                  {user.spotify_display_name || user.full_name || "User"}
                </span>
                <Link href="/logout" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Sign out
                </Link>
              </div>
            ) : (
              <>
                <button
                  onClick={(e) => handleConnectSpotify(e, "/login")}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#121222] hover:bg-[#1A1A32] border border-[#232342] text-slate-200 transition-colors"
                >
                  Sign in with Google
                </button>
                <Link
                  href="#mood-discovery"
                  className="px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_20px_rgba(29,185,84,0.4)]"
                >
                  <span>Find my vibe</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}