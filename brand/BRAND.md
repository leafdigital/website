# Leaf Digital — brand note (one page)

Mined from the live v1 site (`archive-site-v1-static`), 2026-08-10.
Canonical tokens: [tokens.json](tokens.json). Assets: `leaf-mark.svg`,
`leaf-wordmark.svg`, `og-image-v1.png`.

## Green means act

Green is the one accent, and it is reserved: **actions (CTAs), the coverage
ring, and the logo**. Everything else is neutral. If a screen has green on it,
it should be the thing you want the visitor to do or the number you want them
to feel.

- Logo green: `#176639` (deep forest — mark + wordmark only).
- Action green: `#4CAF50 → #388E3C` ramp (v1 CTA gradient runs 500→700).
- Tints (`#f0fdf4` / `#dcfce7`) for badges and quiet section washes only.
- **Contrast law:** green as _text_ on white starts at green-700 (`#388E3C`).
  green-500 on white is decoration-only — it fails 4.5:1. One exception, added
  in v3: on the dark band (`#101911`), `#7BC67F` carries the kicker.
- **a11y deviation (2026-09-02):** `ink-faint` ships as `#6C756E`, not the
  `#8B948D` the v3 handoff specified. The original is 3.13:1 on white — it
  fails AA everywhere it is used (fine print, captions, meta rows) and drops
  the Lighthouse accessibility score below the repo's `1.0` gate. Darkened
  along the same hue to clear 4.5:1 on white and on `surface-muted`.

## Type

v1 shipped Poppins 300–800. v2 settled on **Geist Sans via `next/font`**
(self-hosted, zero layout shift, sharper at small sizes), and v3 adds **Geist
Mono** for numbers and data — same family, so the one-face rule holds.

v3 scale (supersedes the v1 numbers below): hero 72/800/-0.045em/1.02,
section 44/800/-0.03em/1.08, card 20/800/-0.02em, kicker 13/700 uppercase
+0.08em above every h2, body 16–18/1.6–1.65, fine print 13, caption 12.
Headings are always `text-wrap: balance`. Full values in
[tokens.json](tokens.json) under `v3`.

_v1, for reference:_ hero 52/800 tight (-1px), section 40/700, card 22/700,
sub 18/1.7, body 15–16/1.6, badges 12/700 uppercase.

## Voice line

Smart friend who happens to be an expert. The merchant is the hero; we hand
them the mirror and the fix. No corporate filler — if a sentence could open a
bank's annual report, cut it.

## Continuity notes

- OG images: 1200×630, white-on-green or green-on-white, wordmark bottom-left
  (see `og-image-v1.png` for the v1 style).
- Favicon = the mark, unchanged (`leaf-mark.svg`).
- v1's blue/amber utility colors are dropped in v2 — one accent, neutrals, done.
- v3 moves the neutrals off pure gray onto a green-tinted ink ramp
  (`#17211A` / `#5B665E` / `#8B948D`) and sharpens the radius ladder to a fixed
  12px (buttons, tiles) / 18px (cards) / 999px (pills only).
