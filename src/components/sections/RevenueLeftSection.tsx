import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { REVENUE_LEAKS } from "@/lib/content";
import { WaveDivider } from "@/components/WaveDivider";

/**
 * "Revenue Left on the Table" — added per client Google Doc 2026-05-14
 * (typo flagged on prior live version, this rebuild gives it a proper home).
 *
 * Three illustrative leak-stats with body copy. Uses the dark navy band so it
 * pops between the white services and the white testimonials.
 */
export function RevenueLeftSection() {
  return (
    <>
      <section
        id="revenue-left-on-the-table"
        aria-labelledby="revenue-left-heading"
        className="relative overflow-hidden bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent-800)] to-[var(--color-accent-900)] text-white py-24 lg:py-32"
      >
        {/* Animated grid texture */}
        <div className="absolute inset-0 bg-grid-animated opacity-60" aria-hidden />
        {/* Aurora glow */}
        <div className="aurora pointer-events-none" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-on-dark">The cost of doing nothing</p>
            <h2
              id="revenue-left-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            >
              Revenue left on the table.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-400">
                Every single week.
              </span>
            </h2>
            <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-prose">
              Manual work doesn&apos;t just cost hours. It quietly bleeds margin,
              delays close cycles, and forces hires you wouldn&apos;t need with
              the right automations in place. Here&apos;s where most SMBs are
              losing money before they even notice.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {REVENUE_LEAKS.map((leak, i) => (
              <Reveal key={leak.title} delay={i * 120}>
                <div className="relative h-full bg-white/6 backdrop-blur border border-white/10 rounded-2xl p-7 hover:border-[var(--color-cyan)]/40 transition-colors">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    {leak.value}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {leak.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    {leak.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <PrimaryCTA variant="onDark" />
          </Reveal>
        </div>

        {/* Wave divider into next light section */}
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
          <WaveDivider color="var(--color-surface)" size="md" />
        </div>
      </section>
    </>
  );
}
