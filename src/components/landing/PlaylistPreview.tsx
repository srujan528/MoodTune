"use client";

import { motion } from "framer-motion";
import { useMoodTheme } from "@/hooks";
import { cn } from "@/lib/utils/helpers";
import { getMoodConfig } from "@/config/mood-config";

const PLAYLIST_DATA: Record<string, {
  mood: string;
  tracks: Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
    artwork?: string;
  }>;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "3:57" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:24" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36" },
      { id: "4", title: "Best Part", artist: "Daniel Caesar ft. H.E.R.", duration: "3:30" },
      { id: "5", title: "Sunflower", artist: "Rex Orange County", duration: "3:15" },
      { id: "6", title: "Talk Too Much", artist: "COIN", duration: "3:28" },
      { id: "7", title: "Happiness", artist: "The 1975", duration: "3:32" },
      { id: "8", title: "Loving Is Easy", artist: "Rex Orange County", duration: "2:58" },
    ],
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    tracks: [
      { id: "1", title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
      { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47" },
      { id: "3", title: "About Damn Time", artist: "Lizzo", duration: "3:10" },
      { id: "4", title: "Happiness", artist: "The 1975", duration: "3:32" },
      { id: "5", title: "Sunflower", artist: "Rex Orange County", duration: "3:15" },
      { id: "6", title: "Talk Too Much", artist: "COIN", duration: "3:28" },
      { id: "7", title: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58" },
      { id: "8", title: "Stay", artist: "The Kid LAROI, Justin Bieber", duration: "2:21" },
    ],
  },
  "something-mellow": {
    mood: "Something mellow",
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "3:57" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:24" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36" },
      { id: "4", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:48" },
      { id: "5", title: "Archie, Marry Me", artist: "Alvvays", duration: "3:17" },
      { id: "6", title: "Space Song", artist: "Beach House", duration: "5:21" },
      { id: "7", title: "Breathe", artist: "Pink Floyd", duration: "2:43" },
      { id: "8", title: "Holocene", artist: "Bon Iver", duration: "5:36" },
    ],
  },
  "in-my-feelings": {
    mood: "In my feelings",
    tracks: [
      { id: "1", title: "Someone Like You", artist: "Adele", duration: "4:45" },
      { id: "2", title: "Too Good at Goodbyes", artist: "Sam Smith", duration: "3:21" },
      { id: "3", title: "drivers license", artist: "Olivia Rodrigo", duration: "4:02" },
      { id: "4", title: "When the Party's Over", artist: "Billie Eilish", duration: "3:16" },
      { id: "5", title: "Someone You Loved", artist: "Lewis Capaldi", duration: "3:02" },
      { id: "6", title: "Good Days", artist: "SZA", duration: "4:39" },
      { id: "7", title: "All Too Well", artist: "Taylor Swift", duration: "5:28" },
      { id: "8", title: "The Night We Met", artist: "Lord Huron", duration: "3:28" },
    ],
  },
  "late-night-drive": {
    mood: "Late-night drive",
    tracks: [
      { id: "1", title: "Slow Dancing in the Dark", artist: "Joji", duration: "3:39" },
      { id: "2", title: "Call Out My Name", artist: "The Weeknd", duration: "3:48" },
      { id: "3", title: "Nothing's Gonna Hurt You Baby", artist: "Cigarettes After Sex", duration: "5:28" },
      { id: "4", title: "Malibu Nights", artist: "LANY", duration: "3:12" },
      { id: "5", title: "Best Part", artist: "Daniel Caesar ft. H.E.R.", duration: "3:30" },
      { id: "6", title: "The Night We Met", artist: "Lord Huron", duration: "3:28" },
      { id: "7", title: "Bloom", artist: "The Paper Kites", duration: "3:57" },
      { id: "8", title: "Skinny Love", artist: "Bon Iver", duration: "3:58" },
    ],
  },
  "locked-in": {
    mood: "Locked in",
    tracks: [
      { id: "1", title: "A Walk", artist: "Tycho", duration: "4:30" },
      { id: "2", title: "Roygbiv", artist: "Boards of Canada", duration: "2:21" },
      { id: "3", title: "Open Eye Signal", artist: "Jon Hopkins", duration: "7:54" },
      { id: "4", title: "Says", artist: "Nils Frahm", duration: "8:18" },
      { id: "5", title: "Near Light", artist: "Ólafur Arnalds", duration: "3:41" },
      { id: "6", title: "I Can Feel the Night", artist: "Hammock", duration: "4:52" },
      { id: "7", title: "Division", artist: "Autechre", duration: "4:11" },
      { id: "8", title: "Intro", artist: "The xx", duration: "2:07" },
    ],
  },
  "getting-things-done": {
    mood: "Getting things done",
    tracks: [
      { id: "1", title: "A Walk", artist: "Tycho", duration: "4:30" },
      { id: "2", title: "Roygbiv", artist: "Boards of Canada", duration: "2:21" },
      { id: "3", title: "Open Eye Signal", artist: "Jon Hopkins", duration: "7:54" },
      { id: "4", title: "Says", artist: "Nils Frahm", duration: "8:18" },
      { id: "5", title: "Near Light", artist: "Ólafur Arnalds", duration: "3:41" },
      { id: "6", title: "I Can Feel the Night", artist: "Hammock", duration: "4:52" },
      { id: "7", title: "Division", artist: "Autechre", duration: "4:11" },
      { id: "8", title: "Intro", artist: "The xx", duration: "2:07" },
    ],
  },
  "need-some-energy": {
    mood: "Need some energy",
    tracks: [
      { id: "1", title: "Lose Yourself", artist: "Eminem", duration: "5:26" },
      { id: "2", title: "Power", artist: "Kanye West", duration: "3:41" },
      { id: "3", title: "God's Plan", artist: "Drake", duration: "3:19" },
      { id: "4", title: "SICKO MODE", artist: "Travis Scott", duration: "5:12" },
      { id: "5", title: "Smack My Bitch Up", artist: "The Prodigy", duration: "5:39" },
      { id: "6", title: "Killing in the Name", artist: "Rage Against the Machine", duration: "5:14" },
      { id: "7", title: "Remember the Name", artist: "Fort Minor", duration: "3:50" },
      { id: "8", title: "Till I Collapse", artist: "Eminem", duration: "4:57" },
    ],
  },
  "slow-sunday": {
    mood: "Slow Sunday",
    tracks: [
      { id: "1", title: "An Ending (Ascent)", artist: "Brian Eno", duration: "4:20" },
      { id: "2", title: "On the Nature of Daylight", artist: "Max Richter", duration: "6:24" },
      { id: "3", title: "Green", artist: "Hiroshi Yoshimura", duration: "4:15" },
      { id: "4", title: "dlp 1.1", artist: "William Basinski", duration: "6:30" },
      { id: "5", title: "A Walk", artist: "Tycho", duration: "4:30" },
      { id: "6", title: "Requiem for Dying Mothers", artist: "Stars of the Lid", duration: "8:15" },
      { id: "7", title: "Weightless", artist: "Marconi Union", duration: "8:09" },
      { id: "8", title: "Spiegel im Spiegel", artist: "Arvo Pärt", duration: "9:50" },
    ],
  },
  "feeling-good": {
    mood: "Feeling good",
    tracks: [
      { id: "1", title: "One More Time", artist: "Daft Punk", duration: "5:20" },
      { id: "2", title: "Summer", artist: "Calvin Harris", duration: "3:44" },
      { id: "3", title: "Don't Start Now", artist: "Dua Lipa", duration: "2:59" },
      { id: "4", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
      { id: "5", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30" },
      { id: "6", title: "Latch", artist: "Disclosure ft. Sam Smith", duration: "4:16" },
      { id: "7", title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
      { id: "8", title: "Get Lucky", artist: "Daft Punk ft. Pharrell", duration: "6:09" },
    ],
  },
};

export function PlaylistPreview({ selectedMoodId }: { selectedMoodId: string | null }) {
  const { mood } = useMoodTheme();

  if (!selectedMoodId) return null;

  const data = PLAYLIST_DATA[selectedMoodId] || PLAYLIST_DATA["late-night-drive"];
  const moodConfig = getMoodConfig(selectedMoodId);

  return (
    <section
      id="playlist"
      className="relative py-12 sm:py-16 lg:py-20"
      aria-labelledby="playlist-heading"
      style={{ background: `linear-gradient(180deg, transparent, rgba(${moodConfig.accentRgb}, 0.02))` }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 id="playlist-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-1">
                Your <span style={{ color: moodConfig.accentColor }}>{moodConfig.label}</span> mix
              </h2>
              <p className="text-sm text-muted-foreground/70">
                {data.tracks.length} tracks • ~{calculateDuration(data.tracks)} min
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PlayButton moodConfig={moodConfig} size="md" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                aria-label="Save playlist"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                aria-label="Share playlist"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <PlaylistCard
          tracks={data.tracks}
          moodConfig={moodConfig}
        />
      </div>
    </section>
  );
}

function PlaylistCard({
  tracks,
  moodConfig,
}: {
  tracks: Array<{ id: string; title: string; artist: string; duration: string; artwork?: string }>;
  moodConfig: ReturnType<typeof getMoodConfig>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10"
      style={{
        boxShadow: `
          0 0 40px rgba(${moodConfig.accentRgb}, 0.05),
          0 8px 32px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.02)
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] via-transparent to-transparent" />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[160px] -translate-x-1/2 translate-y-1/2 pointer-events-none"
        style={{
          background: `rgba(${moodConfig.accentRgb}, 0.06)`,
        }}
      />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 24px rgba(${moodConfig.accentRgb}, 0.15)` }}>
              <div className="absolute inset-0" style={{ background: moodConfig.backgroundGradient }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-white/10" aria-hidden="true">
                  {moodConfig.label.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">{moodConfig.label} Mix</h3>
              <p className="text-xs text-muted-foreground/60">{tracks.length} tracks • ~{calculateDuration(tracks)} min</p>
            </div>
          </div>
        </div>

        <div className="space-y-0.5">
          {tracks.map((track, index) => (
            <PlaylistTrack
              key={track.id}
              track={track}
              index={index + 1}
              moodConfig={moodConfig}
              delay={index * 0.03}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PlaylistTrack({
  track,
  index,
  moodConfig,
  delay,
}: {
  track: { id: string; title: string; artist: string; duration: string; artwork?: string };
  index: number;
  moodConfig: ReturnType<typeof getMoodConfig>;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 0.2 + delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-lg overflow-hidden transition-all duration-200"
      whileHover={{ background: "rgba(255, 255, 255, 0.02)" }}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="flex items-center gap-2.5 w-10 flex-shrink-0">
          <span className="text-xs font-mono text-muted-foreground/40 tabular-nums w-6 text-right">{index}</span>
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0" style={{ boxShadow: `0 0 12px rgba(${moodConfig.accentRgb}, 0.1)` }}>
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(${moodConfig.accentRgb}, 0.12), rgba(${moodConfig.accentRgb}, 0.03))` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-4.5 w-4.5 text-white/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              whileHover={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label={`Play ${track.title}`}
                style={{ background: `rgba(${moodConfig.accentRgb}, 0.15)`, borderColor: moodConfig.accentColor }}
              >
                <svg className="h-4.5 w-4.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">{track.title}</h4>
          <p className="text-xs text-muted-foreground/60 truncate">{track.artist}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
          <span className="font-mono tabular-nums w-12 text-right">{track.duration}</span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 rounded-full bg-white/[0.02] hover:bg-white/[0.05] flex items-center justify-center text-muted-foreground/50 hover:text-red-400 transition-colors"
            aria-label={`Add ${track.title} to favorites`}
          >
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${moodConfig.accentRgb}, 0.08), transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.2 + delay }}
      />
    </motion.div>
  );
}

function PlayButton({ moodConfig, size = "md" }: { moodConfig: ReturnType<typeof getMoodConfig>; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-9 h-9 text-xs px-2.5",
    md: "w-10 h-10 text-sm px-3",
    lg: "w-12 h-12 text-base px-4",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-white",
        "shadow-[0_2px_12px_rgba(167,139,250,0.2)]",
        "hover:shadow-[0_4px_20px_rgba(167,139,250,0.3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        sizes[size],
        "transition-all duration-200"
      )}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Play playlist"
      style={{ background: `linear-gradient(135deg, ${moodConfig.accentColor}, ${moodConfig.backgroundVia})` }}
    >
      <svg className="h-4.5 w-4.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <span className="hidden sm:inline">Play</span>
    </motion.button>
  );
}

function calculateDuration(tracks: Array<{ duration: string }>): number {
  const totalSeconds = tracks.reduce((acc, track) => {
    const [min, sec] = track.duration.split(":").map(Number);
    return acc + min * 60 + sec;
  }, 0);
  return Math.round(totalSeconds / 60);
}