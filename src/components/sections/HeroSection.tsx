"use client";

import { FormCard } from "@/components/FormCard";
import { Reveal } from "@/components/Reveal";
import { RotatingWords } from "@/components/RotatingWords";
import { WaveDivider } from "@/components/WaveDivider";
import { BRAND, HERO_ROTATING_WORDS } from "@/lib/content";

/**
 * Hero — full redesign per director directive 2026-05-14:
 *   - Animated rotating words ("admin work / data entry / follow-ups…")
 *   - Aurora gradient + drifting grid + floating particles for depth
 *   - "Live" indicator above headline (pulse dot)
 *   - Animated SVG wave divider at the bottom
 *   - Form-right split layout preserved
 *   - Brand colors enforced consistently (navy / electric blue / cyan accents)
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-24 sm:pt-28 lg:pt-32 lg:pb-32 min-h-[calc(100vh-0.5rem)] flex items-center bg-grid-animated"
    >
      {/* Aurora glow (animated radial gradients) */}
      <div className="aurora pointer-events-none" aria-hidden />
      {/* Floating particle dots */}
      <div className="particles" aria-hidden />
      {/* Top-fade vignette so the header pill stays readable */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-accent-900)]/60 to-transparent z-[1]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center z-10">
        <Reveal className="space-y-6 lg:max-w-2xl text-white">
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/15 backdrop-blur px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-white/80">
            <span className="dot-pulse" aria-hidden />
            <span>AI &amp; Automation · Built for SMBs</span>
          </div>

          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold leading-[1.04] tracking-tight">
            Free your team from{" "}
            <span className="block sm:inline">
              <RotatingWords
                words={HERO_ROTATING_WORDS}
                widthCh={14}
                className="font-extrabold"
              />
            </span>
            <span className="block mt-2 text-white">
              and get back to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                billable work.
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-prose leading-relaxed">
            {BRAND.positioning}
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-white/75">
            {[
              "20+ years federal experience",
              "Deployed for NIH, SAMHSA",
              "Woman-owned · US-based",
            ].map((c) => (
              <span key={c} className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {c}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2 bg-white text-[var(--color-accent)] hover:bg-white/95 px-6 py-3.5 rounded-lg font-bold text-base transition shadow-xl shadow-black/20"
            >
              {BRAND.primaryCtaLabel}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline transition"
            >
              How it works →
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:pl-2 relative">
          {/* Floating accent badge above form for depth */}
          <div
            className="hidden lg:flex float-slow absolute -top-6 -left-6 z-10 items-center gap-2 rounded-full bg-white text-[var(--color-accent)] px-4 py-2 shadow-xl text-xs font-bold uppercase tracking-wider"
            aria-hidden
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-rose)]" />
            Free 30-min call
          </div>
          {/* Decorative gradient ring behind the form */}
          <div
            className="hidden lg:block absolute -inset-2 -z-0 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/40 via-[var(--color-cyan)]/20 to-[var(--color-rose)]/30 blur-xl opacity-60"
            aria-hidden
          />
          <div className="relative">
            <FormCard variant="hero" idSuffix="hero" />
          </div>
        </Reveal>
      </div>

      {/* Animated wave divider at bottom (transitions into white StatsSection) */}
      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
        <WaveDivider color="var(--color-surface)" size="lg" />
      </div>
    </section>
  );
}
