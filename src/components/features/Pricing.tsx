"use client";

import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui";

interface PricingTier {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  cta: { text: string; href: string; variant: "default" | "outline" };
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for casual listeners",
    features: [
      "5 mood recommendations per day",
      "Basic AI explanations",
      "Save up to 50 favorites",
      "Mood history (30 days)",
      "Spotify playlist export",
    ],
    cta: { text: "Start Free", href: "/auth/spotify", variant: "outline" },
  },
  {
    name: "Premium",
    price: { monthly: 9, yearly: 7 },
    description: "For serious music lovers",
    features: [
      "Unlimited mood recommendations",
      "Detailed AI explanations",
      "Unlimited favorites & playlists",
      "Full mood history & analytics",
      "Priority queue processing",
      "Ad-free experience",
      "Custom mood creation",
    ],
    cta: { text: "Get Premium", href: "/auth/spotify?plan=premium", variant: "default" },
    popular: true,
  },
  {
    name: "Family",
    price: { monthly: 15, yearly: 12 },
    description: "Share with up to 6 accounts",
    features: [
      "Everything in Premium",
      "Up to 6 individual accounts",
      "Family mood mixing",
      "Shared collaborative playlists",
      "Parental controls",
      "Centralized billing",
    ],
    cta: { text: "Start Family Plan", href: "/auth/spotify?plan=family", variant: "default" },
  },
];

export function Pricing() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white/5 backdrop-blur-sm" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your listening habits. All plans include Spotify integration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={cn(
                "relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300",
                tier.popular
                  ? "border-primary/30 bg-gradient-to-br from-primary/5 to-violet-500/5 ring-1 ring-primary/20"
                  : "hover:border-primary/30 hover:bg-white/10",
                "animate-slide-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-violet-600" />
              )}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">${tier.price.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Billed yearly: <span className="font-medium text-foreground">${tier.price.yearly}/mo</span>
                </p>
                <p className="mt-4 text-muted-foreground text-sm">{tier.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-3" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  {tier.cta.variant === "default" ? (
                    <LinkButton
                      className={cn(
                        "w-full",
                        tier.popular ? "bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90" : ""
                      )}
                      href={tier.cta.href}
                    >
                      {tier.cta.text}
                    </LinkButton>
                  ) : (
                    <LinkButton
                      variant="outline"
                      className="w-full"
                      href={tier.cta.href}
                    >
                      {tier.cta.text}
                    </LinkButton>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            All prices in USD. Cancel anytime.{" "}
            <LinkButton variant="link" href="/faq" className="ml-1">
              FAQ
            </LinkButton>
          </p>
        </div>
      </div>
    </section>
  );
}