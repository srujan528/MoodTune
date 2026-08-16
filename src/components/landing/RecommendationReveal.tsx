"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getMoodConfig } from "@/config/mood-config";
import { usePlayer } from "@/components/player/PlayerContext";

const RECOMMENDATION_DATA: Record<string, {
  mood: string;
  artists: Array<{
    name: string;
    genre: string;
    track: string;
    cover: string;
  }>;
  explanation: string;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    artists: [
      { name: "Khruangbin", genre: "Thai-funk", track: "Time (You and I)", cover: "https://i.scdn.co/image/ab67616d0000b273aa55d14fa0c5f21d374465d6" },
      { name: "Men I Trust", genre: "Dream pop", track: "Show Me How", cover: "https://i.scdn.co/image/ab67616d0000b273a25ef14f85e4edee45bc62c0" },
      { name: "Tame Impala", genre: "Psychedelic pop", track: "The Less I Know The Better", cover: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f13908f7e64" },
      { name: "Rex Orange County", genre: "Bedroom pop", track: "Sunflower", cover: "https://i.scdn.co/image/ab67616d0000b2735749f7e53f1910243e8a4a58" },
    ],
    explanation: "These tracks share warm production, relaxed tempos, and melodies that feel effortless — music that fits a good mood without demanding attention.",
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    artists: [
      { name: "Dua Lipa", genre: "Dance-pop", track: "Levitating", cover: "https://i.scdn.co/image/ab67616d0000b2732049e6f332968396d2e3a1f8" },
      { name: "Harry Styles", genre: "Pop-rock", track: "As It Was", cover: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d070539cb143" },
      { name: "Lizzo", genre: "Pop/R&B", track: "About Damn Time", cover: "https://i.scdn.co/image/ab67616d0000b273e82d7d5d28b9394625b041cf" },
    ],
    explanation: "Upbeat tempos, major keys, and bright production — these tracks share the energy and lift that can shift a heavy moment.",
  },
  "something-mellow": {
    mood: "Something mellow",
    artists: [
      { name: "Khruangbin & Leon Bridges", genre: "Thai-funk", track: "Texas Sun", cover: "https://i.scdn.co/image/ab67616d0000b273aa55d14fa0c5f21d374465d6" },
      { name: "Mac DeMarco", genre: "Indie rock", track: "Chamber of Reflection", cover: "https://i.scdn.co/image/ab67616d0000b2738f657a79e43f114c0a5e81d7" },
      { name: "Beach House", genre: "Dream pop", track: "Space Song", cover: "https://i.scdn.co/image/ab67616d0000b27329432655767b93836d10db9f" },
    ],
    explanation: "Low energy, gentle dynamics, warm textures — these artists share slow tempos (70-90 BPM), soft production, and a sense of ease.",
  },
  "in-my-feelings": {
    mood: "In my feelings",
    artists: [
      { name: "Adele", genre: "Soul/pop", track: "Someone Like You", cover: "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300" },
      { name: "Billie Eilish", genre: "Alt-pop", track: "When the Party's Over", cover: "https://i.scdn.co/image/ab67616d0000b27350a3160e0388d011f0a1042e" },
      { name: "Lord Huron", genre: "Indie folk", track: "The Night We Met", cover: "https://i.scdn.co/image/ab67616d0000b273ef47f07bb6b696e57922d56a" },
    ],
    explanation: "Minor keys, sparse arrangements, raw vocal delivery — these artists capture the sound of sitting with difficult emotions.",
  },
  "late-night-drive": {
    mood: "Late-night drive",
    artists: [
      { name: "Joji", genre: "Lo-fi/R&B", track: "Slow Dancing in the Dark", cover: "https://i.scdn.co/image/ab67616d0000b2733b1e7a57a0ec94a11f26f254" },
      { name: "The Weeknd", genre: "R&B/pop", track: "Call Out My Name", cover: "https://i.scdn.co/image/ab67616d0000b2731f91b790d96d9255743a6d1c" },
      { name: "Cigarettes After Sex", genre: "Ambient pop", track: "Apocalypse", cover: "https://i.scdn.co/image/ab67616d0000b273cc26543d8339f4088924b17b" },
    ],
    explanation: "Slower tempos, minor keys, atmospheric production — these artists create the intimate, reflective space that late nights call for.",
  },
};

export function RecommendationReveal({ selectedMoodId }: { selectedMoodId: string | null }) {
  if (!selectedMoodId) return null;

  const data = RECOMMENDATION_DATA[selectedMoodId] || RECOMMENDATION_DATA["something-mellow"];
  const moodConfig = getMoodConfig(selectedMoodId);

  return (
    <section
      id="recommendations"
      className="relative py-12 lg:py-16 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="rec-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-1">
              02 / THE RESULT
            </div>
            <h2 id="rec-heading" className="text-3xl font-extrabold tracking-tight text-white">
              Made for this moment
            </h2>
            <p className="text-sm text-slate-400">
              Based on your <span className="text-[#10B981] font-semibold">{moodConfig.label}</span> mood
            </p>
          </div>
        </motion.div>

        <ArtistCarousel artists={data.artists} />
        <ExplanationCard explanation={data.explanation} />
      </div>
    </section>
  );
}

function ArtistCarousel({
  artists,
}: {
  artists: Array<{ name: string; genre: string; track: string; cover: string }>;
}) {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayer();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {artists.map((item) => {
        const isCurrentPlaying = currentTrack?.name === item.track && isPlaying;
        const [imgSrc, setImgSrc] = useState(item.cover);

        return (
          <motion.div
            key={item.track}
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] hover:border-[#2D2D50] flex flex-col justify-between space-y-3"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#16162E]">
              <img
                src={imgSrc}
                alt={item.track}
                onError={() =>
                  setImgSrc(
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                  )
                }
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  if (isCurrentPlaying) {
                    pauseTrack();
                  } else {
                    playTrack({
                      id: item.track,
                      name: item.track,
                      artist: item.name,
                      albumImageUrl: item.cover,
                    });
                  }
                }}
                className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center group"
                aria-label={`Play ${item.track}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#6E36E4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                    {isCurrentPlaying ? (
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </div>
              </button>
            </div>

            <div>
              <h4 className="font-bold text-white text-base truncate">{item.track}</h4>
              <p className="text-xs text-slate-400 truncate">{item.name} • {item.genre}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ExplanationCard({ explanation }: { explanation: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#6E36E4]/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-bold text-white mb-1">Why this fits</h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">{explanation}</p>
      </div>
    </div>
  );
}