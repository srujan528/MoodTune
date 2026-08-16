import { env } from "@/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAIRecommendations, getFallbackRecommendations } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { moodId, tracks } = body;

  if (!moodId || !tracks || !Array.isArray(tracks)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("spotify_access_token")
    .eq("id", session.user.id)
    .single();

  if (!profile?.spotify_access_token) {
    return NextResponse.json({ error: "Spotify not connected" }, { status: 400 });
  }

  try {
    const result = await getAIRecommendations(moodId, tracks, profile.spotify_access_token);

    if (result) {
      return NextResponse.json(result);
    }

    // Fallback if AI fails
    const fallback = getFallbackRecommendations(moodId, tracks);
    return NextResponse.json(fallback);
  } catch (error) {
    console.error("AI explanation error:", error);
    const fallback = getFallbackRecommendations(moodId, tracks);
    return NextResponse.json(fallback);
  }
}