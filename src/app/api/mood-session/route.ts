import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMoodConfig } from "@/config/mood-config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { moodId } = body;

  if (!moodId) {
    return NextResponse.json({ error: "Mood ID required" }, { status: 400 });
  }

  const moodConfig = getMoodConfig(moodId);
  if (!moodConfig) {
    return NextResponse.json({ error: "Invalid mood" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("mood_sessions")
    .insert({
      user_id: session.user.id,
      mood: moodId,
      description: moodConfig.description,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating mood session:", error);
    return NextResponse.json({ error: "Failed to record mood session" }, { status: 500 });
  }

  return NextResponse.json({ session: data });
}