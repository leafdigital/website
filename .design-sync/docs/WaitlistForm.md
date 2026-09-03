---
category: Patterns
---

# WaitlistForm

The early-access capture: one email field and one button, styled **on-dark**.
It only ever renders as the `action` of the final `CtaBand` on a lab app page
(`/hidden-margin`, `/reorder-engine`) — near-white input, white button, white
status line. On a light ground it disappears.

- `source` is **required**: which page the signup came from
  (`"hidden-margin"`, `"reorder-engine"`). It rides the POST body and the
  `cta_waitlist_join` event, and it is the only thing distinguishing one
  signup from another.
- **One list, every app.** There is no app-choice control — a choice would
  imply separate lists and there is exactly one. If a page needs to say which
  app is coming, that belongs in the CtaBand's `title` / `note`, not in here.
- Posts to `/api/waitlist`. On success the whole form is replaced by the
  confirmation line, so a design of the success state is a paragraph, not a
  cleared field. All copy comes from `common.json` → `waitlist`.
- 50px controls (taller than a `Button`, to match the CTA band's scale), a
  hidden honeypot field, and a `sr-only` label on the input.

Self-contained — design _around_ it. Don't rebuild the fields to reword them.

```tsx
<CtaBand
  id="waitlist"
  title="Run the free scan. See your score."
  action={<WaitlistForm source="hidden-margin" />}
/>
```
