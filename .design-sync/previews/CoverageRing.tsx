import { CoverageRing } from "leaf-website";

// The ring tweens its number and arc for 1.6s once it scrolls into view, so a
// preview screenshot catches it mid-count. The component already renders its
// final state immediately under prefers-reduced-motion, so the card opts into
// that rather than showing a half-finished number. Designs built with the
// component still get the full animation.
if (typeof window !== "undefined") {
  const native = window.matchMedia.bind(window);
  window.matchMedia = ((query: string) =>
    query.includes("prefers-reduced-motion")
      ? { ...native(query), matches: true }
      : native(query)) as typeof window.matchMedia;
}

/**
 * The mirror number from the product blueprint — a real-looking store scan,
 * framed as the deficit the way the homepage uses it.
 */
export const Deficit = () => (
  <CoverageRing
    covered={1847}
    total={3102}
    label="products are missing real alt text"
  />
);

/** The same ring framed as coverage rather than gap. */
export const Coverage = () => <CoverageRing covered={1255} total={3102} />;

export const NearlyComplete = () => (
  <CoverageRing covered={2980} total={3102} />
);
