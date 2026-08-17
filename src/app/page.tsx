"use client";

import { useState, useEffect } from "react";
import {
  Hero,
  MoodSelector,
  PlaylistPreview,
  HowItWorks,
  FinalCTA,
} from "@/components/landing";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayerProvider } from "@/components/player/PlayerContext";

export default function LandingPage() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    }
    checkUser();
  }, []);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodId(moodId);
  };

  return (
    <PlayerProvider>
      <div className="bg-[#07080E] text-foreground min-h-screen selection:bg-[#1DB954]/30 selection:text-[#1DB954] overflow-x-hidden">
        <CustomCursor />
        <Hero user={user} />
        <div id="mood-selector">
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
        </div>
        <PlaylistPreview selectedMoodId={selectedMoodId} user={user} />
        <HowItWorks selectedMoodId={selectedMoodId} />
        <FinalCTA selectedMoodId={selectedMoodId} user={user} />
      </div>
    </PlayerProvider>
  );
}