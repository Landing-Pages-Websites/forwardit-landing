import { Reveal } from "@/components/Reveal";
import { STATS } from "@/lib/content";

export function StatsSection() {
  return (
    <section
      id="proof"
      aria-label="By the numbers"
      className="relative bg-[var(--color-surface)] border-b border-[var(--color-line)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 80}>
              <div className="text-center md:text-left">
                <div className="text-4xl sm:text-5xl font-bold text-[var(--color-accent)] tracking-tight">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm sm:text-base text-[var(--color-ink-muted)] leading-snug max-w-xs mx-auto md:mx-0">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
