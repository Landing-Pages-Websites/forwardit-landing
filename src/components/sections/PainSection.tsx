import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { PAIN_POINTS, BRAND } from "@/lib/content";

/**
 * Pain section — H2 set per client Google Doc 2026-05-14:
 *   "Your team is spending most of their time on tasks that don't directly grow your business."
 */
export function PainSection() {
  return (
    <section
      id="pain"
      className="relative bg-[var(--color-surface-alt)] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--color-accent)] leading-[1.15] tracking-tight">
            Your team is spending most of their time on tasks that{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-rose)] bg-clip-text text-transparent">
              don&apos;t directly grow your business.
            </span>
          </h2>
          <p className="mt-5 text-lg text-[var(--color-ink-muted)] leading-relaxed max-w-3xl">
            SMBs don&apos;t fail because they run out of customers. They stall
            because their team spends 40-60% of the week on work that{" "}
            <span className="font-semibold text-[var(--color-accent)]">
              shouldn&apos;t exist
            </span>{" "}
            — and they keep hiring to compensate.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PAIN_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="group relative h-full bg-white rounded-2xl border border-[var(--color-line)] p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Decorative corner gradient */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center mb-5 text-[var(--color-primary)] relative z-10">
                  {i === 0 && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <line x1="8" y1="20" x2="16" y2="20" />
                      <line x1="12" y1="16" x2="12" y2="20" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 14" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-accent)] mb-2.5 relative z-10">
                  {p.title}
                </h3>
                <p className="text-[var(--color-ink-muted)] leading-relaxed relative z-10">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <PrimaryCTA label={BRAND.primaryCtaLabel} />
        </Reveal>
      </div>
    </section>
  );
}
