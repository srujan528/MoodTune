import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { ToastProvider } from "@/components/ui";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000"),
  title: {
    default: "MoodTune — Discover Music That Matches Your Vibe",
    template: "%s | MoodTune",
  },
  description: "Personalized music discovery that matches your exact emotional frequency. Powered by Spotify.",
  keywords: ["music discovery", "mood recommendations", "Spotify", "curated playlists"],
  authors: [{ name: "MoodTune Team" }],
  creator: "MoodTune",
  publisher: "MoodTune",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moodtune.app",
    siteName: "MoodTune",
    title: "MoodTune — Discover Music That Matches Your Vibe",
    description: "Personalized music discovery that matches your exact emotional frequency.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoodTune — Mood-based music discovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodTune — Discover Music That Matches Your Vibe",
    description: "Personalized music discovery that matches your exact emotional frequency.",
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
    { media: "(prefers-color-scheme: light)", color: "#07080E" },
    { media: "(prefers-color-scheme: dark)", color: "#07080E" },
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
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="preconnect" href="https://api.spotify.com" />
        <link rel="dns-prefetch" href="https://api.spotify.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080E] text-slate-100 selection:bg-[#1DB954]/30 selection:text-[#1DB954]">
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}