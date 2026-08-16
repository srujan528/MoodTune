"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button, LinkButton } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/helpers";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

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

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSpotifyLogin = () => {
    window.location.href = "/api/auth/spotify";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="MoodTune Home">
            <svg
              className="h-10 w-10 text-primary"
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
            <span className="text-2xl font-bold text-foreground">MoodTune</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp
              ? "Start discovering music that matches your mood"
              : "Sign in to continue to your dashboard"}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          {error && (
            <div
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
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

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              {isSignUp ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-3"
            size="lg"
            onClick={handleSpotifyLogin}
            disabled={loading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.084 3.163 9.426 7.548 10.93.55.1-.747-.292-.747-.644 0-.317.013-1.155.013-2.234-3.073.667-3.724-1.319-3.724-1.319-.504-1.281-1.233-1.623-1.233-1.623-1.007-.689.076-.675.076-.675 1.114.07 1.699 1.144 1.699 1.144.988 1.691 2.592 1.203 3.225.919.1-.714.388-1.203.706-1.479-2.465-.279-5.054-1.231-5.054-5.479 0-1.21.433-2.196 1.145-2.961-.115-.279-.496-1.4.11-2.914 0 0 .935-.295 3.064 1.143.887-.248 1.836-.372 2.79-.372.954 0 1.903.124 2.79.372 2.13-1.438 3.064-1.143 3.064-1.143.606 1.514.225 2.635.11 2.914.712.765 1.145 1.751 1.145 2.961 0 4.256-2.594 5.199-5.062 5.471.398.342.75 1.02.75 2.056 0 1.485-.013 2.68-.013 3.043 0 .354.196.764.752.643C20.837 21.426 24 17.083 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Spotify
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}