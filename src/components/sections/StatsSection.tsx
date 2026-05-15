import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const STATS_DISPLAY: {
  to: number;
  display?: string;
  suffix?: string;
  prefix?: string;
  label: string;
}[] = [
  { to: 60, display: "40-60%", label: "Team time reclaimed from manual work" },
  { to: 20, suffix: "+", label: "Years of federal-grade AI experience" },
  { to: 100, suffix: "%", label: "Woman-owned, US-based consulting team" },
  { to: 90, suffix: "d", label: "Days to typical ROI break-even" },
];

const MARQUEE_PHRASES = [
  "Federal-grade engineering",
  "Built for SMBs",
  "NIH · SAMHSA · League of Women Voters",
  "20+ years AI & automation",
  "HIPAA-aware data governance",
  "Senior consultants — no offshoring",
  "Woman-owned",
  "Fixed scope · fixed fee",
];

export function StatsSection() {
  return (
    <section
      id="proof"
      aria-label="By the numbers"
      className="relative bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {STATS_DISPLAY.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="relative text-center lg:text-left">
                <div className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-none tracking-tight bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-primary-700)] to-[var(--color-primary)] bg-clip-text text-transparent">
                  <AnimatedCounter
                    to={s.to}
                    display={s.display}
                    suffix={s.suffix}
                    prefix={s.prefix}
                  />
                </div>
                <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-muted)] leading-snug max-w-xs mx-auto lg:mx-0">
                  {s.label}
                </p>
                <div className="hidden lg:block mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-cyan)] opacity-70" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-y border-[var(--color-line)] bg-[var(--color-surface-alt)] py-4">
        <div className="marquee">
          <div className="marquee-track text-[var(--color-ink-muted)] text-sm font-semibold uppercase tracking-[0.18em]">
            {[...MARQUEE_PHRASES, ...MARQUEE_PHRASES].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span>{p}</span>
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/40"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
