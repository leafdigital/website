---
category: Primitives
---

# Button

The site's action control. Green is reserved for actions — if a Button is
`default` (green), it should be the thing you want the visitor to do on that
screen. One green button per band.

## Variants

`default` — brand green, the one accent.
`secondary` — the v3 non-green button: white ground, one ink hairline, ink text.
This is the "See pricing" button beside every hero CTA.
`onDark` — white ground, `brand-900` text, for the dark band and the final CTA.
Once the ground is dark, green is the only colour that still reads as an
action, so the action turns white instead.
`ghost` · `destructive` (tinted, never solid) · `link`.
`outline` is kept as an **alias of `secondary`** so old call sites keep working
— v3 has one non-green button, not two. Prefer `secondary` in new work.

## Sizes

`lg` — 52px. Hero and closing CTAs; the only size that carries `shadow-cta`,
the green glow (which deepens on hover).
`default` — 44px, the standard control.
`sm` — 38px, the nav height. The header adds `shadow-cta-sm` itself; the size
does not.
`icon` — square 44px; always pass an `aria-label`.

## Notes

- **Hover lifts.** −1px at `default`/`sm`, −2px at `lg`, 200ms, and
  `motion-reduce` drops it. An older note here said buttons never move; the v3
  handoff specifies the lift and it won.
- `asChild` renders the child with Button's classes, and it is the only correct
  way to style a link as a button:
  `<Button asChild variant="secondary"><TrackedLink …/></Button>`. Passing
  `buttonVariants({ … })` as a raw `className` skips tailwind-merge and drops
  the border — see [TrackedLink](./TrackedLink.md).
- Contrast law: the green ramp below 800 fails AA behind white text, so
  `default` is `brand-800` + white. Don't hand-roll a lighter green button.
- `data-variant` and `data-size` land on the element if a parent needs to react
  to them.

```tsx
<Button size="lg">Run the free scan</Button>
<Button asChild size="lg" variant="secondary" className="shadow-none">
  <TrackedLink href="/image-voice#pricing" event="cta_pricing_view">
    See pricing
  </TrackedLink>
</Button>
```
