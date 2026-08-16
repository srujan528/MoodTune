import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().optional().default("http://127.0.0.1:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().optional().default("MoodTune"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default("https://zpdtkgdsnxqgguxvqcgi.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  SPOTIFY_CLIENT_ID: z.string().optional().default(""),
  SPOTIFY_CLIENT_SECRET: z.string().optional().default(""),
  NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: z.string().optional().default("http://127.0.0.1:3000/auth/spotify/callback"),
  AI_PROVIDER: z.enum(["openai", "anthropic", "custom"]).optional().default("openai"),
  AI_API_KEY: z.string().optional().default(""),
  AI_BASE_URL: z.string().optional().default("https://api.openai.com/v1"),
  AI_MODEL: z.string().optional().default("gpt-4o-mini"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().default(""),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().default(""),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

const env: Env = parsed.success
  ? parsed.data
  : {
      NEXT_PUBLIC_APP_URL:
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://127.0.0.1:3000"),
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "MoodTune",
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zpdtkgdsnxqgguxvqcgi.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || "",
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || "",
      NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/auth/spotify/callback",
      AI_PROVIDER: (process.env.AI_PROVIDER as any) || "openai",
      AI_API_KEY: process.env.AI_API_KEY || "",
      AI_BASE_URL: process.env.AI_BASE_URL || "https://api.openai.com/v1",
      AI_MODEL: process.env.AI_MODEL || "gpt-4o-mini",
      NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
      NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
    };

export { env };