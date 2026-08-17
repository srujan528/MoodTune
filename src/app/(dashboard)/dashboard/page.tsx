"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Hero,
  MoodSelector,
  PlaylistPreview,
  HowItWorks,
  FinalCTA,
} from "@/components/landing";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NowPlayingBar } from "@/components/dashboard/NowPlayingBar";
import { PlayerProvider } from "@/components/player/PlayerContext";

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
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

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
      <div className="min-h-screen bg-[#080811] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1DB954]" />
      </div>
    );
  }

  return (
    <PlayerProvider>
      <div className="bg-[#07080E] text-foreground min-h-screen selection:bg-[#1DB954]/30 selection:text-[#1DB954] overflow-x-hidden pb-24">
        <CustomCursor />
        <Hero user={user} />
        <div id="mood-selector">
          <MoodSelector
            onMoodSelect={handleMoodSelect}
            selectedMoodId={selectedMoodId}
            moodSessionLoading={moodSessionLoading}
          />
        </div>
        <PlaylistPreview selectedMoodId={selectedMoodId} user={user} />
        <HowItWorks selectedMoodId={selectedMoodId} />
        <FinalCTA selectedMoodId={selectedMoodId} user={user} />
        <NowPlayingBar />
      </div>
    </PlayerProvider>
  );
}