"use client";

import { motion } from "framer-motion";
import { useMoodTheme } from "@/hooks";
import { getMoodConfig } from "@/config/mood-config";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils/helpers";

const RECOMMENDATION_DATA: Record<string, {
  mood: string;
  artists: Array<{ name: string; genre: string; image?: string }>;
  explanation: string;
}> = {
  "just-vibing": {
    mood: "Just vibing",
    artists: [
      { name: "Khruangbin", genre: "Thai-funk" },
      { name: "Men I Trust", genre: "Dream pop" },
      { name: "Tame Impala", genre: "Psychedelic pop" },
      { name: "Rex Orange County", genre: "Bedroom pop" },
      { name: "COIN", genre: "Indie pop" },
      { name: "The 1975", genre: "Indie pop" },
    ],
    explanation: "These artists share warm production, relaxed tempos, and melodies that feel effortless — music that fits a good mood without demanding attention.",
  },
  "need-pick-me-up": {
    mood: "Need a pick-me-up",
    artists: [
      { name: "Dua Lipa", genre: "Dance-pop" },
      { name: "Harry Styles", genre: "Pop-rock" },
      { name: "Lizzo", genre: "Pop/R&B" },
      { name: "The 1975", genre: "Indie pop" },
      { name: "COIN", genre: "Indie pop" },
      { name: "Rex Orange County", genre: "Bedroom pop" },
    ],
    explanation: "Upbeat tempos, major keys, and bright production — these tracks share the energy and lift that can shift a heavy moment.",
  },
  "something-mellow": {
    mood: "Something mellow",
    artists: [
      { name: "Khruangbin", genre: "Thai-funk" },
      { name: "Men I Trust", genre: "Dream pop" },
      { name: "Tame Impala", genre: "Psychedelic pop" },
      { name: "Mac DeMarco", genre: "Indie rock" },
      { name: "Alvvays", genre: "Dream pop" },
      { name: "Beach House", genre: "Dream pop" },
    ],
    explanation: "Low energy, gentle dynamics, warm textures — these artists share slow tempos (70-90 BPM), soft production, and a sense of ease.",
  },
  "in-my-feelings": {
    mood: "In my feelings",
    artists: [
      { name: "Adele", genre: "Soul/pop" },
      { name: "Sam Smith", genre: "Pop/soul" },
      { name: "Billie Eilish", genre: "Alt-pop" },
      { name: "Olivia Rodrigo", genre: "Pop" },
      { name: "Lewis Capaldi", genre: "Pop/soul" },
      { name: "SZA", genre: "R&B" },
    ],
    explanation: "Minor keys, sparse arrangements, raw vocal delivery — these artists capture the sound of sitting with difficult emotions.",
  },
  "late-night-drive": {
    mood: "Late-night drive",
    artists: [
      { name: "Joji", genre: "Lo-fi/R&B" },
      { name: "The Weeknd", genre: "R&B/pop" },
      { name: "Cigarettes After Sex", genre: "Ambient pop" },
      { name: "LANY", genre: "Synth-pop" },
      { name: "Honne", genre: "Electronic soul" },
      { name: "Daniel Caesar", genre: "R&B" },
    ],
    explanation: "Slower tempos, minor keys, atmospheric production — these artists create the intimate, reflective space that late nights call for.",
  },
  "locked-in": {
    mood: "Locked in",
    artists: [
      { name: "Tycho", genre: "Ambient electronic" },
      { name: "Boards of Canada", genre: "Ambient/IDM" },
      { name: "Jon Hopkins", genre: "Electronic" },
      { name: "Nils Frahm", genre: "Modern classical" },
      { name: "Olafur Arnalds", genre: "Modern classical" },
      { name: "Hammock", genre: "Post-rock/ambient" },
    ],
    explanation: "Steady tempos, minimal vocals, repetitive structures — these artists make music that supports sustained attention without pulling focus.",
  },
  "getting-things-done": {
    mood: "Getting things done",
    artists: [
      { name: "Tycho", genre: "Ambient electronic" },
      { name: "Boards of Canada", genre: "Ambient/IDM" },
      { name: "Jon Hopkins", genre: "Electronic" },
      { name: "Nils Frahm", genre: "Modern classical" },
      { name: "Olafur Arnalds", genre: "Modern classical" },
      { name: "Hammock", genre: "Post-rock/ambient" },
    ],
    explanation: "Consistent rhythm, instrumental focus, predictable progressions — music designed to fade into the background while you work.",
  },
  "need-some-energy": {
    mood: "Need some energy",
    artists: [
      { name: "Eminem", genre: "Hip-hop" },
      { name: "Kanye West", genre: "Hip-hop" },
      { name: "Drake", genre: "Hip-hop/R&B" },
      { name: "Travis Scott", genre: "Trap" },
      { name: "The Prodigy", genre: "Electronic" },
      { name: "Rage Against the Machine", genre: "Rock" },
    ],
    explanation: "High tempo (130-160 BPM), driving rhythms, aggressive dynamics — music built for forward momentum and intensity.",
  },
  "slow-sunday": {
    mood: "Slow Sunday",
    artists: [
      { name: "Brian Eno", genre: "Ambient" },
      { name: "Max Richter", genre: "Modern classical" },
      { name: "Hiroshi Yoshimura", genre: "Ambient" },
      { name: "William Basinski", genre: "Ambient" },
      { name: "Tycho", genre: "Ambient electronic" },
      { name: "Stars of the Lid", genre: "Drone/ambient" },
    ],
    explanation: "Very slow tempos (<70 BPM), minimal percussion, sustained tones — music that encourages physiological slowing and rest.",
  },
  "feeling-good": {
    mood: "Feeling good",
    artists: [
      { name: "Daft Punk", genre: "Electronic" },
      { name: "Calvin Harris", genre: "EDM" },
      { name: "Dua Lipa", genre: "Dance-pop" },
      { name: "The Weeknd", genre: "R&B/pop" },
      { name: "Mark Ronson", genre: "Funk/pop" },
      { name: "Disclosure", genre: "Electronic" },
    ],
    explanation: "High danceability, strong grooves, infectious hooks — music made for movement and shared energy.",
  },
};

