import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { ToastProvider } from "@/components/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000"),
  title: {
    default: "MoodTune - Discover Music That Matches Your Mood",
    template: "%s | MoodTune",
  },
  description: "AI-powered music discovery that recommends songs based on your mood and explains every recommendation. Powered by Spotify.",
  keywords: ["music discovery", "mood-based recommendations", "Spotify", "AI music", "personalized playlists"],
  authors: [{ name: "MoodTune Team" }],
  creator: "MoodTune",
  publisher: "MoodTune",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moodtune.app",
    siteName: "MoodTune",
    title: "MoodTune - Discover Music That Matches Your Mood",
    description: "AI-powered music discovery that recommends songs based on your mood and explains every recommendation.",
    images: [
      {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "MoodTune - Mood-based music discovery",
    },
  ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodTune - Discover Music That Matches Your Mood",
    description: "AI-powered music discovery that recommends songs based on your mood and explains every recommendation.",
    images: ["/og-image.png"],
    creator: "@moodtune",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.spotify.com" />
        <link rel="dns-prefetch" href="https://api.spotify.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}