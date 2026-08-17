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
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/auth/spotify/callback`;
  }

  const origin = request.nextUrl.origin;
  if (origin && !origin.includes("127.0.0.1") && !origin.includes("localhost")) {
    return `${origin}/auth/spotify/callback`;
  }

  return "http://localhost:3000/auth/spotify/callback";
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

  return NextResponse.redirect(url);
}