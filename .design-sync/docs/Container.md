---
category: Layout
---

# Container

The page-width wrapper: a centred 1120px column with 24px gutters. Every full-width
band on the site puts its content in one, so columns line up down the page.

Reach for [Section](./Section.md) first — it already wraps its children in a
Container. Use Container directly only when you need the column without the
vertical rhythm (the header and footer bars do exactly this).

```tsx
<Container className="flex h-16 items-center justify-between">…</Container>
```
