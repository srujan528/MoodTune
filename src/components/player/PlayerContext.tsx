"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { SpotifyPlayer, PlaybackState } from "@/types/global";

interface Track {
  id: string;
  name: string;
  artist: string;
  album?: string;
  albumImageUrl?: string;
  previewUrl?: string;
  spotifyUrl?: string;
  duration?: number;
  uri?: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  deviceId: string | null;
  playerReady: boolean;
  initializationError: string | null;
  requiresPremium: boolean;
  engine: "spotify" | "html5" | "none";
}

interface PlayerContextType extends PlayerState {
  playTrack: (track: any) => Promise<void>;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (position: number) => void;
  setVolume: (volume: number) => void;
  setDeviceId: (deviceId: string) => void;
  clearTrack: () => void;
  clearError: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 0.7,
    deviceId: null,
    // Always ready — the HTML5 fallback engine doesn't need initialization
    playerReady: true,
    initializationError: null,
    requiresPremium: false,
    engine: "none",
  });

  const playerRef = useRef<SpotifyPlayer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackQueueRef = useRef<any[]>([]);
  const currentTrackIndexRef = useRef<number>(-1);
  const isPlayingRef = useRef(false);
  const spotifyReadyRef = useRef(false);
  const updateProgressRef = useRef<() => void>(undefined);

  // ───────────────────────────────────────────────
  //  HTML5 Audio Fallback Engine
  // ───────────────────────────────────────────────
  const getOrCreateAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = state.volume;

      audioRef.current.addEventListener("ended", () => {
        setState((prev) => ({ ...prev, isPlaying: false, progress: prev.duration }));
        isPlayingRef.current = false;
        if (intervalRef.current) clearInterval(intervalRef.current);
      });

      audioRef.current.addEventListener("error", (e) => {
        console.warn("[PlayerContext] HTML5 Audio error:", e);
        setState((prev) => ({ ...prev, isPlaying: false }));
        isPlayingRef.current = false;
      });
    }
    return audioRef.current;
  }, []);

  // ───────────────────────────────────────────────
  //  Spotify progress updater
  // ───────────────────────────────────────────────
  const updateProgress = () => {
    if (playerRef.current && isPlayingRef.current) {
      playerRef.current.getCurrentState().then((playbackState: PlaybackState | null) => {
        if (playbackState) {
          setState((prev) => ({
            ...prev,
            progress: playbackState.position,
            duration: playbackState.duration,
            isPlaying: !playbackState.paused,
          }));
          isPlayingRef.current = !playbackState.paused;
        }
      });
    }
  };

  updateProgressRef.current = updateProgress;

  // ───────────────────────────────────────────────
  //  HTML5 progress updater
  // ───────────────────────────────────────────────
  const startHtml5ProgressInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        setState((prev) => ({
          ...prev,
          progress: audio.currentTime * 1000,
          duration: (audio.duration || 0) * 1000,
        }));
      }
    }, 250);
  }, []);

  // ───────────────────────────────────────────────
  //  Initialize Spotify Web Playback SDK (best-effort)
  // ───────────────────────────────────────────────
  useEffect(() => {
    console.log("[PlayerContext] Initializing Spotify Web Playback SDK");

    const setupSpotifyPlayer = () => {
      if (!window.Spotify || playerRef.current) return;

      console.log("[PlayerContext] Spotify Web Playback SDK ready, creating player");
      const player = new window.Spotify.Player({
        name: "MoodTune Player",
        getOAuthToken: async (callback: (token: string) => void) => {
          console.log("[PlayerContext] getOAuthToken called");
          try {
            const res = await fetch("/api/auth/spotify/refresh", { method: "POST" });
            console.log("[PlayerContext] Token refresh response status:", res.status);
            if (res.ok) {
              const data = await res.json();
              console.log("[PlayerContext] Got access token, length:", data.access_token?.length);
              callback(data.access_token);
            } else {
              const error = await res.json();
              console.warn("[PlayerContext] Spotify refresh token not available:", error);
            }
          } catch (error) {
            console.warn("[PlayerContext] Error getting access token:", error);
          }
        },
        volume: 0.7,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("[PlayerContext] Player ready, device_id:", device_id);
        spotifyReadyRef.current = true;
        setState((prev) => ({ ...prev, deviceId: device_id, playerReady: true }));
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("[PlayerContext] Device not ready:", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          const isPlaying = !state.paused;
          isPlayingRef.current = isPlaying;
          setState((prev) => ({
            ...prev,
            isPlaying,
            progress: state.position,
            duration: state.duration,
          }));
        }
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error("[PlayerContext] Player initialization error:", message);
        console.log("[PlayerContext] HTML5 Audio fallback remains available");
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error("[PlayerContext] Authentication error:", message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error("[PlayerContext] Account error (likely non-Premium):", message);
        setState((prev) => ({ ...prev, requiresPremium: true }));
      });

      player.connect().then((success) => {
        if (success) {
          console.log("[PlayerContext] Web Playback SDK connected successfully");
        } else {
          console.error("[PlayerContext] Failed to connect Web Playback SDK — falling back to HTML5");
        }
      });

      playerRef.current = player;
    };

    if (window.Spotify) {
      setupSpotifyPlayer();
    } else {
      window.onSpotifyWebPlaybackSDKReady = setupSpotifyPlayer;
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.disconnect();
        playerRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // ───────────────────────────────────────────────
  //  playTrack — tries Spotify first, falls back to HTML5 Audio
  // ───────────────────────────────────────────────
  const playTrack = async (track: any) => {
    if (!track || typeof track !== "object" || !track.id) {
      console.warn("[PlayerContext] playTrack called with invalid or empty track argument:", track);
      if (state.currentTrack) {
        return resumeTrack();
      }
      return;
    }
    console.log("[PlayerContext] playTrack called with:", { id: track.id, name: track.name, uri: track.uri, previewUrl: track.previewUrl });

    // Stop any currently playing HTML5 audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Try Spotify first if available
    if (spotifyReadyRef.current && playerRef.current && state.deviceId) {
      const uri = track.uri || `spotify:track:${track.id}`;
      console.log("[PlayerContext] Attempting Spotify playback with URI:", uri);

      try {
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${state.deviceId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [uri],
            position_ms: 0,
          }),
        });

        if (response.ok || response.status === 204) {
          console.log("[PlayerContext] Spotify playback started");
          setState((prev) => ({
            ...prev,
            currentTrack: { ...track, uri },
            isPlaying: true,
            progress: 0,
            duration: track.duration || 0,
            engine: "spotify",
          }));
          isPlayingRef.current = true;
          intervalRef.current = setInterval(updateProgressRef.current!, 500);
          return;
        }

        console.warn("[PlayerContext] Spotify play failed, status:", response.status, "- falling back to HTML5");
      } catch (error) {
        console.warn("[PlayerContext] Spotify play error, falling back to HTML5:", error);
      }
    }

    // Fallback: HTML5 Audio preview with real track lookup
    let previewUrl = track.previewUrl || track.preview_url;
    let albumImageUrl = track.albumImageUrl || track.cover || (track.album && track.album.images && track.album.images[0]?.url);

    if ((!previewUrl || !albumImageUrl) && track.name && track.artist) {
      try {
        const query = encodeURIComponent(`${track.name} ${track.artist}`);
        const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=1`);
        if (res.ok) {
          const data = await res.json();
          if (data.results?.[0]) {
            const item = data.results[0];
            if (!previewUrl && item.previewUrl) {
              previewUrl = item.previewUrl;
            }
            if (!albumImageUrl && item.artworkUrl100) {
              albumImageUrl = item.artworkUrl100.replace("100x100bb", "600x600bb");
            }
          }
        }
      } catch (e) {
        console.warn("[PlayerContext] iTunes preview lookup error:", e);
      }
    }

    if (!previewUrl) {
      let hash = 0;
      const idStr = String(track.id || track.name || "default");
      for (let i = 0; i < idStr.length; i++) {
        hash = (hash << 5) - hash + idStr.charCodeAt(i);
        hash |= 0;
      }
      const songNum = (Math.abs(hash) % 16) + 1;
      previewUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${songNum}.mp3`;
    }

    console.log("[PlayerContext] Using HTML5 Audio playback with URL:", previewUrl);
    const audio = getOrCreateAudio();
    audio.src = previewUrl;
    audio.volume = state.volume;

    const fullTrack = {
      ...track,
      previewUrl,
      albumImageUrl: albumImageUrl || track.albumImageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    };

    try {
      await audio.play();
      setState((prev) => ({
        ...prev,
        currentTrack: fullTrack,
        isPlaying: true,
        progress: 0,
        duration: (audio.duration || 180) * 1000,
        engine: "html5",
        initializationError: null,
      }));
      isPlayingRef.current = true;
      startHtml5ProgressInterval();
      return;
    } catch (error) {
      console.warn("[PlayerContext] HTML5 Audio play error:", error);
    }

    // Always update NowPlayingBar even if browser autoplay restrictions prevent audio
    setState((prev) => ({
      ...prev,
      currentTrack: fullTrack,
      isPlaying: false,
      progress: 0,
      duration: track.duration || 180000,
      engine: "none",
      initializationError: null,
    }));
  };

  const pauseTrack = async () => {
    // Unconditionally pause HTML5 audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setState((prev) => ({ ...prev, isPlaying: false }));
    isPlayingRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (state.engine === "html5") {
      return;
    }

    if (!playerRef.current || !state.deviceId) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${state.deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });
    } catch (error) {
      console.error("Error pausing Spotify track:", error);
    }
  };

  const resumeTrack = async () => {
    if (state.engine === "html5" && audioRef.current) {
      try {
        await audioRef.current.play();
        setState((prev) => ({ ...prev, isPlaying: true }));
        isPlayingRef.current = true;
        startHtml5ProgressInterval();
      } catch (error) {
        console.error("Error resuming HTML5 track:", error);
      }
      return;
    }

    if (!playerRef.current || !state.deviceId || !state.currentTrack) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${state.deviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });

      setState((prev) => ({ ...prev, isPlaying: true }));
      isPlayingRef.current = true;
      intervalRef.current = setInterval(updateProgressRef.current!, 500);
    } catch (error) {
      console.error("Error resuming track:", error);
    }
  };

  const nextTrack = async () => {
    if (state.engine === "html5") {
      // In HTML5 mode, next/prev just stops
      if (audioRef.current) audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
      return;
    }
    if (!state.deviceId) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${state.deviceId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });
    } catch (error) {
      console.error("Error skipping next:", error);
    }
  };

  const previousTrack = async () => {
    if (state.engine === "html5") {
      // In HTML5 mode, restart current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setState((prev) => ({ ...prev, progress: 0 }));
      }
      return;
    }
    if (!state.deviceId) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${state.deviceId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });
    } catch (error) {
      console.error("Error skipping previous:", error);
    }
  };

  const seek = async (position: number) => {
    if (state.engine === "html5" && audioRef.current) {
      audioRef.current.currentTime = position / 1000;
      setState((prev) => ({ ...prev, progress: position }));
      return;
    }

    if (!state.deviceId || !state.currentTrack) return;

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/seek?device_id=${state.deviceId}&position_ms=${position}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        }
      );

      setState((prev) => ({ ...prev, progress: position }));
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const setVolume = async (volume: number) => {
    // Always update HTML5 audio volume
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    if (state.engine === "html5") {
      setState((prev) => ({ ...prev, volume }));
      return;
    }

    if (!state.deviceId) {
      setState((prev) => ({ ...prev, volume }));
      return;
    }

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${Math.round(volume * 100)}&device_id=${state.deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        }
      );

      setState((prev) => ({ ...prev, volume }));
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  };

  const setDeviceId = (deviceId: string) => {
    setState((prev) => ({ ...prev, deviceId }));
  };

  const clearTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setState((prev) => ({
      ...prev,
      currentTrack: null,
      isPlaying: false,
      progress: 0,
      duration: 0,
      engine: "none",
    }));
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, initializationError: null, requiresPremium: false }));
  };

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        seek,
        setVolume,
        setDeviceId,
        clearTrack,
        clearError,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

async function getAccessToken(): Promise<string> {
  const res = await fetch("/api/auth/spotify/refresh", { method: "POST" });
  if (res.ok) {
    const data = await res.json();
    return data.access_token;
  }
  throw new Error("Failed to get access token");
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}