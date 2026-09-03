---
category: Patterns
---

# OfferCallout

The founder-offer note for a light ground, meant to sit inside a pricing card.
The dashed `brand-800/45` border on a `brand-50/60` wash is the whole point: it
reads as a note pinned to the plan, not as another plan.

- `label` is the offer's name in `text-kicker` `brand-800` — "Founding Curator".
  Not a sentence.
- `children` is a single sentence at 13.5px. Wrap the load-bearing words in
  `<strong>` and they pick up full ink against the muted line. If the offer
  needs a paragraph, it belongs somewhere else on the page.
- `className` is there for the spacing at the call site (`mt-4` inside a card),
  not for re-skinning it.

Its dark twin is [DarkOfferCallout](./DarkOfferCallout.md), for
[CtaBand](./CtaBand.md)'s `offer` slot.

## Dashed means quiet — check that is what you want

Nothing on the site currently renders this. `/image-voice`'s featured Curator
card ships a **filled green tile** instead, because there the offer has to
outrank the plan around it and an offer that reads as fine print does not get
taken. Reach for `OfferCallout` when the note should stay subordinate to the
card it sits in — a secondary plan, a terms note under a price. If it is the
reason the card exists, fill it instead.

```tsx
<OfferCallout label="Founding Curator">
  The <strong>first 25 merchants</strong> take Curator at{" "}
  <strong>half price, for life</strong> — $14.45/mo, and the title stays yours.
</OfferCallout>
```
