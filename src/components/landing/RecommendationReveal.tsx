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
    spotifyUrl: string;
  }>;
  explanation: string;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    artists: [
      { name: "Khruangbin", genre: "Thai-funk", track: "Time (You and I)", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Time%20(You%20and%20I)%20Khruangbin" },
      { name: "Men I Trust", genre: "Dream pop", track: "Show Me How", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Show%20Me%20How%20Men%20I%20Trust" },
      { name: "Tame Impala", genre: "Psychedelic pop", track: "The Less I Know The Better", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Less%20I%20Know%20The%20Better%20Tame%20Impala" },
      { name: "Rex Orange County", genre: "Bedroom pop", track: "Sunflower", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunflower%20Rex%20Orange%20County" },
    ],
    explanation: "These tracks share warm production, relaxed tempos, and melodies that feel effortless — music that fits a good mood without demanding attention.",
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    artists: [
      { name: "Dua Lipa", genre: "Dance-pop", track: "Levitating", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Levitating%20Dua%20Lipa" },
      { name: "Harry Styles", genre: "Pop-rock", track: "As It Was", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/be/89/3e/be893e15-5460-394c-cb14-ee1855a8be90/196589006935.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/As%20It%20Was%20Harry%20Styles" },
      { name: "Lizzo", genre: "Pop/R&B", track: "About Damn Time", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/About%20Damn%20Time%20Lizzo" },
    ],
    explanation: "Upbeat tempos, major keys, and bright production — these tracks share the energy and lift that can shift a heavy moment.",
  },
  "something-mellow": {
    mood: "Something mellow",
    artists: [
      { name: "Khruangbin & Leon Bridges", genre: "Thai-funk", track: "Texas Sun", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Texas%20Sun%20Khruangbin" },
      { name: "Mac DeMarco", genre: "Indie rock", track: "Chamber of Reflection", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection%20Mac%20DeMarco" },
      { name: "Beach House", genre: "Dream pop", track: "Space Song", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/17/ef/ee17efdb-01eb-c5a4-ee4f-56df01691238/098787114068.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Space%20Song%20Beach%20House" },
    ],
    explanation: "Low energy, gentle dynamics, warm textures — these artists share slow tempos (70-90 BPM), soft production, and a sense of ease.",
  },
  "in-my-feelings": {
    mood: "In my feelings",
    artists: [
      { name: "Adele", genre: "Soul/pop", track: "Someone Like You", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/31/3d/8c/313d8c1c-3b3b-8515-3d96-5f80bfebc6f0/886443315629.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Someone%20Like%20You%20Adele" },
      { name: "Billie Eilish", genre: "Alt-pop", track: "When the Party's Over", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/bf/b1/7d/bfb17d3b-e01d-5b8d-294b-9e450b7b1341/19UMGIM08436.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/When%20the%20Party's%20Over%20Billie%20Eilish" },
      { name: "Lord Huron", genre: "Indie folk", track: "The Night We Met", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/71/84/0d/71840d58-95d8-30bb-a3e9-74d11e5f8f85/15UMGIM09731.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Night%20We%20Met%20Lord%20Huron" },
    ],
    explanation: "Minor keys, sparse arrangements, raw vocal delivery — these artists capture the sound of sitting with difficult emotions.",
  },
  "late-night-drive": {
    mood: "Late-night drive",
    artists: [
      { name: "Joji", genre: "Lo-fi/R&B", track: "Slow Dancing in the Dark", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c3/0f/59/c30f5926-4447-49d6-32d8-bf5b271d7986/859728343759_cover.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Slow%20Dancing%20in%20the%20Dark%20Joji" },
      { name: "The Weeknd", genre: "R&B/pop", track: "Call Out My Name", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/1e/85/55/1e8555c8-1e4a-9040-5221-5a02568600d8/18UMGIM19246.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Call%20Out%20My%20Name%20The%20Weeknd" },
      { name: "Cigarettes After Sex", genre: "Ambient pop", track: "Apocalypse", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cc/26/54/cc26543d-8339-f408-8892-4b17b94921ff/720841214620.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Apocalypse%20Cigarettes%20After%20Sex" },
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
              Based on your <span className="text-[#1DB954] font-semibold">{moodConfig.label}</span> mood
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
  artists: Array<{ name: string; genre: string; track: string; cover: string; spotifyUrl: string }>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {artists.map((item) => (
        <ArtistCard key={item.track} item={item} />
      ))}
    </div>
  );
}

function ArtistCard({
  item,
}: {
  item: { name: string; genre: string; track: string; cover: string; spotifyUrl: string };
}) {
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayer();
  const [imgSrc, setImgSrc] = useState(item.cover);

  const isCurrentPlaying = currentTrack?.name === item.track && isPlaying;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] hover:border-[#1DB954]/50 flex flex-col justify-between space-y-3"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#16162E]">
        <img
          src={imgSrc}
          alt={item.track}
          onError={() => {
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(item.track + " " + item.name)}&media=music&limit=1`)
              .then((res) => res.json())
              .then((data) => {
                if (data.results?.[0]?.artworkUrl100) {
                  setImgSrc(data.results[0].artworkUrl100.replace("100x100bb", "600x600bb"));
                }
              })
              .catch(() => {});
          }}
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
                spotifyUrl: item.spotifyUrl,
              });
            }
          }}
          className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center group"
          aria-label={`Play ${item.track}`}
        >
          <div className="w-12 h-12 rounded-full bg-[#1DB954] text-black flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.5)] group-hover:scale-110 transition-transform">
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

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1C1C32]">
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-white text-sm truncate">{item.track}</h4>
          <p className="text-xs text-slate-400 truncate">{item.name} • {item.genre}</p>
        </div>
        <a
          href={item.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-full bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors"
          title="Listen on Spotify"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.62-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify</span>
        </a>
      </div>
    </motion.div>
  );
}

function ExplanationCard({ explanation }: { explanation: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0E0E1B] border border-[#1C1C32] flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center shrink-0">
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