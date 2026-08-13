"use client";

import { useState, useEffect, useRef } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  BUDGET_OPTIONS,
  YEARS_IN_BUSINESS_OPTIONS,
  ANNUAL_REVENUE_OPTIONS,
  TIMELINE_OPTIONS,
  type BudgetValue,
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
 * Shared lead form — fields updated per client Google Doc 2026-05-14
 * (task 2cfce493-3d93-4dce-95f1-efc8f0698176).
 *
 * Fields (EXACT, in submit order):
 *   1. firstName              required
 *   2. lastName               required
 *   3. email                  required
 *   4. phone                  required (10-digit US)
 *   5. budget                 required
 *   6. yearsInBusiness        required
 *   7. annualRevenue          required
 *   8. decisionMakers         required (free text — name + title)
 *   9. timeline               required
 *
 * Submission policy (Anthony directive 2026-05-20, task fb289155 / 048ae6ac):
 *   - EVERY filled form submits to the lead API. Period.
 *   - The LP no longer computes a qualified/disqualified verdict. The
 *     `lead_qualification_rules` engine in the platform owns that decision
 *     server-side based on the same field values.
 *   - All leads are then pushed downstream (HubSpot etc) by the backend
 *     routing pipeline regardless of their server-side qualification verdict.
 *
 * UX:
 *   - Every successful submit shows the same "you're booked" success state
 *     and redirects to Calendly after 2s. No client-side branching.
 *
 * Anti-disruption pattern (button type="button" + validate-first + direct
 * performSubmit, no native submit event) prevents the Mega optimizer from
 * beaconing form_submit before the fetch resolves. Success, tracking, and the
 * Calendly redirect all gate on a server-confirmed {ok:true} response, so a
 * failed submit fires no conversion and shows a retryable error instead.
 */

