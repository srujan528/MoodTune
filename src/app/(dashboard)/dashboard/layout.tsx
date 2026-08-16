import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}