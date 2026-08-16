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

  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.SPOTIFY_CLIENT_ID,
    scope: SCOPES,
    redirect_uri: env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    state,
    show_dialog: "true",
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(url);
}