---
category: Analytics
---

# TrackedExternalLink

The off-site twin of [TrackedLink](./TrackedLink.md). Leaving the site is
exactly the event worth counting — the Shopify App Store install — and the
locale-aware `Link` cannot carry an absolute URL, so this is a plain `<a>` with
the same reporting.

- `event` is one of the fixed CTA names; off-site it is effectively always
  `cta_install_click`.
- `eventProps` carries context, conventionally `{ location }` —
  `{ location: "image-voice-cta" }`.
- Pass `rel="noreferrer"`, as every call site does. Nothing forces `target`, and
  the site deliberately does not open a new tab: an install flow that replaces
  the page is the one the merchant expects.

Use it **only** for absolute URLs. Internal navigation goes through
`TrackedLink`, which keeps the locale prefix; this one would send an `en`
visitor to an unprefixed path.

To make it look like a button, wrap it — `<Button asChild>` runs its classes
through tailwind-merge, and passing `buttonVariants({ … })` to `className`
instead loses the border. On [CtaBand](./CtaBand.md)'s dark ground the install
button is `variant="onDark"`.

```tsx
<Button asChild size="lg" variant="onDark" className="shadow-on-dark">
  <TrackedExternalLink
    href="https://apps.shopify.com/image-voice"
    rel="noreferrer"
    event="cta_install_click"
    eventProps={{ location: "image-voice-cta" }}
  >
    Install on the Shopify App Store
  </TrackedExternalLink>
</Button>
```
