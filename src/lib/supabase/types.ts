export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          spotify_id: string | null;
          spotify_display_name: string | null;
          spotify_avatar_url: string | null;
          spotify_access_token: string | null;
          spotify_refresh_token: string | null;
          spotify_token_expires_at: string | null;
          spotify_auth_state: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          spotify_id?: string | null;
          spotify_display_name?: string | null;
          spotify_avatar_url?: string | null;
          spotify_access_token?: string | null;
          spotify_refresh_token?: string | null;
          spotify_token_expires_at?: string | null;
          spotify_auth_state?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          spotify_id?: string | null;
          spotify_display_name?: string | null;
          spotify_avatar_url?: string | null;
          spotify_access_token?: string | null;
          spotify_refresh_token?: string | null;
          spotify_token_expires_at?: string | null;
          spotify_auth_state?: string | null;
        };
      };
      mood_sessions: {
        Row: {
          id: string;
          user_id: string;
          mood: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          mood: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          mood?: string;
          description?: string | null;
        };
      };
      saved_tracks: {
        Row: {
          id: string;
          user_id: string;
          spotify_track_id: string;
          track_name: string;
          artist_name: string;
          album_name: string | null;
          album_image_url: string | null;
          preview_url: string | null;
          spotify_url: string;
          mood: string;
          saved_at: string;
        };
        Insert: {
          user_id: string;
          spotify_track_id: string;
          track_name: string;
          artist_name: string;
          album_name?: string | null;
          album_image_url?: string | null;
          preview_url?: string | null;
          spotify_url: string;
          mood: string;
        };
        Update: {
          id?: string;
          track_name?: string;
          artist_name?: string;
          album_name?: string | null;
          album_image_url?: string | null;
          preview_url?: string | null;
          spotify_url?: string;
          mood?: string;
        };
      };
      preferences: {
        Row: {
          id: string;
          user_id: string;
          preferred_genres: string[] | null;
          explicit_content: boolean;
          default_mood: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          preferred_genres?: string[] | null;
          explicit_content?: boolean;
          default_mood?: string | null;
        };
        Update: {
          id?: string;
          preferred_genres?: string[] | null;
          explicit_content?: boolean;
          default_mood?: string | null;
        };
      };
      recommendations: {
        Row: {
          id: string;
          user_id: string;
          mood_entry_id: string;
          track_id: string;
          track_name: string;
          artist_name: string;
          album_name: string | null;
          album_image_url: string | null;
          preview_url: string | null;
          spotify_url: string;
          explanation: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          mood_entry_id: string;
          track_id: string;
          track_name: string;
          artist_name: string;
          album_name: string | null;
          album_image_url: string | null;
          preview_url: string | null;
          spotify_url: string;
          explanation: string;
        };
        Update: {
          id?: string;
          track_name?: string;
          artist_name?: string;
          album_name?: string | null;
          album_image_url?: string | null;
          preview_url?: string | null;
          spotify_url?: string;
          explanation?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type MoodSession = Database["public"]["Tables"]["mood_sessions"]["Row"];
export type SavedTrack = Database["public"]["Tables"]["saved_tracks"]["Row"];
export type Preference = Database["public"]["Tables"]["preferences"]["Row"];
export type Recommendation = Database["public"]["Tables"]["recommendations"]["Row"];

export type NewProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type NewMoodSession = Database["public"]["Tables"]["mood_sessions"]["Insert"];
export type NewSavedTrack = Database["public"]["Tables"]["saved_tracks"]["Insert"];
export type NewPreference = Database["public"]["Tables"]["preferences"]["Insert"];
export type NewRecommendation = Database["public"]["Tables"]["recommendations"]["Insert"];