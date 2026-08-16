import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("preferences")
    .select("*")
    .eq("user_id", session.user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ preferences: null });
    }
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
  }

  return NextResponse.json({ preferences: data });
}

export async function PUT(request: Request) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { preferred_genres, explicit_content, default_mood } = body;

  const { data, error } = await supabase
    .from("preferences")
    .upsert({
      user_id: session.user.id,
      preferred_genres,
      explicit_content,
      default_mood,
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting preferences:", error);
    return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 });
  }

  return NextResponse.json({ preferences: data });
}