---
category: Patterns
---

# DataCard

The house alternative to photography: a card of real numbers, rows separated by
hairlines, values in Geist Mono with `tabular-nums` so the digits line up. This
is what goes in a [HeroSplit](./HeroSplit.md)'s `visual` slot, and it is the
default answer whenever a section wants an image.

- `rows` is `{ label, value, result? }[]`. The number always lives in `value` —
  `label` is prose, `value` is mono, and mixing them breaks the column of
  digits.
- Exactly one row may set `result: true`. It renders as a tinted `brand-50`
  tile with a green hairline: the figure the whole card exists to land ("The
  gap · 822 units · ~$19,700"). Put it last. Two results mean the card has no
  point.
- `title` is the 13px semibold `ink-faint` label above the rows — say what is
  being counted and over what, not a heading ("Inventory on hand · same SKU
  set, same day").
- `caption` is the 12px centred line underneath and it is doing **trust work**.
  Sample figures must say they are samples: "Sample data — your scan is built
  from your store." Drop the caption and the figures read as a case study,
  which this brand does not ship.
- Every figure comes from `SAMPLE` in `src/lib/constants.ts`. Never invent a
  number, a price or a store.

Rows are keyed by `label`, so labels have to be unique. It renders
`figure`/`dl` — a definition list of label/value pairs, not a table; reach for
a real `<table>` when you have more than one column of values.

```tsx
<DataCard
  title="Inventory on hand · same SKU set, same day"
  rows={[
    { label: "Shopify", value: "12,480 units" },
    { label: "Your 3PL", value: "12,118 units" },
    { label: "Your spreadsheet", value: "12,940 units" },
    { label: "The gap", value: "822 units · ~$19,700", result: true },
  ]}
  caption="Sample data — your scan is built from your store."
/>
```
