import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from("profiles")
      .update({
        spotify_id: null,
        spotify_display_name: null,
        spotify_avatar_url: null,
        spotify_access_token: null,
        spotify_refresh_token: null,
        spotify_token_expires_at: null,
        spotify_auth_state: null,
      })
      .eq("id", user.id);
  }

  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}