-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Spotify fields
  spotify_id TEXT UNIQUE,
  spotify_display_name TEXT,
  spotify_avatar_url TEXT,
  spotify_access_token TEXT,
  spotify_refresh_token TEXT,
  spotify_token_expires_at TIMESTAMPTZ,
  spotify_auth_state TEXT
);

-- Mood sessions table
CREATE TABLE IF NOT EXISTS public.mood_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved tracks table
CREATE TABLE IF NOT EXISTS public.saved_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  spotify_track_id TEXT NOT NULL,
  track_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  album_name TEXT,
  album_image_url TEXT,
  preview_url TEXT,
  spotify_url TEXT NOT NULL,
  mood TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, spotify_track_id)
);

-- Preferences table
CREATE TABLE IF NOT EXISTS public.preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  preferred_genres TEXT[],
  explicit_content BOOLEAN DEFAULT FALSE,
  default_mood TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommendations table (existing)
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mood_entry_id UUID NOT NULL REFERENCES public.mood_sessions(id) ON DELETE CASCADE,
  track_id TEXT NOT NULL,
  track_name TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  album_name TEXT,
  album_image_url TEXT,
  preview_url TEXT,
  spotify_url TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Mood sessions policies
CREATE POLICY "Users can view own mood sessions" ON public.mood_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood sessions" ON public.mood_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved tracks policies
CREATE POLICY "Users can view own saved tracks" ON public.saved_tracks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved tracks" ON public.saved_tracks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved tracks" ON public.saved_tracks
  FOR DELETE USING (auth.uid() = user_id);

-- Preferences policies
CREATE POLICY "Users can view own preferences" ON public.preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own preferences" ON public.preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Users can view own recommendations" ON public.recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recommendations" ON public.recommendations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_mood_sessions_user_id ON public.mood_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_sessions_created_at ON public.mood_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_tracks_user_id ON public.saved_tracks(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_tracks_spotify_track_id ON public.saved_tracks(spotify_track_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_mood_entry_id ON public.recommendations(mood_entry_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to profiles and preferences
DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_preferences_updated_at ON public.preferences;
CREATE TRIGGER handle_preferences_updated_at
  BEFORE UPDATE ON public.preferences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();