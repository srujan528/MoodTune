import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabase
    .from("saved_tracks")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error unsaving track:", error);
    return NextResponse.json({ error: "Failed to unsave track" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}