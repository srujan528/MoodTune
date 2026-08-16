"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  artwork?: string;
}

interface PlaylistPreviewProps {
  title: string;
  tracks: Track[];
}

export function PlaylistPreview({ title, tracks }: PlaylistPreviewProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="playlist-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h2 id="playlist-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-muted-foreground">{tracks.length} tracks • Curated for you</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            Play All
          </Button>
        </div>

        <div className="space-y-3">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={cn(
                "group flex items-center gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-primary/20 transition-all duration-200",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-violet-500/20">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </Button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl" aria-hidden="true">
                  <svg className="h-6 w-6 text-primary/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{track.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono tabular-nums">{track.duration}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 text-muted-foreground hover:text-red-400"
                  aria-label="Add to favorites"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}