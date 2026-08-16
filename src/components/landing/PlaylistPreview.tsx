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
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "4:34", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Time%20(You%20and%20I)%20Khruangbin" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:35", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Show%20Me%20How%20Men%20I%20Trust" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Less%20I%20Know%20The%20Better%20Tame%20Impala" },
      { id: "4", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:51", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection%20Mac%20DeMarco" },
      { id: "5", title: "Archie, Marry Me", artist: "Alvvays", duration: "3:15", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Archie%20Marry%20Me%20Alvvays" },
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
  const activeMoodId = selectedMoodId || "something-mellow";
  const data = PLAYLIST_DATA[activeMoodId] || PLAYLIST_DATA["just-vibing"];
  const moodConfig = getMoodConfig(activeMoodId);

  return (
    <section
      id="playlist"
      className="relative py-20 lg:py-28 bg-[#080811] text-white border-b border-[#16162A]"
      aria-labelledby="playlist-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#1DB954] uppercase font-bold">
              02 / MADE FOR RIGHT NOW
            </div>
            <h2 id="playlist-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Your mood. Your mix.
            </h2>
            <p className="text-base text-slate-300">
              A living playlist that follows where your head is at.
            </p>
          </div>
        </div>

        {/* Target Styled Playlist Card Container */}
        <div className="rounded-3xl bg-[#0E0E1B] border-2 border-[#1E1E38] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-left">
          
          {/* Top Mix Sub-header */}
          <div className="flex items-center justify-between border-b border-[#1E1E38] pb-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[#1DB954] font-bold">((o)) MIX / 001</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
              <span className="text-[#1DB954] font-bold uppercase">live demo</span>
            </div>
          </div>

          {/* Grid Layout: Retro Album Art Left, Tracklist Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Retro Album Artwork Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-600 via-emerald-800 to-indigo-950 p-6 flex flex-col justify-between border border-[#26264A] shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start text-xs font-mono text-white/80">
                  <span>MOODTUNE</span>
                  <span>VOL. 01</span>
                </div>

                <div className="space-y-1 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-300 block">
                    CURATED SIGNAL
                  </span>
                  <h3 className="text-2xl font-black tracking-tight">{moodConfig.label}</h3>
                  <p className="text-xs text-white/70 font-mono">10 TRACKS • 38 MIN</p>
                </div>
              </div>
            </div>

            {/* Right Tracklist */}
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-2">
                MOODTUNE PRESENTS / {moodConfig.label} Mix
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
          </div>
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
  const [liked, setLiked] = useState(false);

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
      className="p-3.5 rounded-2xl bg-[#121222] border border-[#232342] hover:border-[#1DB954]/50 hover:bg-[#1A1A32] cursor-pointer flex items-center justify-between transition-colors group"
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
          className="w-10 h-10 rounded-xl object-cover"
        />
        <div>
          <h4 className="font-bold text-white text-sm group-hover:text-[#1DB954] transition-colors">{track.title}</h4>
          <p className="text-xs text-slate-400">{track.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`text-slate-500 hover:text-red-400 transition-colors ${liked ? "text-red-500" : ""}`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className="w-9 h-9 rounded-full bg-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954] hover:text-black flex items-center justify-center transition-colors shadow-sm"
        >
          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
            {isCurrentPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>

        <span className="text-xs font-mono text-slate-400 w-10 text-right">{track.duration}</span>
      </div>
    </div>
  );
}