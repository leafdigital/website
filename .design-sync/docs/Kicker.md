---
category: Layout
---

# Kicker

The small label that sits above a heading — `text-kicker` (13px / 700 / wide
tracking), uppercase, brand green. It names the argument the heading is about to
make. [SectionHeading](./SectionHeading.md) renders one for you from its
`kicker` prop; reach for `Kicker` directly for the label above an `h1`, or
inside a pattern component that builds its own heading block.

- `tone="light"` (default) is `brand-800` on white or on the `bg-accent` wash.
  `tone="dark"` is `brand-on-dark` (`#7BC67F`) — the one place in the system
  where a below-800 green legitimately carries text, and only on
  `bg-surface-dark` or the final CTA's gradient.
- Hero kickers add tracking: the app pages pass
  `className="tracking-[0.1em]"` above an `h1`, wider than the section kickers
  that use the token's own tracking. Match that if you are building a hero.

It renders a `<p>`, not a heading, which is correct — the kicker is not a level
in the page outline and must never stand in for the heading it labels. Put a
real `h1`/`h2` under it.

Two or three words, or one short line. It is a label, not a sentence — no
period.

```tsx
<Kicker>The plan</Kicker>
<h2 className="text-3xl sm:text-h2 mt-3.5 tracking-[-0.03em]">
  Three steps between you and the hidden money
</h2>
```
