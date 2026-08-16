"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  mood?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "MoodTune completely changed how I discover music. I used to spend hours making playlists for different moods - now I just tell it how I feel and get perfect recommendations with explanations that actually make sense.",
    author: "Sarah Chen",
    role: "Product Designer",
    mood: "Late Night",
  },
  {
    quote: "The AI explanations are genuinely helpful. It told me why a specific Joji track matched my 'heartbroken' mood - the minor key, slow tempo, and lyrical themes. It feels like having a music-savvy friend who really gets you.",
    author: "Marcus Johnson",
    role: "Software Engineer",
    mood: "Heartbroken",
  },
  {
    quote: "As someone who works from home, the Focus mood is a game changer. The recommendations are genuinely instrumental and ambient - no lyrics to distract me. My productivity has noticeably improved since I started using it.",
    author: "Emma Rodriguez",
    role: "Freelance Writer",
    mood: "Focus",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Loved by music lovers everywhere
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our community has to say about discovering music with MoodTune.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className={cn(
                "border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 hover:bg-white/10 transition-all duration-300",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  {testimonial.mood && (
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary/20 text-primary font-medium">
                      {testimonial.mood}
                    </span>
                  )}
                </div>
                <p className="text-foreground leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}