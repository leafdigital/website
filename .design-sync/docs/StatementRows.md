---
category: Layout
---

# StatementRows

The body of a dark band: statements stacked on hairlines, not cards. Four
related facts in four cards read as four separate things, which is exactly the
wrong reading — the hairlines are what make them one argument.

**It only renders on a dark band.** The text is white and the rules are
`white/12`, so put it inside `<Section tone="dark">` under a
`<SectionHeading tone="dark">` or it is invisible. Every page gets one dark band
at most, and this is almost always what fills it.

- `items` is `{ label, statement, body? }[]`. `label` is the left column,
  `statement` is the 26px white line the row exists to make.
- `labelWidth` is the only variant and it is a real decision:
  - `"narrow"` (80px) for a **numbered sequence** — `01` `02` `03` `04`, the
    way Home lists the four ways the money hides. The statements start close to
    the numbers and the set reads as a count.
  - `"wide"` (220px, the default) for **named micro-labels** — `LOST TRAFFIC`,
    `THE CASH TRAP`, `TODAY` / `TOMORROW`. Two- and three-word labels need the
    column; give them `narrow` and they wrap into two lines beside every
    statement.
  - Picking `wide` for numbers leaves a 220px hole to the left of every line.
- `body` is optional per row, but decide it for the **whole set**: omit it when
  the statements are a list that lands by accumulation (Home, Reorder Engine),
  include it when each row has its own bill to explain (Image Voice's three
  prices, Hidden Margin's two). A set with body on some rows and not others
  reads as an accident.
- It carries its own `mt-16` — it expects a heading block above it, so do not
  add another top margin.

On mobile the label sits above its statement instead of beside it, so a long
label is safe there. A closing line after the rows
(`className="mt-10 text-[17px] text-white/55"`) is the house pattern for the
band's last word.

```tsx
<Section tone="dark">
  <SectionHeading
    tone="dark"
    kicker="One villain, three prices"
    title="Silence charges you three ways"
    className="max-w-[760px]"
  />
  <StatementRows
    items={[
      {
        label: "LOST TRAFFIC",
        statement: "Google skips them",
        body: "An image with no description never enters image search.",
      },
    ]}
  />
</Section>
```
