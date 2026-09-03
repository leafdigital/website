---
category: Primitives
---

# PillBadge

The one fully-round shape in v3 — `rounded-full` belongs to pills and badges and
nothing else, never to a container. It sits above a hero `h1` as
[HeroSplit](./HeroSplit.md)'s `badge` slot, or inside a card as a status marker.
13px, weight 500, `w-fit`.

- `tone="brand"` (default) is the **live app**: a `brand-50/85` wash with a
  `brand-800/25` hairline and `brand-900` text. Green means action, so this tone
  says "there is something here you can do today" — "Image Voice is live on the
  Shopify App Store".
- `tone="neutral"` is the **lab apps**: white ground, `hairline-strong` border,
  `muted-foreground` text. In the lab is a _status_, not an action — a green
  badge over an app you cannot install yet spends the accent on nothing. Every
  `/hidden-margin` and `/reorder-engine` hero badge is neutral.
- `asChild` swaps the `span` for whatever you pass, for the rare badge that is
  also a link.

Green here is a border and a tint, never a fill behind white text — that is what
keeps it above AA. Do not "fix" it to `bg-primary`.

The live dot is not built in: the caller supplies it as the first child, and it
must be `aria-hidden` because it repeats what the words already say.

```tsx
<PillBadge>
  <span aria-hidden="true" className="bg-brand-600 size-1.5 rounded-full" />
  Image Voice is live on the Shopify App Store
</PillBadge>

<PillBadge tone="neutral">Hidden Margin · in the lab · early access open</PillBadge>
```
