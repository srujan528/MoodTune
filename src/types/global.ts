export interface Spotify {
  Player: new (options: {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => Promise<void>;
    volume?: number;
  }) => SpotifyPlayer;
}

export interface SpotifyPlayer {
  addListener: (event: string, callback: (...args: any[]) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  getCurrentState: () => Promise<PlaybackState | null>;
}

export interface PlaybackState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: SpotifyTrack;
  };
}

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
  uri: string;
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
  uri: string;
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
  uri: string;
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
  uri: string;
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

// Extend Window interface for Spotify Web Playback SDK
declare global {
  interface Window {
    Spotify: {
      Player: new (options: { name: string; getOAuthToken: (callback: (token: string) => void) => Promise<void>; volume?: number }) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export interface SpotifyPlayer {
  addListener: (event: string, callback: (...args: any[]) => void) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  getCurrentState: () => Promise<PlaybackState | null>;
}

export interface PlaybackState {
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: SpotifyTrack;
  };
}