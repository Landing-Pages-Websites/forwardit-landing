"use client";

/**
 * Typewriter-style rotating words.
 *
 * Cycles through `words` with a backspace+retype animation:
 *   1. Type the current word, one char at a time.
 *   2. Hold for `holdMs`.
 *   3. Backspace one char at a time.
 *   4. Advance to the next word and repeat.
 *
 * Honors `prefers-reduced-motion` by showing only the first word, static.
 */
import { useEffect, useRef, useState } from "react";

type Props = {
  words: readonly string[];
  /** Min width in `ch` units to keep layout stable (longest word). */
  widthCh?: number;
  className?: string;
  /** Per-character type speed (ms). */
  typeMs?: number;
  /** Per-character delete speed (ms). */
  deleteMs?: number;
  /** Pause after a word fully types, before backspacing (ms). */
  holdMs?: number;
  /** Pause after a word fully deletes, before next types (ms). */
  gapMs?: number;
};

export function RotatingWords({
  words,
  widthCh,
  className = "",
  typeMs = 70,
  deleteMs = 40,
  holdMs = 1400,
  gapMs = 250,
}: Props) {
  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || words.length === 0) {
      setText(words[0] ?? "");
      return;
    }

    let cancelled = false;
    const schedule = (fn: () => void, ms: number) => {
      timerRef.current = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const typeWord = (word: string, i: number) => {
      if (i > word.length) {
        schedule(() => deleteWord(word, word.length), holdMs);
        return;
      }
      setText(word.slice(0, i));
      schedule(() => typeWord(word, i + 1), typeMs);
    };

    const deleteWord = (word: string, i: number) => {
      if (i < 0) {
        idxRef.current = (idxRef.current + 1) % words.length;
        schedule(() => typeWord(words[idxRef.current], 0), gapMs);
        return;
      }
      setText(word.slice(0, i));
      schedule(() => deleteWord(word, i - 1), deleteMs);
    };

    typeWord(words[idxRef.current], 0);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words, reduced, typeMs, deleteMs, holdMs, gapMs]);

  return (
    <span
      className={`rotating-words ${className}`}
      style={widthCh ? { minWidth: `${widthCh}ch` } : undefined}
      aria-label={words.join(", ")}
    >
      <span className="rotating-words-text">{text || "\u00A0"}</span>
      <span className="rotating-words-caret" aria-hidden>
        |
      </span>
    </span>
  );
}
