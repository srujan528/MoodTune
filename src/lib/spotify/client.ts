import { SpotifyApi, type AccessToken } from "@spotify/web-api-ts-sdk";
import { env } from "@/config/env";

let spotifyClient: SpotifyApi | null = null;

export function createSpotifyClient(): SpotifyApi {
  if (spotifyClient) return spotifyClient;

  spotifyClient = SpotifyApi.withClientCredentials(
    env.SPOTIFY_CLIENT_ID,
    env.SPOTIFY_CLIENT_SECRET
  );

  return spotifyClient;
}

export function getSpotifyClient(): SpotifyApi {
  if (!spotifyClient) {
    return createSpotifyClient();
  }
  return spotifyClient;
}

export function createUserSpotifyClient(accessToken: string): SpotifyApi {
  return SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, accessToken as unknown as AccessToken);
}

export type { SpotifyApi } from "@spotify/web-api-ts-sdk";