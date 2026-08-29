---
category: Layout
---

# SectionHeading

The standard heading block for a Section: optional uppercase `kicker`, an `h2`
`title`, and an optional `sub`. Centred in a `max-w-2xl` measure.

`title` is the only required prop, and it always renders an `h2` — so use this
under a page `h1`, not as the page title itself.

```tsx
<SectionHeading
  kicker="What we build"
  title="Shopify apps that earn their keep"
  sub="Small, sharp tools for merchants."
/>
```
