# MoodTune 🎧 — AI-Powered Mood Music Recommendation Platform

> Discover music tuned to your exact emotional frequency. Powered by Next.js 16 (Turbopack), Supabase, OpenAI/AI Intelligence, and the Spotify Web API.

---

## ✨ Features

- 🎨 **10 Acoustic Mood Profiles**: Instantly switch between *Just Vibing*, *Need a Pick-Me-Up*, *Something Mellow*, *In My Feelings*, *Late-Night Drive*, *Locked In*, *Getting Things Done*, *Need Some Energy*, *Slow Sunday*, and *Feeling Good*.
- ⚡ **AI "Why These Tracks?" Insights**: Generates personalized AI explanations detailing acoustic valence, BPM tempo curves, and emotional harmony for every recommendation.
- 🎵 **Spotify Web Playback SDK & Audio Preview**: Stream real-time 30-second song previews for guest sessions, and connect your **Spotify Premium** account for direct full-track Web SDK streaming inside the app.
- 🌌 **ReactBits-Inspired Animated UI**: Features custom spring-physics cursor tracking (`CustomCursor`), glowing radial spotlights (`SpotlightCard`), perimeter border beams (`BorderBeam`), liquid aurora mesh gradients (`AuroraBackground`), and an interactive Bento Grid.
- 🔐 **Supabase Authentication & History**: Save mood sessions, track listening history, and manage saved favorite tracks across devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.3 (Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Music API**: [Spotify Web API](https://developer.spotify.com/) & [@spotify/web-api-ts-sdk](https://github.com/spotify/spotify-web-api-ts-sdk)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm or yarn
- A Spotify Developer account ([Spotify Dashboard](https://developer.spotify.com/dashboard))
- A Supabase account ([Supabase Console](https://database.new))

---

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
NEXT_PUBLIC_APP_NAME=MoodTune

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Spotify Developer Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/auth/spotify/callback

# AI Provider Configuration
AI_PROVIDER=openai
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
AI_API_KEY=your_openai_api_key
```

---

### 3. Installation & Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page!

---

## 🔑 Spotify Developer Setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new App.
2. Under **App Settings**, add the following to **Redirect URIs**:
   - `http://127.0.0.1:3000/auth/spotify/callback`
   - `https://your-app-domain.vercel.app/auth/spotify/callback` (for production)
3. Copy the **Client ID** and **Client Secret** into your `.env.local` file.

---

## 🌐 Deploying on Vercel

MoodTune is pre-configured for **1-click Vercel deployment** via `vercel.json`:

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Set the Environment Variables (`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, etc.).
4. Click **Deploy**.

---

## 📄 License

MIT License. Built with ❤️ for music enthusiasts.