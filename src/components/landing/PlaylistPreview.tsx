"use client";

import { useState } from "react";
import { getMoodConfig } from "@/config/mood-config";
import { usePlayer } from "@/components/player/PlayerContext";

const PLAYLIST_DATA: Record<string, {
  mood: string;
  moodCoverImage: string;
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
    moodCoverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "4:34", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Time%20(You%20and%20I)%20Khruangbin" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:35", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Show%20Me%20How%20Men%20I%20Trust" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Less%20I%20Know%20The%20Better%20Tame%20Impala" },
      { id: "4", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:51", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection%20Mac%20DeMarco" },
      { id: "5", title: "Archie, Marry Me", artist: "Alvvays", duration: "3:15", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Archie%20Marry%20Me%20Alvvays" },
    ],
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    moodCoverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Levitating", artist: "Dua Lipa", duration: "3:23", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Levitating%20Dua%20Lipa" },
      { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/be/89/3e/be893e15-5460-394c-cb14-ee1855a8be90/196589006935.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/As%20It%20Was%20Harry%20Styles" },
      { id: "3", title: "About Damn Time", artist: "Lizzo", duration: "3:10", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/About%20Damn%20Time%20Lizzo" },
      { id: "4", title: "Good as Hell", artist: "Lizzo", duration: "2:39", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Good%20as%20Hell%20Lizzo" },
      { id: "5", title: "Dog Days Are Over", artist: "Florence + The Machine", duration: "4:12", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Dog%20Days%20Are%20Over" },
    ],
  },
  "something-mellow": {
    mood: "Something mellow",
    moodCoverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Texas Sun", artist: "Khruangbin & Leon Bridges", duration: "4:12", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Texas%20Sun%20Khruangbin" },
      { id: "2", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:48", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Chamber%20of%20Reflection%20Mac%20DeMarco" },
      { id: "3", title: "Space Song", artist: "Beach House", duration: "5:21", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/17/ef/ee17efdb-01eb-c5a4-ee4f-56df01691238/098787114068.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Space%20Song%20Beach%20House" },
      { id: "4", title: "Sunsetz", artist: "Cigarettes After Sex", duration: "3:34", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cc/26/54/cc26543d-8339-f408-8892-4b17b94921ff/720841214620.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunsetz%20Cigarettes%20After%20Sex" },
      { id: "5", title: "Japanese Denim", artist: "Daniel Caesar", duration: "4:30", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Japanese%20Denim" },
    ],
  },
  "in-my-feelings": {
    mood: "In my feelings",
    moodCoverImage: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Someone Like You", artist: "Adele", duration: "4:45", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/31/3d/8c/313d8c1c-3b3b-8515-3d96-5f80bfebc6f0/886443315629.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Someone%20Like%20You%20Adele" },
      { id: "2", title: "When the Party's Over", artist: "Billie Eilish", duration: "3:16", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/bf/b1/7d/bfb17d3b-e01d-5b8d-294b-9e450b7b1341/19UMGIM08436.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/When%20the%20Party's%20Over%20Billie%20Eilish" },
      { id: "3", title: "The Night We Met", artist: "Lord Huron", duration: "3:28", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/71/84/0d/71840d58-95d8-30bb-a3e9-74d11e5f8f85/15UMGIM09731.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/The%20Night%20We%20Met%20Lord%20Huron" },
      { id: "4", title: "All I Want", artist: "Kodaline", duration: "5:05", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/All%20I%20Want%20Kodaline" },
      { id: "5", title: "Driver's License", artist: "Olivia Rodrigo", duration: "4:02", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/be/89/3e/be893e15-5460-394c-cb14-ee1855a8be90/196589006935.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Drivers%20License%20Olivia%20Rodrigo" },
    ],
  },
  "late-night-drive": {
    mood: "Late-night drive",
    moodCoverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Slow Dancing in the Dark", artist: "Joji", duration: "3:29", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c3/0f/59/c30f5926-4447-49d6-32d8-bf5b271d7986/859728343759_cover.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Slow%20Dancing%20in%20the%20Dark%20Joji" },
      { id: "2", title: "Call Out My Name", artist: "The Weeknd", duration: "3:48", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/1e/85/55/1e8555c8-1e4a-9040-5221-5a02568600d8/18UMGIM19246.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Call%20Out%20My%20Name%20The%20Weeknd" },
      { id: "3", title: "Apocalypse", artist: "Cigarettes After Sex", duration: "4:50", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cc/26/54/cc26543d-8339-f408-8892-4b17b94921ff/720841214620.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Apocalypse%20Cigarettes%20After%20Sex" },
      { id: "4", title: "Midnight City", artist: "M83", duration: "4:03", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Midnight%20City%20M83" },
      { id: "5", title: "Nightcall", artist: "Kavinsky", duration: "4:19", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Nightcall%20Kavinsky" },
    ],
  },
  "locked-in": {
    mood: "Locked in",
    moodCoverImage: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Resonance", artist: "HOME", duration: "3:32", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/eb/03/49/eb0349ca-4700-1c09-7d88-b4b9b9909fb5/817949019688.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Resonance%20HOME" },
      { id: "2", title: "Weightless", artist: "Marconi Union", duration: "8:00", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ee/17/ef/ee17efdb-01eb-c5a4-ee4f-56df01691238/098787114068.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Weightless%20Marconi%20Union" },
      { id: "3", title: "Clair de Lune", artist: "Flight Facilities", duration: "7:38", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Clair%20de%20Lune" },
    ],
  },
  "getting-things-done": {
    mood: "Getting things done",
    moodCoverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Da Funk", artist: "Daft Punk", duration: "5:28", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Da%20Funk%20Daft%20Punk" },
      { id: "2", title: "Starboy", artist: "The Weeknd", duration: "3:50", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/1e/85/55/1e8555c8-1e4a-9040-5221-5a02568600d8/18UMGIM19246.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Starboy%20The%20Weeknd" },
      { id: "3", title: "Electric Feel", artist: "MGMT", duration: "3:49", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Electric%20Feel%20MGMT" },
    ],
  },
  "need-some-energy": {
    mood: "Need some energy",
    moodCoverImage: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/1e/85/55/1e8555c8-1e4a-9040-5221-5a02568600d8/18UMGIM19246.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Blinding%20Lights%20The%20Weeknd" },
      { id: "2", title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", duration: "4:18", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Cant%20Hold%20Us" },
      { id: "3", title: "Uptown Funk", artist: "Mark Ronson & Bruno Mars", duration: "4:30", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Uptown%20Funk" },
    ],
  },
  "slow-sunday": {
    mood: "Slow Sunday",
    moodCoverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Banana Pancakes", artist: "Jack Johnson", duration: "3:12", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bf/16/c0/bf16c024-e9ed-c77a-ecae-8bfefbf3f6ef/656605151566.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Banana%20Pancakes%20Jack%20Johnson" },
      { id: "2", title: "Sunday Morning", artist: "Maroon 5", duration: "4:02", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/be/89/3e/be893e15-5460-394c-cb14-ee1855a8be90/196589006935.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunday%20Morning%20Maroon%205" },
      { id: "3", title: "Put Your Records On", artist: "Corinne Bailey Rae", duration: "3:35", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/38/2e/d9382e88-6625-635e-c4bb-eaefc60965e6/artwork.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Put%20Your%20Records%20On" },
    ],
  },
  "feeling-good": {
    mood: "Feeling good",
    moodCoverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    tracks: [
      { id: "1", title: "Sunroof", artist: "Nicky Youre & dazy", duration: "2:43", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4a/01/a3/4a01a355-6b58-e395-5847-a417643b1854/190295240455.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Sunroof%20Nicky%20Youre" },
      { id: "2", title: "Happy", artist: "Pharrell Williams", duration: "3:53", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/43/d8/d543d838-8c17-1065-274e-6e270a48a90d/075679744418.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Happy%20Pharrell" },
      { id: "3", title: "Walking On Sunshine", artist: "Katrina and The Waves", duration: "3:58", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/f6/28/bff628e8-d6cb-022e-a5bf-8547a4b08709/15UMGIM81958.rgb.jpg/600x600bb.jpg", spotifyUrl: "https://open.spotify.com/search/Walking%20On%20Sunshine" },
    ],
  },
};

export function PlaylistPreview({ selectedMoodId }: { selectedMoodId: string | null }) {
  const activeMoodId = selectedMoodId || "something-mellow";
  const data = PLAYLIST_DATA[activeMoodId] || PLAYLIST_DATA["just-vibing"];
  const moodConfig = getMoodConfig(activeMoodId);
  const [coverImgSrc, setCoverImgSrc] = useState(data.moodCoverImage);

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
            
            {/* Left Retro Album Artwork Card with Photo Background */}
            <div className="lg:col-span-4 space-y-4">
              <div className="aspect-square rounded-2xl p-6 flex flex-col justify-between border border-[#26264A] shadow-2xl relative overflow-hidden group">
                
                {/* Background Photo Image */}
                <img
                  src={data.moodCoverImage}
                  alt={moodConfig.label}
                  onError={() => setCoverImgSrc("https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 backdrop-blur-[1px]" />

                {/* Glassmorphism Top Badges */}
                <div className="relative z-10 flex justify-between items-start text-xs font-mono text-white/90">
                  <span className="px-2.5 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-md font-bold tracking-widest">
                    MOODTUNE
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/50 border border-white/10 backdrop-blur-md font-bold tracking-widest text-[#1DB954]">
                    VOL. 01
                  </span>
                </div>

                {/* Glassmorphism Bottom Title & Details */}
                <div className="relative z-10 space-y-1.5 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#1DB954] font-bold block bg-[#052317]/80 w-max px-2 py-0.5 rounded border border-[#10B981]/30">
                    CURATED SIGNAL
                  </span>
                  <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-md">{moodConfig.label}</h3>
                  <p className="text-xs text-slate-300 font-mono drop-shadow">{data.tracks.length} TRACKS • READY TO STREAM</p>
                </div>
              </div>
            </div>

            {/* Right Tracklist */}
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
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