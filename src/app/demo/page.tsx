"use client";

import { useState, useEffect } from "react";
import {
  Hero,
  MoodSelector,
  RecommendationReveal,
  PlaylistPreview,
} from "@/components/landing";
import { PlayerProvider } from "@/components/player/PlayerContext";

export default function DemoPage() {
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
      <Hero user={user} />
      <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
      {selectedMoodId && <RecommendationReveal selectedMoodId={selectedMoodId} user={user} />}
      {selectedMoodId && <PlaylistPreview selectedMoodId={selectedMoodId} user={user} />}
    </PlayerProvider>
  );
}