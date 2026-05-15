/**
 * Animated SVG wave divider used between sections.
 * Renders a layered wave with a subtle drift animation (no JS, pure SVG <animate>).
 *
 * Props:
 *   color       — fill color of the wave (defaults to var(--color-surface))
 *   bgColor     — background behind the wave (defaults to transparent)
 *   variant     — 'top' or 'bottom' — flips the wave for top-of-section vs bottom-of-section
 *   size        — 'sm' | 'md' | 'lg' — sets the height
 */
type Props = {
  color?: string;
  bgColor?: string;
  variant?: "top" | "bottom";
  size?: "sm" | "md" | "lg";
};

export function WaveDivider({
  color = "var(--color-surface)",
  bgColor = "transparent",
  variant = "bottom",
  size = "md",
}: Props) {
  const sizeClass =
    size === "sm" ? "wave-divider-sm" : size === "lg" ? "wave-divider-lg" : "";
  const flip = variant === "top" ? "rotate(180)" : "";

  return (
    <div
      aria-hidden="true"
      className={`wave-divider ${sizeClass}`}
      style={{ background: bgColor, transform: flip }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        {/* Back wave — slower drift */}
        <path
          d="M0,80 C240,30 480,130 720,80 C960,30 1200,130 1440,80 L1440,120 L0,120 Z"
          fill={color}
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M0,80 C240,30 480,130 720,80 C960,30 1200,130 1440,80 L1440,120 L0,120 Z;
              M0,80 C240,130 480,30 720,80 C960,130 1200,30 1440,80 L1440,120 L0,120 Z;
              M0,80 C240,30 480,130 720,80 C960,30 1200,130 1440,80 L1440,120 L0,120 Z
            "
          />
        </path>
        {/* Front wave — faster drift */}
        <path
          d="M0,90 C320,50 640,120 960,80 C1200,50 1320,100 1440,90 L1440,120 L0,120 Z"
          fill={color}
        >
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values="
              M0,90 C320,50 640,120 960,80 C1200,50 1320,100 1440,90 L1440,120 L0,120 Z;
              M0,90 C320,120 640,40 960,90 C1200,130 1320,50 1440,90 L1440,120 L0,120 Z;
              M0,90 C320,50 640,120 960,80 C1200,50 1320,100 1440,90 L1440,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
