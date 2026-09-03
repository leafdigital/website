---
category: Patterns
---

# AppCard

One card per app in the suite grid. The homepage `#apps` section is the only
index of the portfolio — `/apps` was retired with the v3 rebuild — so this is
the component that has to make three apps read as one suite.

The **whole card is the link**. There is no button inside it: a link inside a
card gives you a 32px target inside a 300px one, and every visitor aims at the
card anyway. Don't nest a [Button](./Button.md) in it.

- `app` is `{ name, status, statusLabel, description, href, cta }` — every
  field required. `href` is typed as an app route (`/image-voice`,
  `/hidden-margin`, `/reorder-engine`), and it is locale-relative: never write a
  locale into it.
- `statusLabel` and `cta` are **copy**, from `home.json` → `suite`
  (`"LIVE"` / `"IN THE LAB"`, `"See the app →"`). `status` (`"live" | "lab"`)
  records which kind of app it is; it does not style anything.
- `featured` is what styles the card: green wash, 1.5px green border,
  `shadow-featured`, a deeper green lift on hover. **Exactly one card per grid**
  may carry it — the one that is live today — or the grid stops saying which app
  works now.
- `headingLevel` is `h2` or `h3` (default `h3`). The name renders as a real
  heading so the portfolio appears in heading navigation; pick the level that
  keeps the page outline unbroken.
- The card has no `h-full`. For an equal-height row, give each grid cell
  `className="flex"` — that is what the homepage does with its `<li>`s.

It reports `cta_app_view` with `{ location: "apps-grid", app }` through
[TrackedLink](./TrackedLink.md); you get that for free.

```tsx
<ul className="grid gap-[18px] md:grid-cols-3">
  <li className="flex">
    <AppCard
      featured
      app={{
        name: "Image Voice",
        status: "live",
        statusLabel: "LIVE",
        description:
          "Your images are silent — to Google, to AI shoppers, to screen readers. Free scan, a real description for every image.",
        href: "/image-voice",
        cta: "See the app →",
      }}
    />
  </li>
</ul>
```
