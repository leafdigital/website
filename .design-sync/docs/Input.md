---
category: Primitives
---

# Input

A single-line text field. Thin by design — the site only collects an email, so
there is no label, help-text, or error slot built in; compose those around it.

- Always pair with a `<label>` (use `sr-only` when the placeholder carries the
  meaning, as `WaitlistForm` does).
- Invalid state is driven by `aria-invalid`, not a prop.
- `disabled` dims to 50% and blocks pointer events.

```tsx
<label htmlFor="email" className="sr-only">Email for early access</label>
<Input id="email" type="email" required placeholder="you@yourstore.com" />
```
