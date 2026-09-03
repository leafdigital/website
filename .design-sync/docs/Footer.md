---
category: Layout
---

# Footer

The site's bottom bar, and the darkest surface on the page: `bg-surface-deep`
(`#0F1A10`), a shade heavier than the `CtaBand` it follows, with everything set
in 55% white above a `white/10` hairline. A footer that competes with the CTA
above it is a footer doing the wrong job — links only reach full white on hover.

Takes no props. It renders the copyright line (year and site name are ICU
arguments, so it is live), Privacy / Support / Contact (a `mailto:`) and the
`LocaleSwitcher` in its dark tone. Stacks on mobile, side-by-side from `sm`.

Like [Header](./Header.md), the link set is fixed in the component — compose
your own bar from [Container](./Container.md) if a design needs different links.

Every page ends `CtaBand` → `Footer`, so design it against a dark band above it,
never against white.
