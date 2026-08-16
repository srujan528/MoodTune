import { env } from "@/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createUserSpotifyClient } from "@/lib/spotify/client";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("spotify_refresh_token, spotify_token_expires_at")
    .eq("id", user.id)
    .single();

  if (!profile?.spotify_refresh_token) {
    return NextResponse.json({ error: "No refresh token" }, { status: 400 });
  }

  const expiresAt = new Date(profile.spotify_token_expires_at);
  const now = new Date();

  if (expiresAt > new Date(now.getTime() + 60000)) {
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("spotify_access_token")
      .eq("id", user.id)
      .single();

    return NextResponse.json({ access_token: currentProfile?.spotify_access_token });
  }

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: profile.spotify_refresh_token,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Spotify token refresh error:", errorData);
      return NextResponse.json({ error: "Token refresh failed" }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();

    await supabase
      .from("profiles")
      .update({
        spotify_access_token: tokenData.access_token,
        spotify_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ access_token: tokenData.access_token });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ error: "Token refresh failed" }, { status: 500 });
  }
}