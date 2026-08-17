import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const cookieStore = await cookies();

  const { data: { session } } = await supabase.auth.getSession();
  const spotifyAccessToken = cookieStore.get("spotify_access_token")?.value;

  if (session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    return NextResponse.json({
      id: session.user.id,
      email: session.user.email,
      ...profile,
      spotify_access_token: profile?.spotify_access_token || spotifyAccessToken,
    });
  }

  if (spotifyAccessToken) {
    try {
      const spotifyRes = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      });
      if (spotifyRes.ok) {
        const spotifyUser = await spotifyRes.json();
        return NextResponse.json({
          id: spotifyUser.id,
          spotify_id: spotifyUser.id,
          spotify_display_name: spotifyUser.display_name,
          spotify_avatar_url: spotifyUser.images?.[0]?.url ?? null,
          spotify_access_token: spotifyAccessToken,
        });
      }
    } catch (err) {
      console.error("Error fetching Spotify user profile:", err);
    }
  }

  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}