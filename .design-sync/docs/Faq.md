---
category: Patterns
---

# Faq

The page FAQ: native `<details>`/`<summary>` rows, divided by hairlines. Keyboard-
and screen-reader-accessible with no JavaScript, which is the point — it ships no
hydration cost, unlike [Accordion](./Accordion.md).

Prefer this for page-level FAQ content. Reach for Accordion only when you need
controlled open state.

Takes `items: { q, a }[]`.

```tsx
<Faq
  items={[
    { q: "Do you store my images?", a: "No — we read them and forget them." },
  ]}
/>
```
