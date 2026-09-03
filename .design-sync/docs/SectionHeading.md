---
category: Layout
---

# SectionHeading

The standard heading block for a [Section](./Section.md): optional `kicker`, an
`h2` `title`, and an optional `sub`.

- **Left-aligned by default.** v3 sets section headings against the content
  column's left edge in a `max-w-[660px]` measure; `align="center"` is the
  exception (a centred `max-w-2xl`), not the norm.
- `tone="dark"` for a heading on a `Section tone="dark"` band: white heading at
  the heavier 48px cut (`text-h2-lg`), 60%-white sub, and the kicker switches to
  `text-brand-on-dark`. The section does not do this for you.
- `title` always renders an `h2`, so this goes **under** a page `h1`, never as
  the page title. Pass a `ReactNode` when part of it needs an accent span.
- `className` widens or narrows the measure — the dark bands on the real pages
  use `max-w-[760px]`.

For the kicker on its own — above an `h1`, or inside a pattern component — use
[Kicker](./Kicker.md) instead.

```tsx
<SectionHeading
  kicker="The suite"
  title="The plan, made real"
  sub="Small, sharp apps. Each one finds money in a specific seam — then does the work itself."
/>
```
