---
category: Patterns
---

# DarkOfferCallout

The founder-offer tile for a dark band — frosted glass (`bg-white/8`, a
`white/20` hairline, `backdrop-blur-sm`), so it reads as something laid on top
of the CTA rather than another paragraph of it. It exists for the `offer` slot
of [CtaBand](./CtaBand.md).

- `label` is the offer's name in `text-kicker` `brand-on-dark` — "Founding
  Curator", "Founding-merchant offer". Not a sentence.
- `children` is one sentence. Wrap the load-bearing words in `<strong>` and they
  come up to full white against the `white/75` line; everything else stays
  quiet. That contrast is the only emphasis available here.
- Both props are required and it renders nothing useful without children.

It is frosted, so it needs a dark ground with something behind it to blur —
`CtaBand`'s gradient, or `bg-surface-dark`. On a light ground use its dashed
twin, [OfferCallout](./OfferCallout.md), instead. Never place it on white: the
`white/8` fill disappears and the `white/75` text fails AA.

An offer states inventory ("the first 15 stores") and a price mechanic. It never
states a date.

```tsx
<DarkOfferCallout label="Founding-merchant offer">
  The first 15 stores get{" "}
  <strong>the top plan at the middle plan’s price</strong> — locked for life.
</DarkOfferCallout>
```
