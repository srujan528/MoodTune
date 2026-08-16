"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MoodSelector } from "@/components/landing";
import { RecommendationDisplay } from "@/components/dashboard/RecommendationDisplay";
import { PlaylistDisplay } from "@/components/dashboard/PlaylistDisplay";
import { MoodHistory } from "@/components/dashboard/MoodHistory";
import { SavedTracks } from "@/components/dashboard/SavedTracks";
import { NowPlayingBar } from "@/components/dashboard/NowPlayingBar";
import { PlayerProvider, usePlayer } from "@/components/player/PlayerContext";
import { getMoodConfig, MOOD_IDS } from "@/config/mood-config";

export default function DashboardPage() {
  const router = useRouter();
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [moodSessionLoading, setMoodSessionLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const createMoodSession = useCallback(async (moodId: string) => {
    setMoodSessionLoading(moodId);
    try {
      const res = await fetch("/api/mood-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moodId }),
      });
      if (!res.ok) {
        const error = await res.json();
        console.error("Failed to create mood session:", error);
      }
    } catch (error) {
      console.error("Error creating mood session:", error);
    } finally {
      setMoodSessionLoading(null);
    }
  }, []);

  const handleMoodSelect = (moodId: string) => {
    if (selectedMoodId !== moodId) {
      setSelectedMoodId(moodId);
      createMoodSession(moodId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.spotify_display_name || user?.full_name || "there"}!
            </h1>
            <p className="text-muted-foreground mt-1">What are you in the mood for?</p>
          </div>

          <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} moodSessionLoading={moodSessionLoading} />

          {selectedMoodId && (
            <div className="mt-8 space-y-8">
              <RecommendationDisplay moodId={selectedMoodId} />
              <PlaylistDisplay moodId={selectedMoodId} />
            </div>
          )}

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <MoodHistory onRevisitMood={handleMoodSelect} />
            <SavedTracks />
          </div>
        </div>

        <NowPlayingBar />
      </div>
    </PlayerProvider>
  );
}