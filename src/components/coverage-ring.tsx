"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CoverageRingProps = {
  /** Products with real alt text. */
  covered: number;
  /** Total products scanned. */
  total: number;
  label?: string;
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
 * The mirror: an SVG ring that animates to the store's coverage fraction
 * while the missing-count ticks up. Animation starts when the ring scrolls
 * into view; with prefers-reduced-motion it renders the final state
 * immediately.
 */
export function CoverageRing({
  covered,
  total,
  label = "products have real alt text",
  className,
}: CoverageRingProps) {
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
      aria-label={`${covered.toLocaleString()} of ${total.toLocaleString()} ${label}`}
    >
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            strokeWidth="14"
            className="stroke-neutral-200"
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
          <span className="text-4xl font-extrabold tracking-tight tabular-nums">
            {shownCovered.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">
            of {total.toLocaleString()}
          </span>
        </div>
      </div>
      <p aria-hidden="true" className="text-muted-foreground mt-3 text-sm">
        {label}
      </p>
    </div>
  );
}
