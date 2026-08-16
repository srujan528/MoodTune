import { createClient } from "@/lib/supabase/client";
import type { Profile, NewProfile, MoodSession, NewMoodSession, SavedTrack, NewSavedTrack, Preference, NewPreference } from "@/lib/supabase/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
}

export async function createProfile(profile: NewProfile): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .insert(profile)
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    return null;
  }
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }
  return data;
}

export async function getMoodSessions(userId: string, limit = 20): Promise<MoodSession[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("mood_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching mood sessions:", error);
    return [];
  }
  return data || [];
}

export async function createMoodSession(session: NewMoodSession): Promise<MoodSession | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("mood_sessions")
    .insert(session)
    .select()
    .single();

  if (error) {
    console.error("Error creating mood session:", error);
    return null;
  }
  return data;
}

export async function getSavedTracks(userId: string): Promise<SavedTrack[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_tracks")
    .select("*")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved tracks:", error);
    return [];
  }
  return data || [];
}

export async function saveTrack(track: NewSavedTrack): Promise<SavedTrack | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_tracks")
    .insert(track)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "Track already saved" } as any;
    }
    console.error("Error saving track:", error);
    return null;
  }
  return data;
}

export async function unsaveTrack(userId: string, spotifyTrackId: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("saved_tracks")
    .delete()
    .eq("user_id", userId)
    .eq("spotify_track_id", spotifyTrackId);

  if (error) {
    console.error("Error unsaving track:", error);
    return false;
  }
  return true;
}

export async function isTrackSaved(userId: string, spotifyTrackId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_tracks")
    .select("id")
    .eq("user_id", userId)
    .eq("spotify_track_id", spotifyTrackId)
    .single();

  if (error) {
    return false;
  }
  return !!data;
}

export async function getPreferences(userId: string): Promise<Preference | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching preferences:", error);
    return null;
  }
  return data;
}

export async function upsertPreferences(preference: NewPreference): Promise<Preference | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("preferences")
    .upsert(preference, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting preferences:", error);
    return null;
  }
  return data;
}