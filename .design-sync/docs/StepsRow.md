---
category: Patterns
---

# StepsRow

The numbered process row: columns divided by a hairline rule, not by gaps and
not by cards. Every page has one — it is where the site explains the ladder
each Leaf app climbs (audit → approval → earned autonomy).

- `steps` is `{ title, body }[]` and the layout is built for **three**
  (`md:grid-cols-3`). Two leave a column of air; four wrap into a second row
  and the rule stops running between neighbours.
- Step one's chip is filled `bg-primary` and the rest are the quiet
  `brand-50` wash — because step one is the only step the visitor actually has
  to take. That is automatic; do not re-tint it.
- `headingLevel` is `"h2" | "h3" | "h4"` (default `"h3"`). Pass `h2` only when
  the row is not sitting under a [SectionHeading](./SectionHeading.md), which
  already owns the section's `h2`.

It renders an `<ol>`, so the steps read as a sequence to a screen reader as
well as to an eye; the number chips are `aria-hidden` because the list already
carries the order. Wrap it in a [Section](./Section.md) with a
`SectionHeading` above and give it `className="mt-[60px]"` — the component
ships no top margin of its own. The `ink-faint` line underneath ("Audit →
approval → earned autonomy. This is how every Leaf app works.") is the house
closer, repeated on every app page on purpose.

```tsx
<Section>
  <SectionHeading kicker="How it works" title="Scan. Write. Speak." />
  <StepsRow
    className="mt-[60px]"
    steps={[
      {
        title: "Scan",
        body: "Free, on install, no setup. Your silent-image count in one number — graded, not counted.",
      },
      { title: "Write", body: "Every image actually looked at." },
      { title: "Speak", body: "Auto-pilot you earn." },
    ]}
  />
</Section>
```
