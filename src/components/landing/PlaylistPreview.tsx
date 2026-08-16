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
    spotifyUrl: string;
  }>;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "3:57", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Time%20(You%20and%20I)%20Khruangbin" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:24", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Show%20Me%20How%20Men%20I%20Trust" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Less%20I%20Know%20The%20Better%20Tame%20Impala" },
      { id: "4", title: "Sunflower", artist: "Rex Orange County", duration: "3:15", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunflower%20Rex%20Orange%20County" },
    ],
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    tracks: [
      { id: "1", title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Levitating%20Dua%20Lipa" },
      { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/be/89/3e/be893e15-5460-394c-cb14-ee1855a8be90/196589006935.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/As%20It%20Was%20Harry%20Styles" },
      { id: "3", title: "About Damn Time", artist: "Lizzo", duration: "3:10", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/About%20Damn%20Time%20Lizzo" },
    ],
  },
  "something-mellow": {
    mood: "Something mellow",
    tracks: [
      { id: "1", title: "Texas Sun", artist: "Khruangbin & Leon Bridges", duration: "4:12", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Texas%20Sun%20Khruangbin" },
      { id: "2", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:48", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection%20Mac%20DeMarco" },
      { id: "3", title: "Space Song", artist: "Beach House", duration: "5:21", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/17/ef/ee17efdb-01eb-c5a4-ee4f-56df01691238/098787114068.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Space%20Song%20Beach%20House" },
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
          spotifyUrl: first.spotifyUrl,
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
              Your <span className="text-[#1DB954]">{moodConfig.label}</span> mix
            </h2>
            <p className="text-xs text-slate-400">
              {data.tracks.length} tracks • Ready to stream
            </p>
          </div>
          <button
            onClick={handlePlayFirst}
            className="px-5 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black text-sm font-bold transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.4)]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Mix</span>
          </button>
        </div>

        <div className="space-y-2">
          {data.tracks.map((track, index) => (
            <PlaylistTrackItem
              key={track.id}
              track={track}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaylistTrackItem({
  track,
  index,
}: {
  track: { id: string; title: string; artist: string; duration: string; cover: string; spotifyUrl: string };
  index: number;
}) {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayer();
  const [imgSrc, setImgSrc] = useState(track.cover);

  const isCurrentPlaying = currentTrack?.name === track.title && isPlaying;

  const onTogglePlay = () => {
    if (isCurrentPlaying) {
      pauseTrack();
    } else {
      playTrack({
        id: track.title,
        name: track.title,
        artist: track.artist,
        albumImageUrl: track.cover,
        spotifyUrl: track.spotifyUrl,
      });
    }
  };

  return (
    <div
      onClick={onTogglePlay}
      className="p-3.5 rounded-xl bg-[#0E0E1B] border border-[#1C1C32] hover:border-[#1DB954]/50 hover:bg-[#141428] cursor-pointer flex items-center justify-between transition-colors group"
    >
      <div className="flex items-center gap-3.5">
        <span className="text-xs font-mono text-slate-500 w-4 text-center">{index}</span>
        <img
          src={imgSrc}
          alt={track.title}
          onError={() => {
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(track.title + " " + track.artist)}&media=music&limit=1`)
              .then((res) => res.json())
              .then((data) => {
                if (data.results?.[0]?.artworkUrl100) {
                  setImgSrc(data.results[0].artworkUrl100.replace("100x100bb", "600x600bb"));
                }
              })
              .catch(() => {});
          }}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-bold text-white text-sm group-hover:text-[#1DB954] transition-colors">{track.title}</h4>
          <p className="text-xs text-slate-400">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className="w-8 h-8 rounded-full bg-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954] hover:text-black flex items-center justify-center transition-colors"
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