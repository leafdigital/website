---
category: Layout
---

# CtaBand

The band every page ends on: a green-to-near-black gradient (`surface-deep` →
`brand-900` → `brand-800`) with a slow white glow drifting behind it, and one
centred 736px column. The page has spent itself arguing by this point, so there
is exactly one thing to do here — `action` is it.

- `action` takes either a `Button` or a [WaitlistForm](./WaitlistForm.md). On a
  live app it is the install/scan button (`variant="onDark"`, `size="lg"`,
  `className="shadow-on-dark"`); on a lab app it is
  `<WaitlistForm source="hidden-margin" />`.
- `offer` sits above the action and takes a
  [DarkOfferCallout](./DarkOfferCallout.md) — only when there is a founder deal
  to state. Most pages have none.
- `note` is the line under the action, at `text-sm text-white/70`: the
  cross-link to the app a visitor did not come for. Style links inside it
  `font-semibold text-white` — `text-white/70` is too quiet to be a link.
- `id` is the in-page anchor every other CTA on the page points at —
  `#waitlist` on the lab pages, `#scan` on `/image-voice`.

`title` renders **inside the component's own `h2`**, so pass text or inline
nodes — never a heading element. It carries the 48px cut, which is the heavier
of the two h2 sizes.

It is a full-bleed `<section>` that supplies its own rhythm. Do **not** wrap it
in a [Section](./Section.md), and do not add `data-reveal` — the column already
reveals its children as a group, because with the offer tile and the form in it
the band can stand taller than a phone viewport.

Exactly one per page, and it is the last thing on the page, above
[Footer](./Footer.md).

```tsx
<CtaBand
  id="waitlist"
  title="Join the waitlist. Watch it prove itself first."
  sub="One list, every coming Leaf app — you’re first in line for all of them."
  offer={
    <DarkOfferCallout label="Founding-merchant offer">
      The first 15 stores get the top plan at the middle plan’s price.
    </DarkOfferCallout>
  }
  action={<WaitlistForm source="hidden-margin" />}
  note={
    <>
      Silent images are already fixable today.{" "}
      <a href="/image-voice" className="font-semibold text-white">
        Image Voice is live →
      </a>
    </>
  }
/>
```
