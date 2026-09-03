---
category: Primitives
---

# Badge

Small status pill: 24px tall, 12px caption type, fully round.

Nothing on the v3 site renders one — the hero pill is `PillBadge`, and
[AppCard](./AppCard.md) draws its own status pill inline so the whole card can
stay a single link. Reach for Badge when a screen needs a status marker neither
covers, and keep the same reading: `default` (green) is live, `outline` is
neutral or unreleased.

Variants: `default` · `secondary` · `destructive` · `outline` · `ghost` ·
`link`. `asChild` renders it as a link instead of a span.

Keep the text to one or two words — the pill is a fixed height and does not
wrap.

```tsx
<Badge>LIVE</Badge>
<Badge variant="outline">IN THE LAB</Badge>
```
