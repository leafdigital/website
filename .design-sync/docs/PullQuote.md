---
category: Patterns
---

# PullQuote

The centred beat between two arguing sections: the sentence a merchant actually
says to themselves, or the question the page has been circling. No kicker, no
CTA, nothing to click — it exists to be agreed with, and then the next section
answers it.

- `title` and `sub` are both **required strings**. `title` is a 40px `h2` in a
  720px centred measure; `sub` is the concession underneath ("So has everyone —
  and the catalog grows faster than the someday ever comes").
- Write `title` as one of two things: a line in curly quotes that the visitor
  has said out loud (`"“I’ve been meaning to clean it up someday.”"`), or a
  flat question (`"Why does nobody send the PO?"`). Not a claim — a claim
  belongs in a [SectionHeading](./SectionHeading.md).
- It renders its own `<section>` with the site's vertical rhythm and its own
  [Container](./Container.md), so do **not** wrap it in a
  [Section](./Section.md).

One per page. It works because the bands on either side of it disagree — both
app pages put it directly after the dark statement band and before the section
that answers it, on white, with nothing else in the band. Two of these in a
page and neither lands.

```tsx
<PullQuote
  title="Why does nobody send the PO?"
  sub="Because a purchase order commits real money — and that takes trust no forecasting tool has earned."
/>
```
