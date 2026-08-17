import { z } from "zod";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl && !appUrl.includes("127.0.0.1") && !appUrl.includes("localhost")) {
    return appUrl;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return appUrl || "http://localhost:3000";
}

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().optional().default("MoodTune"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional().default("https://zpdtkgdsnxqgguxvqcgi.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(""),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(""),
  SPOTIFY_CLIENT_ID: z.string().optional().default(""),
  SPOTIFY_CLIENT_SECRET: z.string().optional().default(""),
  NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: z.string().optional(),
  AI_PROVIDER: z.enum(["openai", "anthropic", "custom"]).optional().default("openai"),
  AI_API_KEY: z.string().optional().default(""),
  AI_BASE_URL: z.string().optional().default("https://api.openai.com/v1"),
  AI_MODEL: z.string().optional().default("gpt-4o-mini"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().default(""),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().default(""),
});

export type Env = z.infer<typeof envSchema> & {
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: string;
};

const parsed = envSchema.safeParse(process.env);

const appUrl =
  parsed.success && parsed.data.NEXT_PUBLIC_APP_URL
    ? parsed.data.NEXT_PUBLIC_APP_URL
    : getBaseUrl();

const spotifyRedirectUri =
  parsed.success && parsed.data.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
    ? parsed.data.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
    : `${appUrl}/auth/spotify/callback`;

const env: Env = {
  NEXT_PUBLIC_APP_URL: appUrl,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "MoodTune",
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zpdtkgdsnxqgguxvqcgi.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || "",
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || "",
  NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: spotifyRedirectUri,
  AI_PROVIDER: (process.env.AI_PROVIDER as any) || "openai",
  AI_API_KEY: process.env.AI_API_KEY || "",
  AI_BASE_URL: process.env.AI_BASE_URL || "https://api.openai.com/v1",
  AI_MODEL: process.env.AI_MODEL || "gpt-4o-mini",
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
};

export { env };