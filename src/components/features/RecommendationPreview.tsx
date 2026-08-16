"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui";

interface Artist {
  name: string;
  image?: string;
}

interface RecommendationPreviewProps {
  mood: string;
  artists: Artist[];
  explanation: string;
}

export function RecommendationPreview({ mood, artists, explanation }: RecommendationPreviewProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="recommendation-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="text-2xl" aria-hidden="true">🎵</span>
              <span>Mood: {mood}</span>
            </div>

            <h2 id="recommendation-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Recommended Artists
            </h2>

            <p className="text-lg text-muted-foreground">
              Based on your mood, our AI analyzed tempo, valence, energy, and lyrical themes to find the perfect matches.
            </p>

            <div className="flex flex-wrap gap-3">
              {artists.map((artist, index) => (
                <div
                  key={artist.name}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-white/5 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-white/10",
                    "animate-slide-up"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  </div>
                  <span className="font-medium text-foreground">{artist.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Why these artists?</h3>
                    <p className="text-sm text-muted-foreground">AI explanation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{explanation}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}