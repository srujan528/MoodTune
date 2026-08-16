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
    const recommendations = await getMoodBasedRecommendations(accessToken, moodId, moodConfig, 30);

    const tracks = recommendations.map((rec: any) => ({
      id: rec.track.id,
      name: rec.track.name,
      artist: rec.track.artists ? rec.track.artists.map((a: any) => a.name).join(", ") : (rec.track.artist || "Unknown Artist"),
      album: rec.track.album?.name || rec.track.album || null,
      albumImageUrl: rec.track.album?.images?.[0]?.url || rec.track.albumImageUrl || null,
      previewUrl: rec.track.preview_url || rec.track.previewUrl || null,
      spotifyUrl: rec.track.external_urls?.spotify || rec.track.spotifyUrl || `https://open.spotify.com/track/${rec.track.id}`,
      duration: rec.track.duration_ms || rec.track.duration || 180000,
      uri: rec.track.uri || `spotify:track:${rec.track.id}`,
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error getting playlist:", error);
    return NextResponse.json({ error: "Failed to get playlist" }, { status: 500 });
  }
}