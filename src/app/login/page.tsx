"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { ParticlePortalModal } from "@/components/ui/ParticlePortalModal";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setShowPortal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleSpotifyLogin = () => {
    setShowPortal(true);
  };

  return (
    <>
      <ParticlePortalModal
        isOpen={showPortal}
        targetUrl="/api/auth/spotify"
        title="SYNCHRONIZING MOODTUNE PORTAL"
      />

      <div className="min-h-screen flex items-center justify-center bg-[#080811] px-4 text-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="MoodTune Home">
              <div className="flex items-end gap-0.5 h-6">
                <span className="w-1.5 h-3 bg-[#1DB954] animate-pulse" />
                <span className="w-1.5 h-5 bg-[#1ed760] animate-pulse delay-75" />
                <span className="w-1.5 h-2.5 bg-[#10B981] animate-pulse delay-150" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">MoodTune</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-white">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              {isSignUp
                ? "Start discovering music that matches your mood"
                : "Sign in to continue to your dashboard"}
            </p>
          </div>

          <div className="bg-[#0E0E1B] border border-[#1C1C32] rounded-3xl p-6 sm:p-8 shadow-2xl">
            {error && (
              <div
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                disabled={loading}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={isSignUp ? "new-password" : "current-password"}
                disabled={loading}
              />

              <Button type="submit" className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold" size="lg" isLoading={loading}>
                {isSignUp ? "Create account" : "Sign in"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#1C1C32]" />
              </div>
              <div className="relative flex justify-center text-xs font-mono uppercase tracking-widest">
                <span className="bg-[#0E0E1B] px-3 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full gap-3 border-[#232342] text-white hover:bg-[#16162E]"
              size="lg"
              onClick={handleSpotifyLogin}
              disabled={loading}
            >
              <svg className="h-5 w-5 fill-[#1DB954]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Connect Spotify
            </Button>

            <p className="text-center text-sm text-slate-400 mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-[#1DB954] hover:underline font-semibold"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080811] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DB954]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}