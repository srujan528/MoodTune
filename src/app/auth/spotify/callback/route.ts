import { env } from "@/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createUserSpotifyClient } from "@/lib/spotify/client";
import { NextRequest, NextResponse } from "next/server";

function getRedirectUri(request: NextRequest): string {
  const envUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  if (
    envUri &&
    !envUri.includes("127.0.0.1") &&
    !envUri.includes("localhost") &&
    envUri.startsWith("http")
  ) {
    return envUri;
  }

  let host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (host && host.includes(",")) {
    host = host.split(",")[0].trim();
  }

  const proto = request.headers.get("x-forwarded-proto") || (host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https");

  if (host && !host.includes("127.0.0.1") && !host.includes("localhost")) {
    return `${proto}://${host}/auth/spotify/callback`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/auth/spotify/callback`;
  }

  return "https://song-recommender-seven.vercel.app/auth/spotify/callback";
}

function getOrigin(request: NextRequest): string {
  let host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (host && host.includes(",")) {
    host = host.split(",")[0].trim();
  }

  const proto = request.headers.get("x-forwarded-proto") || (host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https");

  if (host && !host.includes("127.0.0.1") && !host.includes("localhost")) {
    return `${proto}://${host}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "https://song-recommender-seven.vercel.app";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const stateCookie = request.cookies.get("spotify_auth_state")?.value;
  const origin = getOrigin(request);
  const redirectUri = getRedirectUri(request);

  const supabase = await createServerSupabaseClient();

  if (error) {
    return NextResponse.redirect(new URL("/dashboard?error=spotify_auth_denied", origin));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/dashboard?error=missing_code_or_state", origin));
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("spotify_auth_state")
      .eq("id", user.id)
      .single();

    if (profile?.spotify_auth_state && profile.spotify_auth_state !== state) {
      if (stateCookie && stateCookie !== state) {
        return NextResponse.redirect(new URL("/dashboard?error=invalid_state", origin));
      }
    }
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
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Spotify token error:", errorData);
      return NextResponse.redirect(new URL("/dashboard?error=token_exchange_failed", origin));
    }

    const tokenData = await tokenResponse.json();

    const spotifyClient = createUserSpotifyClient(tokenData.access_token);
    const spotifyUser = await spotifyClient.currentUser.profile();

    if (user) {
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
    }

    const response = NextResponse.redirect(new URL("/dashboard", origin));
    response.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: tokenData.expires_in,
    });
    return response;
  } catch (error) {
    console.error("Spotify callback error:", error);
    return NextResponse.redirect(new URL("/dashboard?error=callback_error", origin));
  }
}