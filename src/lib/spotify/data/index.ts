import { createUserSpotifyClient, createSpotifyClient } from "@/lib/spotify/client";
import { getClient } from "@/lib/supabase/client";
import type { SpotifyTrack, SpotifyArtist, SpotifyAlbum, AudioFeatures, PlaybackState } from "@/lib/spotify/types";
import { mapTrackToRecommendation } from "@/lib/spotify/types";

export async function getSpotifyUser(accessToken: string) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.currentUser.profile();
}

export async function getUserTopTracks(accessToken: string, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term", limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  const result = await client.currentUser.topItems.tracks({ time_range: timeRange, limit });
  return result;
}

export async function getUserTopArtists(accessToken: string, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term", limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  const result = await client.currentUser.topItems.artists({ time_range: timeRange, limit });
  return result;
}

export async function getRecentlyPlayed(accessToken: string, limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.player.getRecentlyPlayedTracks({ limit });
}

export async function getAudioFeatures(accessToken: string, trackIds: string[]) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.tracks.getAudioFeatures(trackIds);
}

export async function getRecommendations(accessToken: string, seedTracks: string[], seedArtists: string[], seedGenres: string[], audioFeatures: Partial<any>, limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.recommendations.getRecommendations({
    seed_tracks: seedTracks.join(","),
    seed_artists: seedArtists.join(","),
    seed_genres: seedGenres.join(","),
    ...audioFeatures,
    limit,
  });
}

export async function searchTracks(accessToken: string, query: string, limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.search(query, ["track"], "US", limit);
}

export async function searchArtists(accessToken: string, query: string, limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.search(query, ["artist"], "US", limit);
}

export async function getTrack(accessToken: string, trackId: string) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.tracks.get(trackId);
}

export async function getArtist(accessToken: string, artistId: string) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.artists.get(artistId);
}

export async function getUserPlaylists(accessToken: string, limit = 20) {
  const client: any = createUserSpotifyClient(accessToken);
  const result = await client.currentUser.playlists(limit);
  return result;
}

export async function getPlaylistTracks(accessToken: string, playlistId: string, limit = 100) {
  const client: any = createUserSpotifyClient(accessToken);
  return client.playlists.getItems(playlistId, { limit });
}

export function getRecommendationExplanation(moodConfig: any, track: any): string {
  const explanations: Record<string, string> = {
    "just-vibing": `This track has the warm, feel-good energy that matches your vibe perfectly.`,
    "need-pick-me-up": `Bright, uplifting energy to lift your mood when you need it most.`,
    "something-mellow": `Chill, laid-back production with gentle dynamics — perfect for unwinding.`,
    "in-my-feelings": `Raw, emotional delivery with sparse arrangements that match the mood.`,
    "late-night-drive": `Atmospheric, introspective sound perfect for midnight listening.`,
    "locked-in": `Steady rhythm and minimal vocals to support sustained focus.`,
    "getting-things-done": `Consistent tempo and instrumental focus to keep you in flow.`,
    "need-some-energy": `High tempo, driving rhythm, and aggressive dynamics for maximum energy.`,
    "slow-sunday": `Very slow tempo, sustained tones — music for deep relaxation.`,
    "feeling-good": `High danceability, infectious groove, and euphoric energy.`,
  };

  const artistName = track.artist || track.artists?.[0]?.name || "this artist";
  return explanations[moodConfig.id] || `This track matches the ${moodConfig.label} vibe with its ${artistName} sound.`;
}

