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
 * The hero figure from /image-voice, framed as the deficit: SAMPLE.silentImages
 * out of SAMPLE.totalImages, with the real ring copy and its sample caption.
 */
export const Default = () => (
  <figure className="flex flex-col items-center">
    <div className="border-hairline bg-card shadow-card rounded-2xl border px-10 py-8">
      <CoverageRing
        covered={2451}
        total={3102}
        label="of your images are silent"
        totalLabel="of 3,102"
        ariaLabel="2,451 of 3,102 of your images are silent"
      />
    </div>
    <figcaption className="text-caption text-ink-faint mt-3.5 text-center">
      Sample scan — yours takes minutes, free.
    </figcaption>
  </figure>
);

/** The same ring framed as coverage rather than gap — the label carries it. */
export const AsCoverage = () => (
  <CoverageRing
    covered={651}
    total={3102}
    label="of your images already speak"
    totalLabel="of 3,102"
    ariaLabel="651 of 3,102 of your images already speak"
  />
);
