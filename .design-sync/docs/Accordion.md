---
category: Primitives
---

# Accordion

Radix-backed disclosure list, bordered and rounded as one 18px block. Use it for
grouped, interactive disclosure inside a page.

For a page's FAQ, prefer [Faq](./Faq.md) instead — it is the zero-JS
`<details>` version, and it exists because this accordion's hydration cost
pushed an app page past its LCP budget on throttled mobile. Nothing on the v3
site uses this component today; it is here for a screen that genuinely needs
controlled open state.

## Parts

`AccordionItem` (one row, needs a unique `value`) · `AccordionTrigger` (the
clickable summary; renders its own chevron) · `AccordionContent` (the panel).

Set `type="single"` with `collapsible`, or `type="multiple"`. Pass
`defaultValue` to open a row on load — worth doing in a design so the open
state is visible.

```tsx
<Accordion type="single" collapsible defaultValue="break">
  <AccordionItem value="break">
    <AccordionTrigger>Can it break my store?</AccordionTrigger>
    <AccordionContent>
      No. Every write is verified by reading it back, and every change has a
      30-day undo.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
