"use client";

import { useState } from "react";
import {
  Hero,
  MoodSelector,
  RecommendationReveal,
  PlaylistPreview,
  HowItWorks,
  FinalCTA,
} from "@/components/landing";
import { BentoGridSection } from "@/components/landing/BentoGridSection";
import { AcousticMorphingCanvas } from "@/components/landing/AcousticMorphingCanvas";
import { AcousticParticleCanvas } from "@/components/landing/AcousticParticleCanvas";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PlayerProvider } from "@/components/player/PlayerContext";

export default function LandingPage() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodId(moodId);
  };

  return (
    <PlayerProvider>
      <div className="bg-[#07080E] text-foreground min-h-screen selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
        <CustomCursor />
        <Hero />
        <div id="mood-selector">
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
        </div>
        <AcousticMorphingCanvas />
        <AcousticParticleCanvas />
        {selectedMoodId && <RecommendationReveal selectedMoodId={selectedMoodId} />}
        {selectedMoodId && <PlaylistPreview selectedMoodId={selectedMoodId} />}
        <BentoGridSection />
        <HowItWorks selectedMoodId={selectedMoodId} />
        <FinalCTA selectedMoodId={selectedMoodId} />
      </div>
    </PlayerProvider>
  );
}