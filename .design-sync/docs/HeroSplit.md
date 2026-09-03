---
category: Patterns
---

# HeroSplit

The v3 page opener: a left-aligned 7fr/5fr split with a 64px gutter, a soft
green glow drifting behind the copy, and an entrance that cascades down the
column. Every page starts with exactly one of these; nothing else on the site
is allowed to look like it.

It is all slots, because the hero is the one place per page where the copy
dictates the composition — the component guarantees only the geometry, the glow
and the choreography.

- `title` is the only required prop, and it is **your own `h1`** — the
  component does not wrap it. Ship the site's cut:
  `className="text-4xl tracking-[-0.045em] sm:text-6xl lg:text-hero"`, with
  **exactly one word** wrapped in `<span className="text-primary">`. One green
  word per hero; a second one is a different brand.
- `badge` is a [PillBadge](./PillBadge.md): `tone="brand"` with a
  `bg-brand-600` dot for a shipped app, `tone="neutral"` for a lab app —
  "in the lab" is a status, not an offer.
- `kicker` sits between badge and headline and only the lab pages use it (a
  `Kicker` with `tracking-[0.1em]`, e.g. "Hidden margins kill businesses").
  Home omits it deliberately: the headline is the claim there.
- `sub` is wrapped for you — 520px measure, `text-muted-foreground`, 18/20px.
  Pass a string or rich nodes, not your own `<p>`.
- `cta` is a row: one solid `Button size="lg"`, one
  `variant="secondary" className="shadow-none"`. Links go inside
  `<Button asChild>`, never `buttonVariants()` on a className.
- `finePrint` is the 13px `ink-faint` reassurance line under the buttons
  ("Free forever scan · No credit card · Your number in minutes"). `ink-faint`
  never carries a link, so keep it plain text.
- `visual` is the right column and it is a **card of real numbers** —
  [DataCard](./DataCard.md), a [CoverageRing](./CoverageRing.md) in card
  chrome, a score card. Never a photograph, never a device mockup. Omit it and
  the copy column simply holds its 7fr width.

It renders its own `<section>` and [Container](./Container.md), so do not wrap
it in a [Section](./Section.md). The glow is `aria-hidden` decoration. The
headline is the LCP element on every page and is deliberately excluded from the
entrance delays — do not add your own animation classes to it.

```tsx
<HeroSplit
  badge={
    <PillBadge>
      <span aria-hidden="true" className="bg-brand-600 size-1.5 rounded-full" />
      Image Voice is live on the Shopify App Store
    </PillBadge>
  }
  title={
    <h1 className="lg:text-hero text-4xl tracking-[-0.045em] sm:text-6xl">
      Your money
      <br />
      is <span className="text-primary">hiding.</span>
    </h1>
  }
  sub="Your Shopify, your 3PL, and your spreadsheet all tell a different story. And the money hides in the gaps."
  cta={
    <>
      <Button size="lg">Scan my store free</Button>
      <Button size="lg" variant="secondary" className="shadow-none">
        See the apps
      </Button>
    </>
  }
  finePrint="Free forever scan · No credit card · Your number in minutes"
  visual={
    <DataCard
      title="…"
      rows={rows}
      caption="Sample data — your scan is built from your store."
    />
  }
/>
```
