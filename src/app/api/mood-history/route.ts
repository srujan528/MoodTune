import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("mood_sessions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching mood history:", error);
    return NextResponse.json({ error: "Failed to fetch mood history" }, { status: 500 });
  }

  return NextResponse.json({ history: data || [] });
}