export function RecommendationReveal({ selectedMoodId }: { selectedMoodId: string | null }) {
  const { mood } = useMoodTheme();

  if (!selectedMoodId) return null;

  const data = RECOMMENDATION_DATA[selectedMoodId] || RECOMMENDATION_DATA["late-night-drive"];
  const moodConfig = getMoodConfig(selectedMoodId);

  return (
    <section
      id="recommendations"
      className="relative py-12 sm:py-16 lg:py-20"
      aria-labelledby="rec-heading"
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
          <div className="flex items-center justify-between">
            <div>
              <h2 id="rec-heading" className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-1">
                Made for this moment
              </h2>
              <p className="text-sm text-muted-foreground/70">
                Based on your <span className="text-foreground" style={{ color: moodConfig.accentColor }}>{moodConfig.label}</span> mood
              </p>
            </div>
            <motion.a
              href="/auth/spotify"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              whileHover={{ x: 4 }}
              style={{ color: moodConfig.accentColor }}
            >
              View on Spotify
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArtistCarousel artists={data.artists} moodConfig={moodConfig} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <ExplanationCard explanation={data.explanation} moodConfig={moodConfig} />
        </motion.div>
      </div>
    </section>
  );
}

function ArtistCarousel({
  artists,
  moodConfig,
}: {
  artists: Array<{ name: string; genre: string; image?: string }>;
  moodConfig: ReturnType<typeof getMoodConfig>;
}) {
  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {artists.map((artist, index) => (
            <motion.article
              key={artist.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex-shrink-0 w-44 sm:w-48"
              whileHover={{ y: -4 }}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/10">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(${moodConfig.accentRgb}, 0.12), rgba(${moodConfig.accentRgb}, 0.02), transparent)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl sm:text-6xl font-bold text-white/5" aria-hidden="true">
                    {artist.name.charAt(0)}
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "/auth/spotify"}
                    className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center"
                    aria-label={`Play ${artist.name} on Spotify`}
                    style={{ borderColor: moodConfig.accentColor, background: `rgba(${moodConfig.accentRgb}, 0.15)` }}
                  >
                    <svg className="h-4.5 w-4.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="mt-3 text-left">
                <h3 className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">{artist.name}</h3>
                <p className="text-xs text-muted-foreground/60 truncate">{artist.genre}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExplanationCard({
  explanation,
  moodConfig,
}: {
  explanation: string;
  moodConfig: ReturnType<typeof getMoodConfig>;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef(false);

  useEffect(() => {
    if (typingRef.current) return;
    typingRef.current = true;
    setIsTyping(true);
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < explanation.length) {
        setDisplayedText(explanation.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        typingRef.current = false;
      }
    }, 12);
    return () => clearInterval(timer);
  }, [explanation]);

  return (
    <motion.div
      className={cn(
        "relative rounded-xl p-5 sm:p-6 bg-white/[0.03] border border-white/10 overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r",
        "before:from-[rgba(167,139,250,0.02)] before:to-transparent"
      )}
      style={{ borderLeftColor: moodConfig.accentColor, borderLeftWidth: 3 }}
    >
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `rgba(${moodConfig.accentRgb}, 0.12)` }}>
            <svg className="h-5 w-5" style={{ color: moodConfig.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">Why this fits</h3>
            <p className="text-xs text-muted-foreground/60">Mood-based match</p>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <motion.p
            className="text-muted-foreground/80 leading-relaxed text-sm"
            style={{ fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'" }}
          >
            {displayedText}
            {isTyping && <span className="inline-block w-1 h-4 ml-0.5 animate-pulse" style={{ background: moodConfig.accentColor }} />}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}