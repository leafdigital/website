---
category: Patterns
---

# CoverageRing

"The mirror": an SVG ring that fills to `covered / total` while the number ticks
up. The site's one piece of data theatre — the green here is the number we want
the visitor to feel, not a decoration to repeat elsewhere.

- The caller picks the framing. Pass the **deficit** as `covered` with a matching
  `label` to show the gap (what the homepage does), or the covered count for
  coverage.
- `label` defaults to `"products have real alt text"`.
- Animation starts when the ring scrolls into view and runs 1.6s; with
  `prefers-reduced-motion` it renders the final state immediately.

```tsx
<CoverageRing
  covered={1847}
  total={3102}
  label="products are missing real alt text"
/>
```
