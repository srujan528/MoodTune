import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("saved_tracks")
    .select("*")
    .eq("user_id", session.user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved tracks:", error);
    return NextResponse.json({ error: "Failed to fetch saved tracks" }, { status: 500 });
  }

  return NextResponse.json({ tracks: data || [] });
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { track } = body;

  if (!track || !track.id) {
    return NextResponse.json({ error: "Track data required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("saved_tracks")
    .insert({
      user_id: session.user.id,
      spotify_track_id: track.id,
      track_name: track.name,
      artist_name: track.artist,
      album_name: track.album,
      album_image_url: track.albumImageUrl,
      preview_url: track.previewUrl,
      spotify_url: track.spotifyUrl,
      mood: track.mood,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Track already saved" }, { status: 400 });
    }
    console.error("Error saving track:", error);
    return NextResponse.json({ error: "Failed to save track" }, { status: 500 });
  }

  return NextResponse.json({ track: data });
}