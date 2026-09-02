"use client";

import { useEffect, useRef, useState } from "react";
import { useFormatter } from "next-intl";
import { cn } from "@/lib/utils";

type CoverageRingProps = {
  /** Products with real alt text. */
  covered: number;
  /** Total products scanned. */
  total: number;
  /** The line under the ring. Comes from a message file, never a default. */
  label: string;
  /** "of 3,102" — the denominator line inside the ring, already formatted. */
  totalLabel: string;
  /** What a screen reader hears in place of the whole figure. */
  ariaLabel: string;
  className?: string;
};

const RADIUS = 84;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION_MS = 1600;

/** easeOutCubic — fast start, gentle landing, like a scan settling. */
function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * The mirror: an SVG ring that fills to covered/total while the covered
 * number ticks up. Callers choose the framing — pass the deficit as
 * `covered` (with a matching label) to show the gap instead. Animation
 * starts when the ring scrolls into view; with prefers-reduced-motion it
 * renders the final state immediately.
 */
export function CoverageRing({
  covered,
  total,
  label,
  totalLabel,
  ariaLabel,
  className,
}: CoverageRingProps) {
  /* Locale-formatted, so the ticking number reads 2.451 in de and 2 451
   * in fr — `toLocaleString()` with no locale would follow the browser. */
  const format = useFormatter();
  const fraction = total > 0 ? covered / total : 0;
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    // Reduced motion = a zero-duration animation: same path, no tween.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : DURATION_MS;
    let frame: number;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
      setProgress(ease(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  const shownCovered = Math.round(covered * progress);
  const dash = CIRCUMFERENCE * (1 - fraction * progress);

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col items-center", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            strokeWidth="14"
            className="stroke-hairline-strong"
          />
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dash}
            transform="rotate(-90 100 100)"
            className="stroke-brand-600"
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="font-mono text-4xl font-extrabold tracking-tight tabular-nums">
            {format.number(shownCovered)}
          </span>
          <span className="text-ink-faint text-fine mt-1 font-mono tabular-nums">
            {totalLabel}
          </span>
        </div>
      </div>
      <p aria-hidden="true" className="text-muted-foreground text-fine mt-3">
        {label}
      </p>
    </div>
  );
}
