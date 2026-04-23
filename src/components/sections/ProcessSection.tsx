import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { PROCESS_STEPS } from "@/lib/content";

export function ProcessSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-[var(--color-surface-alt)] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] leading-tight tracking-tight">
            Three steps from conversation to automation.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            No long discovery phases, no surprise invoices. You&apos;ll know
            exactly what you&apos;re getting before you commit.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 relative">
          {/* Connector line between steps — desktop only */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent" />

          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 140} className="relative">
              <div className="text-center px-4 py-6 md:py-0">
                <div className="relative mx-auto w-20 h-20 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-3xl shadow-md">
                  {s.step}
                </div>
                <h3 className="mt-6 text-xl font-bold text-[var(--color-accent)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed max-w-sm mx-auto">
                  {s.body}
                </p>
              </div>
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
