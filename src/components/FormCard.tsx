"use client";

import { useState, useEffect } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  ROI_OPTIONS,
  TIMELINE_OPTIONS,
  qualifies,
  type TimelineValue,
  BRAND,
} from "@/lib/content";

type Props = {
  variant?: "hero" | "card" | "inline";
  heading?: string;
  subheading?: string;
  idSuffix?: string;
};

/**
 * Shared lead form — fields come EXACTLY from the Atlas task spec
 * (5705b7e5-517e-46d2-8f21-c944e1c71778). Do NOT add/remove/reorder
 * fields without re-reading the task first.
 *
 * Fields (EXACT):
 *   1. First Name       name="firstName"   required
 *   2. Last Name        name="lastName"    required
 *   3. Email            name="email"       required
 *   4. Phone            name="phone"       required  (10-digit US, contact only — NOT used for CTAs)
 *   5. ROI value        name="roiValue"    required (all options qualify)
 *   6. Timeline         name="timeline"    required (6+ months disqualifies)
 *
 * Qualifier logic:
 *   - timeline ∈ {asap, 1-3, 3-6 months}  → success + redirect to BRAND.calendlyUrl after 2s
 *   - timeline = 6+ months                → success w/ "we'll reach out as timeline gets closer"
 *   - lead submits in BOTH cases (CRM opt-in is true per task spec)
 */

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const ChevronDown = () => (
  <svg
    className="w-5 h-5 text-[var(--color-ink-muted)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export function FormCard({
  variant = "card",
  heading = "Book your free ROI assessment",
  subheading = "30 minutes. No obligation. You'll leave with a rough hours-saved estimate for your business.",
  idSuffix = "main",
}: Props) {
  const { submit } = useMegaLeadForm();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roiValue, setRoiValue] = useState("");
  const [timeline, setTimeline] = useState<TimelineValue | "">("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10;
  const canSubmit =
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    /@.+\./.test(email) &&
    phoneValid &&
    roiValue.length > 0 &&
    timeline.length > 0;

  // Auto-redirect to Calendly when qualified
  useEffect(() => {
    if (submitted && qualified) {
      const t = setTimeout(() => {
        window.location.href = BRAND.calendlyUrl;
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [submitted, qualified]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting || submitted) return;
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    const isQualified = qualifies(timeline as TimelineValue);
    try {
      await submit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phoneDigits,
        roiValue,
        timeline,
        qualified: isQualified ? "yes" : "no",
      });
    } catch (err) {
      console.error("Form submission failed:", err);
      // Per builder Hard Rule #12: still transition to success; don't strand user.
      setError("Something went wrong on our end — we also got your info.");
    } finally {
      setQualified(isQualified);
      setSubmitted(true);
      setSubmitting(false);
    }
  }

  const wrapperClass =
    variant === "hero"
      ? "bg-white/97 backdrop-blur rounded-2xl shadow-2xl shadow-[var(--color-accent)]/40 border border-white/40 p-6 sm:p-8"
      : variant === "inline"
      ? "bg-[var(--color-surface-alt)] rounded-2xl border border-[var(--color-line)] p-6 sm:p-8"
      : "bg-white rounded-2xl shadow-xl border border-[var(--color-line)] p-6 sm:p-8";

  const inputClass =
    "w-full rounded-lg border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition";

  if (submitted) {
    return (
      <div className={wrapperClass}>
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
            <svg
              className="w-7 h-7 text-[var(--color-primary)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {qualified ? (
            <>
              <h3 className="text-2xl font-bold text-[var(--color-accent)]">
                You&apos;re all set, {firstName || "there"}.
              </h3>
              <p className="text-[var(--color-ink-muted)] max-w-sm mx-auto">
                Redirecting you to our scheduler to pick a 30-min slot…
              </p>
              <a
                href={BRAND.calendlyUrl}
                className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-lg font-semibold text-base transition shadow-sm"
              >
                Open my booking page
              </a>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Didn&apos;t redirect? Click the button above.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-[var(--color-accent)]">
                Thanks, {firstName || "we got it"}.
              </h3>
              <p className="text-[var(--color-ink-muted)] max-w-sm mx-auto">
                We&apos;ve logged your info. We&apos;ll reach out as your
                timeline gets closer — no pressure.
              </p>
              <p className="text-sm text-[var(--color-ink-muted)]">
                In the meantime, you&apos;re welcome to email us at{" "}
                <span className="font-semibold text-[var(--color-accent)]">
                  {BRAND.email}
                </span>
                .
              </p>
            </>
          )}

          {error && (
            <p className="text-xs text-[var(--color-ink-muted)]">(Note: {error})</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="mb-5">
        <h3 className="text-2xl sm:text-[1.7rem] font-bold text-[var(--color-accent)] leading-tight">
          {heading}
        </h3>
        {subheading && (
          <p className="text-sm text-[var(--color-ink-muted)] mt-2">
            {subheading}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor={`fn-${idSuffix}`} className="sr-only">
              First name
            </label>
            <input
              id={`fn-${idSuffix}`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`ln-${idSuffix}`} className="sr-only">
              Last name
            </label>
            <input
              id={`ln-${idSuffix}`}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`email-${idSuffix}`} className="sr-only">
            Work email
          </label>
          <input
            id={`email-${idSuffix}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`phone-${idSuffix}`} className="sr-only">
            Phone number
          </label>
          <input
            id={`phone-${idSuffix}`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            pattern="\(\d{3}\) \d{3}-\d{4}"
            title="Enter a 10-digit US phone number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor={`roi-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            If AI freed up 40-60% of your team&apos;s time, what would that be worth?
          </label>
          <div className="relative">
            <select
              id={`roi-${idSuffix}`}
              name="roiValue"
              required
              value={roiValue}
              onChange={(e) => setRoiValue(e.target.value)}
              className={`${inputClass} appearance-none pr-10 ${
                roiValue === "" ? "text-[var(--color-ink-muted)]" : ""
              }`}
            >
              <option value="" disabled>
                Select an estimate
              </option>
              {ROI_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="text-[var(--color-ink)]">
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor={`timeline-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            How soon are you looking to start?
          </label>
          <div className="relative">
            <select
              id={`timeline-${idSuffix}`}
              name="timeline"
              required
              value={timeline}
              onChange={(e) => setTimeline(e.target.value as TimelineValue)}
              className={`${inputClass} appearance-none pr-10 ${
                timeline === "" ? "text-[var(--color-ink-muted)]" : ""
              }`}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {TIMELINE_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="text-[var(--color-ink)]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || submitting || submitted}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-lg font-semibold text-base transition shadow-sm mt-2"
        >
          {submitting ? "Submitting…" : BRAND.primaryCtaLabel}
        </button>

        <p className="text-[11px] text-[var(--color-ink-muted)] text-center leading-relaxed pt-1">
          By submitting, you agree to be contacted by ForwardIT about your
          assessment. Free, no-obligation 30-minute call.
        </p>
      </form>
    </div>
  );
}
