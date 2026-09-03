---
category: Layout
---

# Header

The sticky top bar: logo, one nav link, and a CTA. Renders the whole bar
including its own [Container](./Container.md) at `h-16` — drop it in at the top
of a page, it takes no props.

- **The CTA is per-page**, because the next step is per-page. A client component
  reads the (locale-stripped) pathname and looks it up: `/image-voice` →
  "Free scan" to `#scan`, `/hidden-margin` → "Get early access" to `#waitlist`,
  `/reorder-engine` → "Join the waitlist" to `#waitlist`, and everywhere else —
  homepage, privacy, support — "Free scan" to `/image-voice`. In a design canvas
  the path is `/`, so you see that default.
- The nav is **"Apps" plus that CTA**, nothing more. "Apps" points at `/#apps`;
  there is no `/apps` index any more. The old "Guides" link is gone.
- The CTA is a `sm` [Button](./Button.md) with `shadow-cta-sm` wrapping a
  [TrackedLink](./TrackedLink.md) that reports `{ location: "header" }`.
- It earns its edge on the way down: at rest it sits on the hero with no seam,
  and the `header-settle` animation brings in the hairline and a whisper of
  shadow once the page moves under it. The bar itself is `bg-white/75` with a
  24px backdrop blur.
- Because it is sticky at 64px, any section you anchor to needs
  `scroll-mt-16`.

To design a different navigation, compose your own bar from `Container` +
`Button` rather than trying to configure this one.
