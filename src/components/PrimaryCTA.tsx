import { BRAND } from "@/lib/content";

type Props = {
  label?: string;
  variant?: "default" | "onDark";
  align?: "center" | "start";
  className?: string;
  href?: string;
};

/**
 * Single CTA (NOT DualCTA) — this is a form-only LP per task spec
 * (has_phone_leads=false). landing-page-architect Rule #1:
 * "IF NO phone number provided: Single CTA button is sufficient".
 *
 * Must be centered per Rule #1 unless align="start" for split-hero left column.
 */
export function PrimaryCTA({
  label = BRAND.primaryCtaLabel,
  variant = "default",
  align = "center",
  className = "",
  href = "#contact",
}: Props) {
  const onDark = variant === "onDark";
  const justify = align === "start" ? "justify-start" : "justify-center";
  return (
    <div
      className={`flex flex-wrap items-center ${justify} gap-3 mt-10 ${className}`}
    >
      <a
        href={href}
        className={
          onDark
            ? "bg-white hover:bg-white/90 text-[var(--color-accent)] px-7 py-3.5 rounded-lg font-semibold text-base transition shadow-lg shadow-black/20"
            : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-7 py-3.5 rounded-lg font-semibold text-base transition shadow-sm"
        }
      >
        {label}
      </a>
      <span className={`text-sm ${onDark ? "text-white/70" : "text-[var(--color-ink-muted)]"}`}>
        {BRAND.ctaSubLabel}
      </span>
    </div>
  );
}
