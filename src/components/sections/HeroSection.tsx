"use client";

import Image from "next/image";
import { FormCard } from "@/components/FormCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/content";

/**
 * Hero per landing-page-architect Hard Rule #7 (split layout, form right) +
 * Rule #8 (min-h-screen) + Rule #8b (CTA directly under headline, above fold).
 * Form-only page: single PrimaryCTA under the headline (NOT DualCTA) per
 * Rule #1 "IF NO phone number provided: Single CTA button is sufficient".
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24 min-h-[calc(100vh-0.5rem)] flex items-center bg-grid-navy"
    >
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-[var(--color-primary)]/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-[var(--color-rose)]/20 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center z-10">
        <Reveal className="space-y-5 lg:max-w-xl text-white">
          <p className="eyebrow eyebrow-on-dark">
            AI &amp; Automation · For SMBs
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.05] tracking-tight">
            Reclaim{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
              40-60% of your team&apos;s time
            </span>{" "}
            with federal-grade AI.
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-prose leading-relaxed">
            {BRAND.positioning}
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              20+ years federal experience
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Deployed for NIH, SAMHSA
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Woman-owned
            </span>
          </div>

          {/* Hero CTA per Anthony 2026-04-22 — under the headline, above the fold */}
          <PrimaryCTA variant="onDark" align="start" className="mt-4" />
        </Reveal>

        <Reveal delay={120} className="lg:pl-2 relative">
          {/* Subtle service illustration tucked behind the form for visual depth */}
          <div className="hidden lg:block absolute -top-10 -right-6 w-56 h-56 opacity-20 blur-sm">
            <Image
              src="/images/service-2.png"
              alt=""
              fill
              className="object-contain"
              aria-hidden
            />
          </div>
          <div className="relative">
            <FormCard variant="hero" idSuffix="hero" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
