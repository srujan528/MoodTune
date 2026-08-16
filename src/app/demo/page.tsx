"use client";

import { useState } from "react";
import {
  Hero,
  MoodSelector,
  RecommendationReveal,
  PlaylistPreview,
} from "@/components/landing";

export default function DemoPage() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMoodId(moodId);
  };

  return (
    <>
      <Hero />
      <MoodSelector onMoodSelect={handleMoodSelect} selectedMoodId={selectedMoodId} />
      {selectedMoodId && <RecommendationReveal selectedMoodId={selectedMoodId} />}
      {selectedMoodId && <PlaylistPreview selectedMoodId={selectedMoodId} />}
    </>
  );
}