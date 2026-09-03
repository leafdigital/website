---
category: Patterns
---

# CoverageRing

"The mirror": a 200px SVG ring that fills to `covered / total` while the number
ticks up in `Geist Mono`. The site's one piece of data theatre — it is the hero
visual on `/image-voice`, and the green here is the number we want the visitor
to feel, not a decoration to repeat elsewhere.

- **Three copy props are required and have no defaults**: `label` (the line
  under the ring), `totalLabel` (the "of 3,102" denominator inside it) and
  `ariaLabel` (what a screen reader hears instead of the whole figure — the
  visual parts are all `aria-hidden`). They come from a message file, so the
  ring is translatable; an earlier version defaulted `label` in English and that
  was the bug.
- The caller picks the framing. `/image-voice` passes the **deficit** as
  `covered` with a matching label ("of your images are silent"); pass the
  covered count instead to show coverage. The component does no arithmetic
  beyond the ratio.
- Numbers are formatted for the active locale (2,451 · 2.451 · 2 451), so pass
  raw integers, never pre-formatted strings.
- Figures are sample data and live in `src/lib/constants.ts` under `SAMPLE`
  (`silentImages`, `totalImages`). Never invent a number, and always caption it
  as a sample — the real pages wrap the ring in a `<figure>` with a
  `figcaption`.
- The ring animates for 1.6s when it scrolls into view; `prefers-reduced-motion`
  renders the final state immediately. Fixed 200×200 — it does not scale with
  its container.

```tsx
<CoverageRing
  covered={2451}
  total={3102}
  label="of your images are silent"
  totalLabel="of 3,102"
  ariaLabel="2,451 of 3,102 of your images are silent"
/>
```