const SUBMIT_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again, or email us at info@theforwardit.com.";

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
  heading = "Book your free strategy call",
  subheading = "30 minutes. No obligation. You'll leave with a rough hours-saved estimate for your business.",
  idSuffix = "main",
}: Props) {
  const { submit } = useMegaLeadForm();
  const formRef = useRef<HTMLFormElement>(null);
  const inFlightRef = useRef(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState<BudgetValue | "">("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [decisionMakers, setDecisionMakers] = useState("");
  const [timeline, setTimeline] = useState<TimelineValue | "">("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10;
  const canSubmit =
    firstName.trim().length >= 1 &&
    lastName.trim().length >= 1 &&
    /@.+\./.test(email) &&
    phoneValid &&
    budget.length > 0 &&
    yearsInBusiness.length > 0 &&
    annualRevenue.length > 0 &&
    decisionMakers.trim().length >= 2 &&
    timeline.length > 0;

  // Every successful submit auto-redirects to Calendly. No LP-side
  // qualifier branch — the backend decides qualified/dq routing.
  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => {
        window.location.href = BRAND.calendlyUrl;
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  async function performSubmit() {
    if (inFlightRef.current) return;
    if (!canSubmit) return;
    inFlightRef.current = true;
    setSubmitError(null);
    setSubmitting(true);
    const b = budget as BudgetValue;
    const t = timeline as TimelineValue;
    try {
      const res = await submit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phoneDigits,
        budget: b,
        yearsInBusiness,
        annualRevenue,
        decisionMakers: decisionMakers.trim(),
        timeline: t,
      });
      // A 2xx whose body is not {ok:true} is still a dropped lead.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      // Manual form_submit event fire — required because our submit handler
      // fires no native submit event, so the optimizer's native submit
      // auto-detect never runs (AGENTS.md Hard Rule #5). Fields are passed as
      // separate keys so they land as separate columns in Mega Events /
      // Keystone (Peter mandate 2026-05-14). Fires ONLY after the server
      // confirms the lead, so we never bill a conversion for a dropped lead.
      if (typeof window !== "undefined" && window.MegaTag?.trackEvent) {
        try {
          window.MegaTag.trackEvent("form_submit", {
            element: `form-${idSuffix}`,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phoneDigits,
            budget: b,
            yearsInBusiness,
            annualRevenue,
            decisionMakers: decisionMakers.trim(),
            timeline: t,
          });
        } catch (trackErr) {
          // Tracking is best-effort — never block the user on it.
          console.warn("MegaTag.trackEvent failed:", trackErr);
        }
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission failed:", err);
      // The visitor is fine; the LEAD would be dropped. Surface a retryable error and
      // fire NO tracking, so we never bill a conversion for a lead that does not exist.
      setSubmitError(SUBMIT_ERROR_MESSAGE);
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  }

  // The form fires no native submit: onSubmit only prevents default. All
  // submission goes through handleButtonClick → performSubmit so the Mega
  // optimizer never beacons form_submit before the fetch resolves.
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  // Validate-first, then submit directly. We deliberately avoid dispatching a
  // native submit event, which the Mega optimizer auto-detects at click time.
  function handleButtonClick() {
    if (!canSubmit) {
      // Show native validation messages
      formRef.current?.reportValidity();
      return;
    }
    performSubmit();
  }

  // Restore Enter-to-submit that the native submit path used to provide. Ignore
  // Enter in textareas so multi-line inputs still work (there are none today).
  function handleFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter") return;
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
    e.preventDefault();
    handleButtonClick();
  }

  const wrapperClass =
    variant === "hero"
      ? "bg-white/97 backdrop-blur rounded-2xl shadow-2xl shadow-[var(--color-accent)]/40 border border-white/40 p-6 sm:p-7"
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
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-accent)] leading-tight">
          {heading}
        </h3>
        {subheading && (
          <p className="text-sm text-[var(--color-ink-muted)] mt-2">
            {subheading}
          </p>
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate={false}
        className="space-y-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            htmlFor={`budget-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            What is your budget for an AI & Automation solution?
          </label>
          <div className="relative">
            <select
              id={`budget-${idSuffix}`}
              name="budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetValue)}
              className={`${inputClass} appearance-none pr-10 ${
                budget === "" ? "text-[var(--color-ink-muted)]" : ""
              }`}
            >
              <option value="" disabled>
                Select a budget range
              </option>
              {BUDGET_OPTIONS.map((opt) => (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={`yib-${idSuffix}`}
              className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
            >
              Years in business
            </label>
            <div className="relative">
              <select
                id={`yib-${idSuffix}`}
                name="yearsInBusiness"
                required
                value={yearsInBusiness}
                onChange={(e) => setYearsInBusiness(e.target.value)}
                className={`${inputClass} appearance-none pr-10 ${
                  yearsInBusiness === "" ? "text-[var(--color-ink-muted)]" : ""
                }`}
              >
                <option value="" disabled>
                  Select
                </option>
                {YEARS_IN_BUSINESS_OPTIONS.map((opt) => (
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
              htmlFor={`rev-${idSuffix}`}
              className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
            >
              Annual revenue
            </label>
            <div className="relative">
              <select
                id={`rev-${idSuffix}`}
                name="annualRevenue"
                required
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                className={`${inputClass} appearance-none pr-10 ${
                  annualRevenue === "" ? "text-[var(--color-ink-muted)]" : ""
                }`}
              >
                <option value="" disabled>
                  Select
                </option>
                {ANNUAL_REVENUE_OPTIONS.map((opt) => (
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
        </div>

        <div>
          <label
            htmlFor={`dm-${idSuffix}`}
            className="block text-xs font-semibold text-[var(--color-ink)] mb-1.5 uppercase tracking-wider"
          >
            Key decision maker(s) — name &amp; title
          </label>
          <input
            id={`dm-${idSuffix}`}
            name="decisionMakers"
            type="text"
            required
            placeholder="e.g., Jane Smith, Managing Partner"
            value={decisionMakers}
            onChange={(e) => setDecisionMakers(e.target.value)}
            className={inputClass}
          />
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

        {submitError && (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-red-300 bg-[#fef3f2] px-3.5 py-2.5 text-sm font-medium !text-[#b91c1c]"
          >
            {submitError}
          </p>
        )}

        {/* type="button" + validate-first + direct performSubmit per AGENTS.md
            Hard Rule #5: no native submit event, so the Mega optimizer never
            beacons form_submit before the fetch resolves. */}
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={submitting || submitted}
          className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-700)] hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-700)] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-lg font-bold text-base transition shadow-lg shadow-[var(--color-primary)]/30 mt-2 group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? "Submitting…" : BRAND.primaryCtaLabel}
            {!submitting && (
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            )}
          </span>
        </button>

        <p className="text-[11px] text-[var(--color-ink-muted)] text-center leading-relaxed pt-1">
          By submitting, you agree to be contacted by ForwardIT about your
          strategy call. Free, no-obligation 30-minute call.
        </p>
      </form>
    </div>
  );
}
