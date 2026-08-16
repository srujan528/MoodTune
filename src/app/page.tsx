"use client";

import { useState } from "react";
import {
  Hero,
  MoodSelector,
  RecommendationReveal,
  PlaylistPreview,
  FinalCTA,
} from "@/components/landing";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayerProvider } from "@/components/player/PlayerContext";

export default function LandingPage() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodId(moodId);
  };

  return (
    <PlayerProvider>
      <div className="bg-[#07080E] text-foreground min-h-screen selection:bg-[#1DB954]/30 selection:text-[#1DB954] overflow-x-hidden">
        <CustomCursor />
        <Hero />
        <div id="mood-selector">
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
        </div>
        {selectedMoodId && <RecommendationReveal selectedMoodId={selectedMoodId} />}
        {selectedMoodId && <PlaylistPreview selectedMoodId={selectedMoodId} />}
        <FinalCTA selectedMoodId={selectedMoodId} />
      </div>
    </PlayerProvider>
  );
}