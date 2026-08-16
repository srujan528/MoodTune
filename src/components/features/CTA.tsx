import { LinkButton } from "@/components/ui";

export function CTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-primary p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to find your soundtrack?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join thousands of music lovers discovering their perfect mood match. Free to start, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LinkButton size="lg" className="w-full sm:w-auto gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90" href="/signup">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Start Free
              </LinkButton>
              <LinkButton variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" href="/#features">
                Learn More
              </LinkButton>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/60">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}