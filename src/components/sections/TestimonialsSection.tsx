import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[var(--color-surface)] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Client voices</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] leading-tight tracking-tight">
            What the clients who trust us with mission-critical work say.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.org} delay={i * 120}>
              <figure className="h-full bg-[var(--color-surface-alt)] rounded-2xl border border-[var(--color-line)] p-7 relative overflow-hidden">
                {/* Large quote mark */}
                <svg
                  className="absolute -top-4 -left-2 w-20 h-20 text-[var(--color-primary)]/10"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 8v6H6v6H2v-8c0-2 2-4 4-4h4zm16 0v6h-4v6h-4v-8c0-2 2-4 4-4h4z" />
                </svg>
                <blockquote className="relative text-[var(--color-ink)] text-base sm:text-[1.05rem] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.org.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-accent)] text-sm">
                      {t.org}
                    </div>
                    <div className="text-xs text-[var(--color-ink-muted)]">
                      {t.name}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <PrimaryCTA />
        </Reveal>
      </div>
    </section>
  );
}
