export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
    release_date: string;
  };
  preview_url: string | null;
  external_urls: { spotify: string };
  duration_ms: number;
  popularity: number;
  explicit: boolean;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: { spotify: string };
  popularity: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  images: Array<{ url: string; height: number; width: number }>;
  release_date: string;
  total_tracks: number;
  external_urls: { spotify: string };
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface SpotifyRecommendationsResponse {
  tracks: SpotifyTrack[];
  seeds: Array<{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }>;
}

export interface TrackRecommendation {
  trackId: string;
  trackName: string;
  artistName: string;
  albumName: string | null;
  albumImageUrl: string | null;
  previewUrl: string | null;
  spotifyUrl: string;
  explanation: string;
}

export const MOOD_TO_GENRE_MAP: Record<string, string[]> = {
  happy: ["pop", "dance", "funk", "disco", "indie-pop"],
  sad: ["acoustic", "indie-folk", "singer-songwriter", "ambient", "classical"],
  energetic: ["electronic", "edm", "rock", "hip-hop", "workout"],
  relaxed: ["chill", "ambient", "lo-fi", "jazz", "acoustic"],
  focused: ["ambient", "classical", "lo-fi", "post-rock", "instrumental"],
  romantic: ["r&b", "soul", "jazz", "acoustic", "indie-folk"],
  angry: ["metal", "hard-rock", "punk", "hip-hop", "industrial"],
  nostalgic: ["classic-rock", "oldies", "synth-pop", "indie", "folk"],
  anxious: ["ambient", "meditation", "classical", "nature", "lo-fi"],
  confident: ["hip-hop", "pop", "r&b", "electronic", "rock"],
};

export const MOOD_TO_AUDIO_FEATURES: Record<string, Partial<AudioFeatures>> = {
  happy: { valence: 0.8, energy: 0.7, danceability: 0.7 },
  sad: { valence: 0.2, energy: 0.3, acousticness: 0.7 },
  energetic: { energy: 0.9, tempo: 140, danceability: 0.8 },
  relaxed: { energy: 0.3, acousticness: 0.6, instrumentalness: 0.5 },
  focused: { instrumentalness: 0.8, energy: 0.3, acousticness: 0.5 },
  romantic: { valence: 0.6, energy: 0.4, acousticness: 0.5 },
  angry: { energy: 0.9, valence: 0.3, loudness: -5 },
  nostalgic: { valence: 0.5, energy: 0.5, acousticness: 0.4 },
  anxious: { energy: 0.2, instrumentalness: 0.7, acousticness: 0.6 },
  confident: { energy: 0.7, valence: 0.7, danceability: 0.6 },
};

export interface AudioFeatures {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  speechiness: number;
  tempo: number;
  valence: number;
}

export function mapTrackToRecommendation(track: SpotifyTrack, explanation: string): TrackRecommendation {
  return {
    trackId: track.id,
    trackName: track.name,
    artistName: track.artists.map((a) => a.name).join(", "),
    albumName: track.album?.name ?? null,
    albumImageUrl: track.album?.images?.[0]?.url ?? null,
    previewUrl: track.preview_url,
    spotifyUrl: track.external_urls.spotify,
    explanation,
  };
}

export interface PlaybackState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: SpotifyTrack;
  };
}