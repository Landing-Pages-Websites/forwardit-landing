"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { FAQS } from "@/lib/content";

/**
 * FAQ section — all items collapsed by default per Rule #11.
 */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[var(--color-surface)] py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Common questions</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] leading-tight tracking-tight">
            What SMBs usually ask before they book.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.question} delay={i * 60}>
                <div
                  className={`rounded-xl border bg-white transition ${
                    isOpen
                      ? "border-[var(--color-primary)]/40 shadow-md"
                      : "border-[var(--color-line)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-[var(--color-accent)] text-base sm:text-lg">
                      {f.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-primary)] transition-transform duration-200 ${
                        isOpen ? "rotate-45 bg-[var(--color-primary-50)]" : ""
                      }`}
                    >
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
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-[var(--color-ink-muted)] leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <PrimaryCTA />
        </Reveal>
      </div>
    </section>
  );
}
