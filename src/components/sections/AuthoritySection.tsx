import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { AUTHORITY_POINTS } from "@/lib/content";

export function AuthoritySection() {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-[var(--color-accent)] text-white py-20 lg:py-28"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-0 opacity-[0.18]">
        <Image
          src="/images/feature-1.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/95 via-[var(--color-accent)]/75 to-[var(--color-accent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Who we are</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Federal-grade expertise.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
                Now for SMBs.
              </span>
            </h2>
            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-prose">
              For 20+ years, our leadership has built AI, automation, and data
              platforms for federal agencies where failure isn&apos;t an
              option — NIH, SAMHSA, the League of Women Voters, and others.
              We&apos;re bringing that same discipline to SMBs who deserve
              better than DIY automation duct-tape.
            </p>
          </Reveal>

          <Reveal delay={120} className="space-y-5">
            {AUTHORITY_POINTS.map((point, i) => (
              <div
                key={point.title}
                className="relative pl-14 pr-5 py-5 rounded-xl bg-white/6 backdrop-blur border border-white/10"
              >
                <div className="absolute left-4 top-5 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/70 leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal>
          <PrimaryCTA variant="onDark" className="mt-4" />
        </Reveal>
      </div>
    </section>
  );
}
