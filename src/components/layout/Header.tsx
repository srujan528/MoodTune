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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            ? "bg-[#07080E]/95 backdrop-blur-md border-b border-[#141522]"
            : "bg-[#07080E] border-b border-[#141522]/50"
        }`}
        aria-label="Main navigation"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3.5 sm:px-6 sm:py-4 lg:px-8">
          {/* Left: Logo with Equalizer */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/" className="flex items-center gap-2" aria-label="MoodTune Home">
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 h-2.5 bg-[#1DB954] animate-pulse" />
                <span className="w-1 h-4 bg-[#1ed760] animate-pulse delay-75" />
                <span className="w-1 h-2 bg-[#10B981] animate-pulse delay-150" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">MoodTune</span>
            </Link>

            <div className="hidden md:flex md:items-center md:gap-6 text-xs font-medium text-slate-300">
              <Link href="#how-it-works" className="hover:text-white transition-colors">
                How it works
              </Link>
              <Link href="/demo" className="hover:text-white transition-colors">
                Try demo
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {user.spotify_avatar_url ? (
                  <img
                    src={user.spotify_avatar_url}
                    alt=""
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#1DB954]"
                  />
                ) : null}
                <span className="text-xs font-semibold text-[#1DB954] max-w-[90px] sm:max-w-[140px] truncate">
                  {user.spotify_display_name || user.full_name || "User"}
                </span>
                <a
                  href="/logout"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/logout";
                  }}
                  className="text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Sign out
                </a>
              </div>
            ) : (
              <>
                <button
                  onClick={(e) => handleConnectSpotify(e, "/login")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 sm:border-transparent sm:bg-transparent sm:hover:bg-transparent"
                >
                  <span className="text-slate-400 font-mono">→]</span>
                  <span>Sign In</span>
                </button>
                <Link
                  href="#mood-discovery"
                  className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#c2f0c2] hover:bg-[#a3e635] text-black text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 sm:gap-1.5 shadow-[0_0_20px_rgba(194,240,194,0.4)]"
                >
                  <span className="hidden xs:inline">FIND MY VIBE</span>
                  <span className="xs:hidden">VIBE</span>
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-md bg-white/5"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B0C16] border-b border-[#141522] px-4 pt-2 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-white py-1"
            >
              How it works
            </Link>
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-white py-1"
            >
              Try demo
            </Link>
            {user ? (
              <a
                href="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  window.location.href = "/logout";
                }}
                className="w-full text-left flex items-center justify-between text-sm font-semibold text-red-400 py-2 border-t border-white/10 mt-2 cursor-pointer"
              >
                <span>Sign Out ({user.spotify_display_name || user.full_name || "User"})</span>
                <span className="font-mono">↳</span>
              </a>
            ) : (
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleConnectSpotify(e, "/login");
                }}
                className="w-full text-left flex items-center gap-2 text-sm font-semibold text-[#1DB954] py-1.5 border-t border-white/10 mt-2"
              >
                <span>→] Sign In / Register</span>
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
}