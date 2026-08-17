import { env } from "@/config/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
].join(" ");

function getRedirectUri(request: NextRequest): string {
  if (
    process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI &&
    !process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI.includes("127.0.0.1") &&
    !process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI.includes("localhost")
  ) {
    return process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  }
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || (host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https");
  const origin = host ? `${proto}://${host}` : request.nextUrl.origin;
  return `${origin}/auth/spotify/callback`;
}

export async function GET(request: NextRequest) {
  const state = crypto.randomUUID();
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { error } = await supabase
      .from("profiles")
      .update({ spotify_auth_state: state })
      .eq("id", user.id);
    if (error) {
      console.error("Failed to save Spotify auth state:", error);
    }
  }

  const redirectUri = getRedirectUri(request);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.SPOTIFY_CLIENT_ID,
    scope: SCOPES,
    redirect_uri: redirectUri,
    state,
    show_dialog: "true",
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("spotify_auth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}