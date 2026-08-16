import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMoodConfig } from "@/config/mood-config";
import { getMoodBasedRecommendations } from "@/lib/spotify/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const moodId = searchParams.get("mood");

  if (!moodId) {
    return NextResponse.json({ error: "Mood ID required" }, { status: 400 });
  }

  const moodConfig = getMoodConfig(moodId);
  if (!moodConfig) {
    return NextResponse.json({ error: "Invalid mood" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  let accessToken: string | null = null;
  if (session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("spotify_access_token")
      .eq("id", session.user.id)
      .single();
    accessToken = profile?.spotify_access_token || null;
  }

  try {
    const recommendations = await getMoodBasedRecommendations(accessToken, moodId, moodConfig, 20);
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 });
  }
}