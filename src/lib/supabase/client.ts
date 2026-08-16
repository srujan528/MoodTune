import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

let browserClient: SupabaseClient | undefined;

export function createClient(): SupabaseClient {
  if (browserClient) return browserClient;

  browserClient = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return browserClient;
}

export function getClient(): SupabaseClient {
  if (!browserClient) {
    return createClient();
  }
  return browserClient;
}