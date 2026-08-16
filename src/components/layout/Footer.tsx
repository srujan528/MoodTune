"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080811] text-white py-12 border-t border-[#16162A]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400 font-medium">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="MoodTune Home">
          <div className="flex items-end gap-0.5 h-4">
            <span className="w-1 h-2.5 bg-[#1DB954] animate-pulse" />
            <span className="w-1 h-4 bg-[#1ed760] animate-pulse delay-75" />
            <span className="w-1 h-2 bg-[#10B981] animate-pulse delay-150" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">MoodTune</span>
        </Link>

        {/* Center: Copyright */}
        <div className="text-xs font-mono text-slate-500">
          &copy; {currentYear} MoodTune. All rights reserved.
        </div>

        {/* Right Nav Links & Back to Top */}
        <div className="flex items-center gap-6">
          <Link href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="#playlist" className="hover:text-white transition-colors">
            Try demo
          </Link>
          <button
            onClick={scrollToTop}
            className="hover:text-[#1DB954] transition-colors flex items-center gap-1 font-mono text-xs"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}