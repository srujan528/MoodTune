import { env } from "@/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createUserSpotifyClient } from "@/lib/spotify/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const supabase = await createServerSupabaseClient();

  if (error) {
    return NextResponse.redirect(new URL("/?error=spotify_auth_denied", request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?error=missing_code_or_state", request.url));
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/?error=not_authenticated", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("spotify_auth_state")
    .eq("id", user.id)
    .single();

  if (!profile || profile.spotify_auth_state !== state) {
    return NextResponse.redirect(new URL("/?error=invalid_state", request.url));
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
        grant_type: "authorization_code",
        code,
        redirect_uri: env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Spotify token error:", errorData);
      return NextResponse.redirect(new URL("/?error=token_exchange_failed", request.url));
    }

    const tokenData = await tokenResponse.json();

    const spotifyClient = createUserSpotifyClient(tokenData.access_token);
    const spotifyUser = await spotifyClient.currentUser.profile();

    await supabase
      .from("profiles")
      .update({
        spotify_id: spotifyUser.id,
        spotify_display_name: spotifyUser.display_name,
        spotify_avatar_url: spotifyUser.images?.[0]?.url ?? null,
        spotify_access_token: tokenData.access_token,
        spotify_refresh_token: tokenData.refresh_token,
        spotify_token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        spotify_auth_state: null,
      })
      .eq("id", user.id);

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Spotify callback error:", error);
    return NextResponse.redirect(new URL("/?error=callback_error", request.url));
  }
}