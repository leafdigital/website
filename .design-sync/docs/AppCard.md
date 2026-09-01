---
category: Patterns
---

# AppCard

One card per app in the portfolio, shared by the homepage strip and `/apps` so
the list reads identically in both places.

Takes an `app` object: `{ name, status: "live" | "lab", description, href?, cta? }`.

- `status: "live"` shows a green **Live** badge and, with `href` + `cta`, an
  outline CTA to the app.
- `status: "lab"` shows an outline **In the lab** badge and always links to the
  `/#early-access` form — lab cards promise no dates and carry no inline inputs.
- `headingLevel` picks `h2` or `h3` (default `h3`) so the card's name slots into
  the page outline without skipping a level.

```tsx
<AppCard
  app={{
    name: "Leaf Alt Text",
    status: "live",
    description: "…",
    href: "/apps/alt-text",
    cta: "See the app",
  }}
/>
```

## Known issue

Both CTAs style themselves with `buttonVariants({ variant: "outline" })` passed
straight to `className`, which skips tailwind-merge — so the outline button
renders **without its border**. The previews show this faithfully. The fix is in
the component's source: wrap the link in `<Button asChild variant="outline">`.
