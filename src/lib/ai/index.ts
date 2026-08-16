import { env } from "@/config/env";
import type { SpotifyTrack } from "@/lib/spotify/types";
import { getMoodConfig } from "@/config/mood-config";

export interface AIRecommendation {
  spotifyId: string;
  reason: string;
  matchFactors: string[];
}

export interface AIRecommendationResponse {
  mood: string;
  summary: string;
  recommendations: AIRecommendation[];
}

const SYSTEM_PROMPT = `You are a music recommendation expert for MoodTune. Your job is to analyze Spotify tracks and explain why they fit a user's selected mood.

Given a mood configuration and a list of Spotify tracks, provide:
1. A brief summary of why this mood matches these types of tracks
2. For each track, a brief reason why it fits the mood and 2-3 match factors

Be honest and specific. Use only information from the track metadata (artist, genre, tempo, energy, valence, etc.). Do not invent facts about lyrics or production that you cannot verify from the provided data.

Return valid JSON only.`;

export async function getAIRecommendations(
  moodId: string,
  tracks: any[],
  accessToken: string
): Promise<AIRecommendationResponse | null> {
  const moodConfig = getMoodConfig(moodId);

  if (!moodConfig) {
    console.error("Invalid mood ID:", moodId);
    return null;
  }

  try {
    const trackData = tracks.slice(0, 10).map((track, index) => ({
      index,
      spotifyId: track.id,
      name: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album?.name,
      duration_ms: track.duration_ms,
      popularity: track.popularity,
      explicit: track.explicit,
      preview_url: track.preview_url,
    }));

    const userPrompt = `Mood: ${moodConfig.label} - ${moodConfig.description}

Tracks to analyze:
${JSON.stringify(trackData, null, 2)}

Provide recommendations in this JSON format:
{
  "mood": "${moodConfig.id}",
  "summary": "Brief summary of why these tracks fit the mood",
  "recommendations": [
    {
      "spotifyId": "track_id",
      "reason": "Why this specific track fits the mood",
      "matchFactors": ["factor1", "factor2", "factor3"]
    }
  ]}`;

    const response = await fetch(`${env.AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.AI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return null;
    }

    const parsed = JSON.parse(content);
    return parsed as AIRecommendationResponse;
  } catch (error) {
    console.error("AI recommendation error:", error);
    return null;
  }
}

export function getFallbackRecommendations(moodId: string, tracks: any[]): any {
  const moodConfig = getMoodConfig(moodId);
  if (!moodConfig) return { mood: moodId, summary: "", recommendations: [] };

  const explanations: Record<string, string> = {
    "just-vibing": "These tracks share warm production, relaxed tempos, and melodies that feel effortless — music that fits a good mood without demanding attention.",
    "need-pick-me-up": "Upbeat tempos, major keys, and bright production — these tracks share the energy and lift that can shift a heavy moment.",
    "something-mellow": "Low energy, gentle dynamics, warm textures — these tracks share slow tempos (70-90 BPM), soft production, and a sense of ease.",
    "in-my-feelings": "Minor keys, sparse arrangements, raw vocal delivery — these tracks capture the sound of sitting with difficult emotions.",
    "late-night-drive": "Slower tempos, minor keys, atmospheric production — these tracks create the intimate, reflective space that late nights call for.",
    "locked-in": "Steady tempos, minimal vocals, repetitive structures — music that supports sustained attention without pulling focus.",
    "getting-things-done": "Consistent rhythm, instrumental focus, predictable progressions — music designed to fade into the background while you work.",
    "need-some-energy": "High tempo (130-160 BPM), driving rhythms, aggressive dynamics — music built for forward momentum and intensity.",
    "slow-sunday": "Very slow tempos (<70 BPM), minimal percussion, sustained tones — music that encourages physiological slowing and rest.",
    "feeling-good": "High danceability, strong grooves, infectious hooks — music made for movement and shared energy.",
  };

  const matchFactors: Record<string, string[]> = {
    "just-vibing": ["warm production", "relaxed tempo", "feel-good melody"],
    "need-pick-me-up": ["upbeat tempo", "major key", "bright production"],
    "something-mellow": ["low energy", "gentle dynamics", "warm textures"],
    "in-my-feelings": ["minor key", "sparse arrangement", "raw vocal delivery"],
    "late-night-drive": ["slower tempo", "minor key", "atmospheric production"],
    "locked-in": ["steady tempo", "minimal vocals", "repetitive structure"],
    "getting-things-done": ["consistent rhythm", "instrumental focus", "predictable progression"],
    "need-some-energy": ["high tempo", "driving rhythm", "aggressive dynamics"],
    "slow-sunday": ["very slow tempo", "minimal percussion", "sustained tones"],
    "feeling-good": ["high danceability", "strong groove", "infectious hook"],
  };

  return {
    mood: moodId,
    summary: explanations[moodId] || "These tracks match the mood.",
    recommendations: tracks.slice(0, 10).map((track: any, index: number) => ({
      spotifyId: track.id,
      reason: `This track by ${track.artists[0]?.name} matches the ${moodConfig.label} vibe with its ${track.artists[0]?.name} sound and production.`,
      matchFactors: matchFactors[moodId] || ["mood match", "energy level", "vibe alignment"],
    })),
  };
}