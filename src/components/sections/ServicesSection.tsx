import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { SERVICES } from "@/lib/content";

/**
 * Per Anthony 2026-04-21 (Google Quality Score rule) + landing-page-architect
 * Rule 5b: each service gets its OWN <section> with a unique descriptive
 * anchor id (kebab-case) + H2 + ~60-80 words of real body copy + CTA.
 *
 * We render one <section> per service (not one section with a card grid).
 */
export function ServicesSection() {
  return (
    <>
      {/* Section intro — NOT a services container; each service is its own <section> below. */}
      <section
        id="services-intro"
        aria-labelledby="services-intro-heading"
        className="bg-[var(--color-surface)] pt-20 lg:pt-28 pb-6 lg:pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What we do</p>
            <h2
              id="services-intro-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] leading-tight tracking-tight"
            >
              Four ways we give you your team&apos;s time back.
            </h2>
            <p className="mt-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
              Every engagement starts with the free ROI assessment. We only
              recommend the services below when they will pay for themselves
              within 90 days.
            </p>
          </Reveal>
        </div>
      </section>

      {SERVICES.map((service, idx) => {
        const flip = idx % 2 === 1; // alternate image side
        return (
          <section
            key={service.slug}
            id={service.anchorId}
            aria-labelledby={`${service.anchorId}-heading`}
            className={`${idx === 0 ? "bg-[var(--color-surface)]" : idx % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-alt)]"} py-16 lg:py-20 border-b border-[var(--color-line)] last:border-b-0`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className={`grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="space-y-5">
                  <p className="eyebrow">
                    Service {idx + 1} · {service.label}
                  </p>
                  <h3
                    id={`${service.anchorId}-heading`}
                    className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)] leading-tight tracking-tight"
                  >
                    {service.heading}
                  </h3>
                  <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-prose">
                    {service.body}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {service.outcomes.map((o) => (
                      <li
                        key={o}
                        className="flex items-start gap-3 text-[var(--color-ink)]"
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-base leading-snug">{o}</span>
                      </li>
                    ))}
                  </ul>

                  <PrimaryCTA
                    label="Book this for my team"
                    align="start"
                    className="mt-8"
                  />
                </Reveal>

                <Reveal delay={120} className="relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]">
                    <Image
                      src={service.image}
                      alt={service.heading}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* subtle navy wash on the bottom to match brand */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-accent)]/30 via-transparent to-transparent" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
