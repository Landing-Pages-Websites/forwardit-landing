/**
 * Pure-CSS animated rotating-words component.
 *
 * The words are stacked vertically inside a clipped frame; the .rotating-words
 * keyframes in globals.css translate the stack one row at a time. CSS-only =
 * no hydration cost, no JS, no LCP impact.
 *
 * Caller is responsible for sizing the surrounding container — the longest
 * word determines visual width unless `widthCh` is provided.
 */
type Props = {
  words: readonly string[];
  /** Min width in `ch` units to keep layout stable. */
  widthCh?: number;
  className?: string;
};

export function RotatingWords({ words, widthCh, className = "" }: Props) {
  // Repeat the first word at the END so the loop seam reads as continuous.
  const ordered = [...words, words[0]];

  return (
    <span
      className={`rotating-words ${className}`}
      style={widthCh ? { minWidth: `${widthCh}ch` } : undefined}
      aria-label={words.join(", ")}
    >
      <span className="rotating-words-track">
        {ordered.map((w, i) => (
          <span key={`${w}-${i}`} className="rotating-words-item">
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
