---
category: Layout
---

# Section

The vertical rhythm primitive: a `<section>` with the site's breathing room
(`py-20`, `py-[110px]` from `sm`) that wraps its children in a
[Container](./Container.md). Build pages by stacking these instead of
re-measuring padding per band.

- `tone` is `"default" | "wash" | "dark"` — **not** a boolean. `default` is the
  white ground; `wash` is the quiet green tint (`bg-accent`); `dark` is the
  full-bleed `#101911` statement band. **Max one or two dark bands per page**,
  or they stop landing. Every v3 page uses exactly one, for the villain
  section.
- On a dark band, pass `tone="dark"` to [SectionHeading](./SectionHeading.md)
  too — the section only sets the surface and 60%-white body copy, not the
  heading treatment. `StatementRows` is the usual body for one.
- `divided` replaces the top padding with a hairline rule inside the content
  column (`border-hairline-soft`, then `pt-16 sm:pt-[90px]`). Use it for two
  light sections that belong to the same argument; the app pages chain four or
  five of them.
- `containerClassName` narrows the column for a single band —
  `max-w-[800px]` for an [Faq](./Faq.md), for instance. `className` styles the
  band itself, which is where `id` anchors want `scroll-mt-16` to clear the
  sticky [Header](./Header.md).
- `data-tone` lands on the element, so a nested pattern can read the surface it
  is sitting on.

The final CTA is **not** a Section — it is `CtaBand`, which owns its own
gradient and column.

```tsx
<Section tone="dark">
  <SectionHeading
    tone="dark"
    kicker="Sound familiar?"
    title="You check three dashboards and still don’t know which number is real."
  />
</Section>

<Section id="pricing" divided className="scroll-mt-16">
  <SectionHeading kicker="Pricing" title="The magic happens before the paywall" />
</Section>
```
