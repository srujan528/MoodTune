"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface Artist {
  name: string;
  image?: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const MOOD_DATA: Record<string, { mood: string; artists: Artist[]; tracks: Track[]; explanation: string }> = {
  "late-night": {
    mood: "Late Night",
    artists: [
      { name: "Joji" },
      { name: "The Weeknd" },
      { name: "Cigarettes After Sex" },
      { name: "LANY" },
      { name: "Honne" },
      { name: "Daniel Caesar" },
    ],
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
    explanation: "Late Night mood calls for intimate, atmospheric tracks with slower tempos (70-90 BPM), minor keys, and emotional lyrical themes. Joji's lo-fi production style creates the perfect intimate atmosphere, while The Weeknd's falsetto adds emotional depth. Cigarettes After Sex brings dreamy ambient textures, and LANY provides synth-pop melancholy. These artists share low valence (0.2-0.4), low energy (0.3-0.5), and high acousticness — the sonic signature of late-night introspection.",
  },
  happy: {
    mood: "Happy",
    artists: [
      { name: "Dua Lipa" },
      { name: "Harry Styles" },
      { name: "Lizzo" },
      { name: "The 1975" },
      { name: "Rex Orange County" },
      { name: "COIN" },
    ],
    tracks: [
      { id: "1", title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
      { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47" },
      { id: "3", title: "About Damn Time", artist: "Lizzo", duration: "3:10" },
      { id: "4", title: "Happiness", artist: "The 1975", duration: "3:32" },
      { id: "5", title: "Sunflower", artist: "Rex Orange County", duration: "3:15" },
      { id: "6", title: "Talk Too Much", artist: "COIN", duration: "3:28" },
    ],
    explanation: "Happy mood triggers high valence (0.7-0.9), high energy (0.6-0.8), and danceable tracks. Dua Lipa's disco-pop production, Harry Styles' modern pop-rock, and Lizzo's empowering anthems all share major keys, 110-130 BPM tempos, and uplifting lyrical themes — the sonic signature of pure joy.",
  },
  relaxed: {
    mood: "Relaxed",
    artists: [
      { name: "Khruangbin" },
      { name: "Men I Trust" },
      { name: "Tame Impala" },
      { name: "Mac DeMarco" },
      { name: "Alvvays" },
      { name: "Beach House" },
    ],
    tracks: [
      { id: "1", title: "Time (You and I)", artist: "Khruangbin", duration: "3:57" },
      { id: "2", title: "Show Me How", artist: "Men I Trust", duration: "3:24" },
      { id: "3", title: "The Less I Know The Better", artist: "Tame Impala", duration: "3:36" },
      { id: "4", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:48" },
      { id: "5", title: "Archie, Marry Me", artist: "Alvvays", duration: "3:17" },
      { id: "6", title: "Space Song", artist: "Beach House", duration: "5:21" },
    ],
    explanation: "Relaxed mood maps to low energy (0.2-0.4), moderate valence (0.4-0.6), and high acousticness. Khruangbin's Thai-funk grooves, Men I Trust's dreamy indie pop, and Tame Impala's psychedelic textures share slow tempos (70-90 BPM), gentle dynamics, and warm analog textures — perfect for unwinding.",
  },
  workout: {
    mood: "Workout",
    artists: [
      { name: "Eminem" },
      { name: "Kanye West" },
      { name: "Drake" },
      { name: "Travis Scott" },
      { name: "The Prodigy" },
      { name: "Rage Against the Machine" },
    ],
    tracks: [
      { id: "1", title: "Lose Yourself", artist: "Eminem", duration: "5:26" },
      { id: "2", title: "Power", artist: "Kanye West", duration: "3:41" },
      { id: "3", title: "God's Plan", artist: "Drake", duration: "3:19" },
      { id: "4", title: "SICKO MODE", artist: "Travis Scott", duration: "5:12" },
      { id: "5", title: "Smack My Bitch Up", artist: "The Prodigy", duration: "5:39" },
      { id: "6", title: "Killing in the Name", artist: "Rage Against the Machine", duration: "5:14" },
    ],
    explanation: "Workout mood demands maximum energy (0.8-1.0), high tempo (130-160 BPM), and aggressive dynamics. Eminem's rapid-fire delivery, Kanye's anthemic production, and Travis Scott's trap energy all share driving rhythms, distorted bass, and motivational lyrical themes — engineered for peak performance.",
  },
  heartbroken: {
    mood: "Heartbroken",
    artists: [
      { name: "Adele" },
      { name: "Sam Smith" },
      { name: "Billie Eilish" },
      { name: "Olivia Rodrigo" },
      { name: "Lewis Capaldi" },
      { name: "SZA" },
    ],
    tracks: [
      { id: "1", title: "Someone Like You", artist: "Adele", duration: "4:45" },
      { id: "2", title: "Too Good at Goodbyes", artist: "Sam Smith", duration: "3:21" },
      { id: "4", title: "drivers license", artist: "Olivia Rodrigo", duration: "4:02" },
      { id: "3", title: "When the Party's Over", artist: "Billie Eilish", duration: "3:16" },
      { id: "5", title: "Someone You Loved", artist: "Lewis Capaldi", duration: "3:02" },
      { id: "6", title: "Good Days", artist: "SZA", duration: "4:39" },
    ],
    explanation: "Heartbroken mood targets very low valence (0.1-0.3), low energy (0.2-0.4), and high acousticness. Adele's raw vocals, Sam Smith's piano ballads, and Olivia Rodrigo's confessional songwriting all share minor keys, sparse arrangements, and lyrical vulnerability — the sound of emotional catharsis.",
  },
};

const moodOptions = [
  { id: "happy", label: "Happy", icon: "😊", gradient: "from-yellow-400 via-orange-500 to-red-500" },
  { id: "relaxed", label: "Relaxed", icon: "😌", gradient: "from-emerald-400 via-teal-500 to-cyan-500" },
  { id: "heartbroken", label: "Heartbroken", icon: "💔", gradient: "from-rose-400 via-pink-500 to-fuchsia-500" },
  { id: "late-night", label: "Late Night", icon: "🌙", gradient: "from-indigo-500 via-purple-600 to-purple-800" },
  { id: "workout", label: "Workout", icon: "🔥", gradient: "from-red-400 via-red-600 to-red-800" },
];

export function InteractiveDemo() {
  const [selectedMood, setSelectedMood] = useState("late-night");
  const [isTyping, setIsTyping] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);
  const [displayedExplanation, setDisplayedExplanation] = useState("");
  const typingRef = useRef(false);

  const data = MOOD_DATA[selectedMood];
  const explanationText = data?.explanation || "";

  useEffect(() => {
    if (typingRef.current) return;
    typingRef.current = true;
    setIsTyping(true);
    setDisplayedExplanation("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < explanationText.length) {
        setDisplayedExplanation(explanationText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        typingRef.current = false;
      }
    }, 8);
    return () => clearInterval(timer);
  }, [selectedMood, explanationText, setIsTyping]);

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" aria-labelledby="demo-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          style={{ animation: "float 10s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h2 id="demo-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Try It Live
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Select a mood below to see real-time AI recommendations change instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-24 space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Select Mood</h3>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Mood selection">
                  {moodOptions.map((mood) => (
                    <motion.button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                        selectedMood === mood.id
                          ? "text-white shadow-lg"
                          : "text-muted-foreground bg-white/5 border border-white/10 hover:bg-white/10 hover:text-foreground"
                      )}
                      style={{
                        background: selectedMood === mood.id
                          ? `linear-gradient(135deg, ${mood.gradient.replace("from-", "").replace("via-", "").replace("to-", "")})`
                          : undefined,
                      }}
                      aria-pressed={selectedMood === mood.id}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg" aria-hidden="true">{mood.icon}</span>
                        {mood.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Artists</h3>
                <div className="flex flex-wrap gap-2">
                  {data?.artists.map((artist, i) => (
                    <motion.span
                      key={artist.name}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-foreground hover:bg-white/10 hover:border-primary/30 transition-all duration-200"
                    >
                      {artist.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                  <motion.svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </motion.svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mood: {data?.mood}</h3>
                  <p className="text-sm text-muted-foreground">AI Explanation</p>
                </div>
              </div>
              <motion.div
                ref={explanationRef}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed text-sm"
              >
                {displayedExplanation}
                {isTyping && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Your {data?.mood} Mix</h3>
                <span className="text-sm text-muted-foreground">{data?.tracks.length} tracks</span>
              </div>
              <div className="divide-y divide-white/10">
                {data?.tracks.map((track, i) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.3 }}
                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-lg flex-shrink-0 bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                      </div>
                      <svg className="h-6 w-6 text-primary/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{track.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-mono tabular-nums w-16 text-right">{track.duration}</span>
                      <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors" aria-label="Add to favorites">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}