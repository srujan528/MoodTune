"use client";

import { useState } from "react";
import { getMoodConfig } from "@/config/mood-config";
import { usePlayer } from "@/components/player/PlayerContext";

const PLAYLIST_DATA: Record<string, {
  mood: string;
  tracks: Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
    cover: string;
  }>;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "3:57", cover: "https://i.scdn.co/image/ab67616d0000b273aa55d14fa0c5f21d374465d6" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:24", cover: "https://i.scdn.co/image/ab67616d0000b273a25ef14f85e4edee45bc62c0" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36", cover: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f13908f7e64" },
      { id: "4", title: "Sunflower", artist: "Rex Orange County", duration: "3:15", cover: "https://i.scdn.co/image/ab67616d0000b2735749f7e53f1910243e8a4a58" },
    ],
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    tracks: [
      { id: "1", title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "https://i.scdn.co/image/ab67616d0000b2732049e6f332968396d2e3a1f8" },
      { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47", cover: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d070539cb143" },
      { id: "3", title: "About Damn Time", artist: "Lizzo", duration: "3:10", cover: "https://i.scdn.co/image/ab67616d0000b273e82d7d5d28b9394625b041cf" },
    ],
  },
  "something-mellow": {
    mood: "Something mellow",
    tracks: [
      { id: "1", title: "Texas Sun", artist: "Khruangbin & Leon Bridges", duration: "4:12", cover: "https://i.scdn.co/image/ab67616d0000b273aa55d14fa0c5f21d374465d6" },
      { id: "2", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:48", cover: "https://i.scdn.co/image/ab67616d0000b2738f657a79e43f114c0a5e81d7" },
      { id: "3", title: "Space Song", artist: "Beach House", duration: "5:21", cover: "https://i.scdn.co/image/ab67616d0000b27329432655767b93836d10db9f" },
    ],
  },
};

export function PlaylistPreview({ selectedMoodId }: { selectedMoodId: string | null }) {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayer();

  if (!selectedMoodId) return null;

  const data = PLAYLIST_DATA[selectedMoodId] || PLAYLIST_DATA["something-mellow"];
  const moodConfig = getMoodConfig(selectedMoodId);

  const handlePlayFirst = () => {
    if (data.tracks.length > 0) {
      const first = data.tracks[0];
      if (currentTrack?.name === first.title && isPlaying) {
        pauseTrack();
      } else {
        playTrack({
          id: first.title,
          name: first.title,
          artist: first.artist,
          albumImageUrl: first.cover,
        });
      }
    }
  };

  return (
    <section
      id="playlist"
      className="relative py-12 lg:py-16 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="playlist-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="playlist-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Your <span className="text-[#10B981]">{moodConfig.label}</span> mix
            </h2>
            <p className="text-xs text-slate-400">
              {data.tracks.length} tracks • Ready to stream
            </p>
          </div>
          <button
            onClick={handlePlayFirst}
            className="px-5 py-2.5 rounded-xl bg-[#6E36E4] hover:bg-[#7E46F4] text-white text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Mix</span>
          </button>
        </div>

        <div className="space-y-2">
          {data.tracks.map((track, index) => {
            const isCurrentPlaying = currentTrack?.name === track.title && isPlaying;
            return (
              <PlaylistTrackItem
                key={track.id}
                track={track}
                index={index + 1}
                isCurrentPlaying={isCurrentPlaying}
                onTogglePlay={() => {
                  if (isCurrentPlaying) {
                    pauseTrack();
                  } else {
                    playTrack({
                      id: track.title,
                      name: track.title,
                      artist: track.artist,
                      albumImageUrl: track.cover,
                    });
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlaylistTrackItem({
  track,
  index,
  isCurrentPlaying,
  onTogglePlay,
}: {
  track: { id: string; title: string; artist: string; duration: string; cover: string };
  index: number;
  isCurrentPlaying: boolean;
  onTogglePlay: () => void;
}) {
  const [imgSrc, setImgSrc] = useState(track.cover);

  return (
    <div
      onClick={onTogglePlay}
      className="p-3.5 rounded-xl bg-[#0E0E1B] border border-[#1C1C32] hover:border-[#2D2D50] hover:bg-[#141428] cursor-pointer flex items-center justify-between transition-colors group"
    >
      <div className="flex items-center gap-3.5">
        <span className="text-xs font-mono text-slate-500 w-4 text-center">{index}</span>
        <img
          src={imgSrc}
          alt={track.title}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
            )
          }
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-bold text-white text-sm group-hover:text-[#8B5CF6] transition-colors">{track.title}</h4>
          <p className="text-xs text-slate-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className="w-8 h-8 rounded-full bg-[#6E36E4]/20 text-[#8B5CF6] hover:bg-[#6E36E4] hover:text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
            {isCurrentPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <span className="text-xs font-mono text-slate-400">{track.duration}</span>
      </div>
    </div>
  );
}