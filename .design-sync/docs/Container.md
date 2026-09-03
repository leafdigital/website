---
category: Layout
---

# Container

The page-width wrapper: a centred **1160px** column with 28px gutters. Every
full-width band on the site puts its content in one, so columns line up down the
page.

Reach for [Section](./Section.md) first — it already wraps its children in a
Container. Use Container directly only when you need the column without the
vertical rhythm: [Header](./Header.md), [Footer](./Footer.md) and `CtaBand` all
do exactly this.

```tsx
<Container className="flex h-16 items-center justify-between">…</Container>
```
