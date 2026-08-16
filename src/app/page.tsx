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
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function LandingPage() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodId(moodId);
  };

  return (
    <div className="bg-[#07080E] text-foreground min-h-screen selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
      <CustomCursor />
      <Hero />
      <div id="mood-selector">
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
      </div>
      {selectedMoodId && <RecommendationReveal selectedMoodId={selectedMoodId} />}
      {selectedMoodId && <PlaylistPreview selectedMoodId={selectedMoodId} />}
      <BentoGridSection />
      <HowItWorks selectedMoodId={selectedMoodId} />
      <FinalCTA selectedMoodId={selectedMoodId} />
    </div>
  );
}