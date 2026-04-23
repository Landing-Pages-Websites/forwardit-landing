import Image from "next/image";
import { FormCard } from "@/components/FormCard";
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/content";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-accent)] text-white py-20 lg:py-28"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-0 -left-32 w-[30rem] h-[30rem] rounded-full bg-[var(--color-primary)]/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-[var(--color-rose)]/15 blur-[120px]" />
        <Image
          src="/images/service-3.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.08]"
          aria-hidden
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center z-10">
        <Reveal className="space-y-5 lg:max-w-xl">
          <p className="eyebrow eyebrow-on-dark">Book it</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            30 minutes could be worth{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
              40-60% of your team&apos;s week.
            </span>
          </h2>
          <p className="text-lg text-white/75 leading-relaxed">
            {BRAND.shortPositioning} Book the free assessment — qualified
            teams skip straight to scheduling, everyone else gets the
            roadmap to plan around.
          </p>

          <ul className="space-y-3 pt-2">
            {[
              "Free 30-min ROI assessment · no obligation",
              "Walk away with an hours-saved estimate",
              "Fixed-scope, fixed-fee engagements after",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-white/90"
              >
                <span className="mt-1 w-5 h-5 rounded-full bg-white text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
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
                <span className="text-base leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:pl-2">
          <FormCard
            variant="hero"
            idSuffix="contact"
            heading="Book your free ROI assessment"
            subheading="30 minutes. Direct with a senior consultant. You'll leave with a rough estimate of hours saved — whether or not we work together."
          />
        </Reveal>
      </div>
    </section>
  );
}
