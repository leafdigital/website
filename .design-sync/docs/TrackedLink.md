---
category: Analytics
---

# TrackedLink

An internal link that reports a CTA event on click. Use it for every primary
call to action so click-through exists from day one; use a plain `Link` for
ordinary navigation.

- It wraps the **locale-aware** `Link`, so `href` is locale-relative
  (`/image-voice`, `/image-voice#pricing`, `/#apps`) — never write a locale into
  one, and never an absolute URL. For an off-site link (the App Store install)
  use [TrackedExternalLink](./TrackedExternalLink.md), which is a plain anchor
  with the same reporting.
- `event` is one of the fixed CTA names: `cta_scan_click`,
  `cta_install_click`, `cta_pricing_view`, `cta_contact_click`, `cta_app_view`,
  `cta_waitlist_join`.
- `eventProps` carries context. The convention is `{ location }` naming the
  page and slot — `"header"`, `"home-hero"`, `"home-hero-secondary"`,
  `"image-voice-cta"`, `"apps-grid"` — plus `{ app }` where a link is about one
  app.

## Making it look like a button

Wrap it in [Button](./Button.md) with `asChild`:

```tsx
<Button asChild size="lg">
  <TrackedLink
    href="/image-voice"
    event="cta_scan_click"
    eventProps={{ location: "home-hero" }}
  >
    Scan my store free
  </TrackedLink>
</Button>
```

Do **not** pass `buttonVariants({ … })` straight to `className`. `Button` runs
its classes through tailwind-merge; a raw class string does not, so the base
`border-transparent` and the variant's `border-hairline-strong` both survive and
the later stylesheet rule wins — the button renders with no border. Every call
site in the site now uses the `asChild` form, so this is a trap to avoid rather
than a bug to work around, but the mechanism is still live.
