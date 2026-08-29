---
category: Primitives
---

# Accordion

Radix-backed disclosure list, bordered and rounded as one block. Use it for
grouped, interactive disclosure inside a page.

For a page's FAQ, prefer [Faq](./Faq.md) instead — it is the zero-JS
`<details>` version, and it exists because this accordion's hydration cost
pushed the alt-text page past its LCP budget.

## Parts

`AccordionItem` (one row, needs a unique `value`) · `AccordionTrigger` (the
clickable summary; renders its own chevron) · `AccordionContent` (the panel).

Set `type="single"` with `collapsible`, or `type="multiple"`. Pass
`defaultValue` to open a row on load — worth doing in a design so the open
state is visible.

```tsx
<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>Do you store my images?</AccordionTrigger>
    <AccordionContent>
      No. We read them, write the alt text, and forget them.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
