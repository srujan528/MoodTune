export interface MoodOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "happy",
    label: "Happy",
    description: "Upbeat, feel-good vibes",
    icon: "😊",
    color: "#fbbf24",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: "sad",
    label: "Sad",
    description: "Melancholic, emotional tracks",
    icon: "😢",
    color: "#60a5fa",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    id: "energetic",
    label: "Energetic",
    description: "High-energy, pump-you-up music",
    icon: "⚡",
    color: "#f87171",
    gradient: "from-red-400 to-pink-500",
  },
  {
    id: "relaxed",
    label: "Relaxed",
    description: "Chill, laid-back atmosphere",
    icon: "😌",
    color: "#34d399",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "focused",
    label: "Focused",
    description: "Deep work, concentration music",
    icon: "🎯",
    color: "#a78bfa",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    id: "romantic",
    label: "Romantic",
    description: "Love songs, intimate vibes",
    icon: "❤️",
    color: "#f472b6",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: "nostalgic",
    label: "Nostalgic",
    description: "Throwbacks, memory lane",
    icon: "🕰️",
    color: "#fb923c",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    id: "confident",
    label: "Confident",
    description: "Empowering, boss energy",
    icon: "💪",
    color: "#22d3ee",
    gradient: "from-cyan-400 to-blue-500",
  },
];

export type MoodId = (typeof MOOD_OPTIONS)[number]["id"];

export function getMoodOption(id: string): MoodOption | undefined {
  return MOOD_OPTIONS.find((m) => m.id === id);
}