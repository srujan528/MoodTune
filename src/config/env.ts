import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: z.string().url(),
  AI_PROVIDER: z.enum(["openai", "anthropic", "custom"]).default("openai"),
  AI_API_KEY: z.string().min(1),
  AI_BASE_URL: z.string().url().default("https://api.openai.com/v1"),
  AI_MODEL: z.string().min(1).default("gpt-4o-mini"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().refine((val) => val === "" || z.string().url().safeParse(val).success, {
    message: "Must be a valid URL or empty",
  }),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const missing = error.issues.map((e) => e.path.join(".")).join(", ");
    throw new Error(`Invalid environment variables: ${missing}`);
  }
  throw error;
}

export { env };