function getCuratedFallbackTracks(moodId: string) {
  const curatedMap: Record<string, any[]> = {
    "just-vibing": [
      { id: "285rgLwWtaW8aiwGj2vP2z", name: "Texas Sun", artist: "Khruangbin & Leon Bridges", album: "Texas Sun", uri: "spotify:track:285rgLwWtaW8aiwGj2vP2z", duration: 252000, albumImageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { id: "01Yr5PZWFuYiSIUtiqmE89", name: "Show Me How", artist: "Men I Trust", album: "Oncle Jazz", uri: "spotify:track:01Yr5PZWFuYiSIUtiqmE89", duration: 215000, albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: "6ce4yjrvwuW8kg5awZv0hU", name: "The Less I Know The Better", artist: "Tame Impala", album: "Currents", uri: "spotify:track:6ce4yjrvwuW8kg5awZv0hU", duration: 216000, albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: "4EpZ4eBDvA3aW3fU5d8vXg", name: "Sunflower", artist: "Rex Orange County", album: "Sunflower", uri: "spotify:track:4EpZ4eBDvA3aW3fU5d8vXg", duration: 252000, albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { id: "4e5E29o346m8x5a3Wp8Wp2", name: "Talk Too Much", artist: "COIN", album: "How Will You Know If You Never Try", uri: "spotify:track:4e5E29o346m8x5a3Wp8Wp2", duration: 187000, albumImageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    ],
    "something-mellow": [
      { id: "125W8kg5awZv0hU6ce4yjr", name: "Chamber of Reflection", artist: "Mac DeMarco", album: "Salad Days", uri: "spotify:track:125W8kg5awZv0hU6ce4yjr", duration: 231000, albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
      { id: "7c2W8kg5awZv0hU6ce4yjr", name: "Space Song", artist: "Beach House", album: "Depression Cherry", uri: "spotify:track:7c2W8kg5awZv0hU6ce4yjr", duration: 320000, albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { id: "345W8kg5awZv0hU6ce4yjr", name: "Archie, Marry Me", artist: "Alvvays", album: "Alvvays", uri: "spotify:track:345W8kg5awZv0hU6ce4yjr", duration: 198000, albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { id: "5W8kg5awZv0hU6ce4yjrvw", name: "Apocalypse", artist: "Cigarettes After Sex", album: "Cigarettes After Sex", uri: "spotify:track:5W8kg5awZv0hU6ce4yjrvw", duration: 290000, albumImageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
      { id: "6ce4yjrvwW8kg5awZv0hU6", name: "Darling", artist: "Real Estate", album: "In Mind", uri: "spotify:track:6ce4yjrvwW8kg5awZv0hU6", duration: 272000, albumImageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    ],
    "need-pick-me-up": [
      { id: "463SpY92vW8kg5awZv0hU", name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", uri: "spotify:track:463SpY92vW8kg5awZv0hU", duration: 203000, albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
      { id: "4DvkF655Gv0hU6ce4yjrvw", name: "As It Was", artist: "Harry Styles", album: "Harry's House", uri: "spotify:track:4DvkF655Gv0hU6ce4yjrvw", duration: 167000, albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
      { id: "1boX1u87b92vW8kg5awZv0", name: "About Damn Time", artist: "Lizzo", album: "Special", uri: "spotify:track:1boX1u87b92vW8kg5awZv0", duration: 191000, albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
      { id: "02M2vW8kg5awZv0hU6ce4y", name: "Heat Waves", artist: "Glass Animals", album: "Dreamland", uri: "spotify:track:02M2vW8kg5awZv0hU6ce4y", duration: 238000, albumImageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
    ],
    "in-my-feelings": [
      { id: "7ce4yjrvwW8kg5awZv0hU6", name: "Ocean Eyes", artist: "Billie Eilish", album: "dont smile at me", uri: "spotify:track:7ce4yjrvwW8kg5awZv0hU6", duration: 200000, albumImageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" },
      { id: "4vW8kg5awZv0hU6ce4yjr", name: "Someone Like You", artist: "Adele", album: "21", uri: "spotify:track:4vW8kg5awZv0hU6ce4yjr", duration: 285000, albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
      { id: "5W8kg5awZv0hU6ce4yjrvw", name: "drivers license", artist: "Olivia Rodrigo", album: "SOUR", uri: "spotify:track:5W8kg5awZv0hU6ce4yjrvw", duration: 242000, albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    ],
    "late-night-drive": [
      { id: "0VjAawZv0hU6ce4yjrvwW8", name: "Blinding Lights", artist: "The Weeknd", album: "After Hours", uri: "spotify:track:0VjAawZv0hU6ce4yjrvwW8", duration: 200000, albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { id: "6ce4yjrvwW8kg5awZv0hU6", name: "Glimpse of Us", artist: "Joji", album: "SMITHEREENS", uri: "spotify:track:6ce4yjrvwW8kg5awZv0hU6", duration: 233000, albumImageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
      { id: "7ce4yjrvwW8kg5awZv0hU6", name: "Get You", artist: "Daniel Caesar", album: "Freudian", uri: "spotify:track:7ce4yjrvwW8kg5awZv0hU6", duration: 278000, albumImageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    ],
    "locked-in": [
      { id: "4ce4yjrvwW8kg5awZv0hU6", name: "Awake", artist: "Tycho", album: "Awake", uri: "spotify:track:4ce4yjrvwW8kg5awZv0hU6", duration: 283000, albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { id: "3W8kg5awZv0hU6ce4yjrvw", name: "Dayvan Cowboy", artist: "Boards of Canada", album: "The Campfire Headphase", uri: "spotify:track:3W8kg5awZv0hU6ce4yjrvw", duration: 300000, albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80", previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    ],
  };

  return curatedMap[moodId] || curatedMap["just-vibing"];
}

export async function getMoodBasedRecommendations(
  accessToken: string | null | undefined,
  moodId: string,
  moodConfig: any,
  limit = 20
) {
  const seedGenres = moodConfig.genres || [];
  const audioFeatures = moodConfig.audioFeatures || {};
  let tracks: any[] = [];

  // Attempt 1: Personalized recommendations if user access token is provided
  if (accessToken) {
    try {
      const topTracks = await getUserTopTracks(accessToken, "medium_term", 10);
      const seedTracks = topTracks.items?.slice(0, 3).map((t: any) => t.id) || [];
      const recs = await getRecommendations(
        accessToken,
        seedTracks,
        [],
        seedGenres.slice(0, 2),
        audioFeatures,
        limit
      );
      if (recs?.tracks?.length) {
        tracks = recs.tracks;
      }
    } catch (err) {
      console.warn("[getMoodBasedRecommendations] User top tracks lookup failed, trying search fallback:", err);
    }
  }

  // Attempt 2: Spotify Client Credentials Search fallback
  if (!tracks.length) {
    try {
      const client = createSpotifyClient();
      const query = moodConfig.label || moodId;
      const searchRes = await client.search(query, ["track"], "US", limit as any);
      if (searchRes?.tracks?.items?.length) {
        tracks = searchRes.tracks.items;
      }
    } catch (err) {
      console.warn("[getMoodBasedRecommendations] Client credentials search failed, using curated fallback:", err);
    }
  }

  // Attempt 3: Pre-configured curated mood tracks
  if (!tracks.length) {
    tracks = getCuratedFallbackTracks(moodId);
  }

  return tracks.map((track: any) => ({
    track: track,
    explanation: getRecommendationExplanation(moodConfig, track),
  }));
}

export async function saveRecommendationsToDb(
  userId: string,
  moodEntryId: string,
  recommendations: Array<{ track: any; explanation: string }>
) {
  const supabase = getClient();

  const getArtistNames = (artists: Array<{ name: string }>) => {
    if (!artists) return "Unknown Artist";
    if (typeof artists === "string") return artists;
    return artists.map(function(a) { return a.name; }).join(", ");
  };

  const recommendationsToInsert = recommendations.map(function(rec, index) {
    const artistNames = getArtistNames(rec.track.artists || rec.track.artist);
    const albumName = rec.track.album ? (rec.track.album.name || rec.track.album) : null;
    const albumImageUrl = rec.track.album && rec.track.album.images && rec.track.album.images[0] 
      ? rec.track.album.images[0].url 
      : rec.track.albumImageUrl || null;
    return {
      user_id: userId,
      mood_entry_id: moodEntryId,
      track_id: rec.track.id,
      track_name: rec.track.name,
      artist_name: artistNames,
      album_name: albumName,
      album_image_url: albumImageUrl,
      preview_url: rec.track.preview_url || rec.track.previewUrl,
      spotify_url: rec.track.external_urls?.spotify || rec.track.spotifyUrl,
      explanation: rec.explanation,
    };
  });

  const { data, error } = await supabase
    .from("recommendations")
    .insert(recommendationsToInsert)
    .select();

  if (error) {
    console.error("Error saving recommendations:", error);
    return [];
  }
  return data || [];
}

export async function getRecommendationsFromDb(userId: string, moodEntryId: string) {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .eq("mood_entry_id", moodEntryId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
  return data || [];
}

export async function getAccessToken(): Promise<string> {
  const res = await fetch("/api/auth/spotify/refresh", { method: "POST" });
  if (res.ok) {
    const data = await res.json();
    return data.access_token;
  }
  throw new Error("Failed to get access token");
}