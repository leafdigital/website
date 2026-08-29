---
category: Layout
---

# Section

The vertical rhythm primitive: a `<section>` with the site's standard breathing
room (`py-16`, `py-24` from `sm`) that wraps its children in a
[Container](./Container.md). Build pages by stacking these rather than
re-measuring padding per band.

- `wash` paints the quiet green background (`bg-accent`) for bands that should
  feel like the brand. Use it sparingly — alternating every section defeats it.
- Pass `id` for in-page anchors (`#early-access`).

```tsx
<Section wash id="early-access">
  <SectionHeading title="Get early access" />
</Section>
```
