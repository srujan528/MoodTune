import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MoodTune - Discover Music That Matches Your Mood",
  description: "AI-powered music discovery that recommends songs based on your mood and explains every recommendation. Powered by Spotify.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}