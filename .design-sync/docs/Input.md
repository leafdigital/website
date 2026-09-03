---
category: Primitives
---

# Input

A single-line text field: 44px tall, 12px radius, one hairline border. Thin by
design — there is no label, help-text or error slot built in; compose those
around it.

Note that [WaitlistForm](./WaitlistForm.md) does **not** use this — it renders
its own 50px on-dark input, because it only ever sits on the dark CTA band. So
this is the field for any _new_ form on a light ground.

- Always pair with a `<label>`; use `sr-only` when the placeholder carries the
  meaning.
- Invalid state is driven by `aria-invalid`, not a prop.
- `disabled` dims to 50% and blocks pointer events.

```tsx
<label htmlFor="email" className="sr-only">Email for early access</label>
<Input id="email" type="email" required placeholder="you@yourstore.com" />
```
