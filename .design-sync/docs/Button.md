---
category: Primitives
---

# Button

The site's action control. Green is reserved for actions — if a Button is
`default` (green), it should be the thing you want the visitor to do on that
screen. Everything secondary is `outline`, `secondary`, or `ghost`.

## Variants

`default` (brand green, the one accent) · `outline` · `secondary` · `ghost` ·
`destructive` (tinted red, not solid) · `link`

## Sizes

`lg` — hero CTAs; carries the `shadow-cta` glow.
`default` — the standard control, 40px tall.
`sm` — header and dense rows.
`icon` — square 40px; always pass an `aria-label`.

## Notes

- `asChild` renders the child element with Button's classes. This is the right
  way to style a link as a button — `<Button asChild variant="outline"><TrackedLink …/></Button>`.
  Passing `buttonVariants({ variant: "outline" })` as a raw `className` skips
  tailwind-merge and silently drops the border (see [TrackedLink](./TrackedLink.md)).
- Contrast law: the green ramp below 800 fails AA behind white text, so the
  `default` variant pairs `brand-800` with white. Don't hand-roll a lighter green
  button with white text.

```tsx
<Button size="lg">Scan my store free</Button>
<Button variant="outline">See the app</Button>
```
