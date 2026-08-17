"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Clear cookies via server logout route and hard reload
    async function doLogout() {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (e) {
        console.error("Logout error:", e);
      } finally {
        window.location.href = "/";
      }
    }
    doLogout();
  }, []);

  return (
    <div className="min-h-screen bg-[#080811] flex flex-col items-center justify-center text-white space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DB954]" />
      <p className="text-xs font-mono text-slate-400">Signing out of MoodTune...</p>
    </div>
  );
}
