---
category: Analytics
---

# TrackedLink

A link that reports a CTA event on click. Use it for every primary call to
action so click-through exists from day one; use a plain link for ordinary
navigation.

- `event` is one of the fixed CTA names: `cta_scan_click`, `cta_install_click`,
  `cta_pricing_view`, `cta_contact_click`, `cta_app_view`, `cta_waitlist_join`.
- `eventProps` carries context, conventionally `{ location }` and sometimes
  `{ app }`.

## Making it look like a button

Wrap it in `Button` with `asChild`:

```tsx
<Button asChild variant="outline">
  <TrackedLink
    href="/apps/alt-text"
    event="cta_app_view"
    eventProps={{ location: "app-card" }}
  >
    See the app
  </TrackedLink>
</Button>
```

Do **not** pass `buttonVariants({ variant: "outline" })` straight to `className`.
`Button` merges its classes with tailwind-merge; a raw class string does not, so
the base `border-transparent` and the outline variant's `border-border` both
survive and the later stylesheet rule wins — the outline button renders with no
border. The `RawVariantClasses` preview shows the failure next to the fix.

The solid (`default`) variant is unaffected, so
`buttonVariants({ size: "sm" })` for a green CTA is safe.
