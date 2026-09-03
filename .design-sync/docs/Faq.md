---
category: Patterns
---

# Faq

The page FAQ: native `<details>`/`<summary>` rows divided by hairlines, with a
`⌄` that rotates when a row opens. Keyboard- and screen-reader-accessible with
no JavaScript, which is the point — it ships no hydration cost, unlike
[Accordion](./Accordion.md).

Prefer this for page-level FAQ content. Reach for Accordion only when you need
controlled open state.

- Takes `items: { q, a }[]` and an optional `className` (the app pages give it
  `mt-12`). Rows are closed on load and it takes no `open` prop.
- It narrows nothing itself. Put it in a
  `<Section divided containerClassName="max-w-[800px]">`, which is how every app
  page runs its FAQ.

```tsx
<Section divided containerClassName="max-w-[800px]">
  <SectionHeading kicker="Due diligence" title="The questions we’d ask too" />
  <Faq
    className="mt-12"
    items={[{ q: "Can it break my store?", a: "No. …" }]}
  />
</Section>
```
