# Building with the Leaf Digital design system

These are the components behind leafdigital.co — a Shopify app studio's
marketing site. Small surface, opinionated brand rules. Read this before
composing a screen.

## Setup

No provider or theme wrapper. Import a component and render it; load
`styles.css` and everything is styled. `Geist` ships with the bundle and is the
default face — do not add a font stack of your own.

```tsx
import { Section, SectionHeading, HeroSplit, Button } from "<the DS>";
```

`Geist Mono` ships alongside it and is the same family — it is the face for
**numbers and data**, always with `tabular-nums`. It is not a second brand
face; never set prose in it.

The site is localized into six languages and every word lives in a message
file, so the components that render fixed copy (`Header`, `Footer`,
`WaitlistForm`) show the real shipped English here. Design around their content
rather than trying to configure it.

## The three brand rules that matter

**One accent.** Green means _action_. It belongs to CTAs, the `CoverageRing`,
the live-app badge, and the logo — nothing else. If green is on screen it is
either the thing you want the visitor to do or the number you want them to
feel. Alternating green sections defeats it.

**Contrast law.** The green ramp below `--color-brand-800` fails WCAG AA behind
white text. `bg-primary` is already `brand-800`, so use it. Never hand-roll
`bg-brand-500` + `text-white`. Below-800 greens are decoration only —
gradients, the ring stroke, the `bg-accent` wash. The one exception is the dark
band: on `bg-surface-dark`, `text-brand-on-dark` (`#7BC67F`) carries the
kicker, and only there.

**Ink, not gray.** Neutrals are a green-tinted ink ramp — `text-foreground`
(`#17211A`), `text-muted-foreground` (`#5B665E`), `text-ink-faint` (`#6C756E`,
captions and fine print only, never a link). Lines are alpha ink:
`border-border`, `border-hairline-soft`, `border-hairline-strong`. The
`neutral-*` gray scale is legacy — do not reach for it.

> `ink-faint` is `#6C756E` and not the `#8B948D` an older spec gives. The
> lighter value is 3.13:1 on white and fails AA on every line of fine print —
> on a site whose flagship app sells accessibility remediation. It was darkened
> along the same hue to clear 4.5:1. Do not lighten it back.

## Surfaces

| Surface             | Token              | For                                                             |
| ------------------- | ------------------ | --------------------------------------------------------------- |
| Page                | `bg-background`    | the default white ground                                        |
| Card                | `bg-card`          | every card, with `border-border` + `shadow-card`                |
| Quiet green wash    | `bg-accent`        | a band that should feel like the brand                          |
| Warm off-white      | `bg-surface-muted` | the "before" / "without" half of a comparison                   |
| Dark statement band | `bg-surface-dark`  | `#101911` — the villain section. Max 1–2 a page                 |
| Deepest ground      | `bg-surface-deep`  | `#0F1A10` — the footer, and the final CTA's first gradient stop |

On a dark surface, text is white at an alpha: `text-on-dark` for headings,
`text-on-dark-muted` (60%) for body, and `text-white/55` for the quieter
supporting line. Hairlines there are `border-white/12`.

## Styling idiom

Tailwind v4 utilities against semantic CSS variables. Prefer the semantic name
over a raw scale value — `bg-primary`, not `bg-brand-800` — so a token change
propagates.

| Family                        | Use these                                                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface                       | `bg-background` `bg-card` `bg-muted` `bg-secondary` `bg-accent` `bg-popover` `bg-surface-muted` `bg-surface-dark` `bg-surface-deep` `bg-ink-wash`                                                         |
| Text                          | `text-foreground` `text-muted-foreground` `text-ink-faint` `text-primary` `text-on-dark` `text-on-dark-muted` `text-brand-on-dark` `text-destructive`                                                     |
| Line                          | `border-border` `border-hairline-soft` `border-hairline-strong` `border-input` `ring-ring` `border-white/12`                                                                                              |
| Brand scale (decoration only) | `bg-brand-50` … `bg-brand-900`, `text-brand-800`, `stroke-brand-600`                                                                                                                                      |
| Radius                        | `rounded-lg` (12 — buttons, inner tiles) `rounded-xl` (16) `rounded-2xl` (18 — cards) `rounded-full` (pills only). The ladder caps at 18px; nothing softer exists.                                        |
| Shadow                        | `shadow-card` (the card's two layers) `shadow-cta` (green glow, hero CTAs) `shadow-cta-sm` (nav-height CTA) `shadow-featured` (green card lift) `shadow-on-dark` (white button on a dark band)            |
| Type                          | `text-hero` (72) `text-h2` (44) `text-h2-lg` (48 — dark bands, final CTA) `text-h3` (20) `text-kicker` (13/700/wide) `text-fine` (13) `text-caption` (12), plus `text-xs`…`text-6xl` for responsive steps |
| Motion                        | `animate-fade-up` (700ms entrance) `animate-aurora` / `animate-aurora-slow` (the drifting glow behind a hero or the final CTA). All reduced-motion safe.                                                  |

Layout, spacing, flex/grid and the `sm:` `md:` `lg:` `xl:` variants are all
available on the usual Tailwind scale.

**Headings are weight 800 with tight tracking; `h3` sits back at 700** so a
card title never competes with a section heading. Both are `text-wrap: balance`
by default.

## Motion

Hover **lifts**: −1px on a nav-height button, −2px on a hero CTA, −5px on a
card, 200ms. Colour moves in 150ms. An older version of this document said
nothing moves on hover; that is no longer true.

Entrances come in two kinds. Above the fold, `animate-fade-up` runs on load —
the hero cascades, with the headline pinned at 0ms because it is the page's
LCP element and must never wait on choreography. Below the fold, blocks reveal
as they scroll into view, driven by `data-reveal` / `data-reveal-group`
attributes and a small script that only exists on the real site.

**Do not add those attributes when composing here.** With no script to arm
them they are inert, which is deliberate — content renders in its final state
and a design canvas is never left with a blank section.

## Composing a page

Stack `Section`s — each supplies the vertical rhythm and the **1160px** content
column, so never re-measure padding per band.

- `tone="wash"` paints the quiet green background. `tone="dark"` is the
  full-bleed statement band — **max one or two per page**, or it stops landing.
  Pass the matching `tone="dark"` to `SectionHeading` inside it.
- `divided` replaces the gap above a section with a hairline rule inside the
  content column, for two bands that belong to the same argument.
- Use `Container` directly only for bars (`Header` does this).

`SectionHeading` is the standard kicker/title/sub block and always renders an
`h2`, left-aligned by default. `Kicker` is that label on its own, for above an
`h1` or inside a pattern.

What to reach for, in roughly the order a page uses them. (This is a
composition guide, not the pane's grouping — each component's own card sits in
whichever group its doc declares.)

| Pattern         | Its job                                                                    |
| --------------- | -------------------------------------------------------------------------- |
| `HeroSplit`     | the 7fr/5fr hero with the drifting radial glow; all slots                  |
| `DataCard`      | the hero visual — real numbers on hairlines, never photography             |
| `StatementRows` | the body of a dark band: statements stacked on hairlines, not cards        |
| `StepsRow`      | numbered columns divided by rules, not cards                               |
| `PullQuote`     | the centred beat between two arguing sections                              |
| `AppCard`       | one card per app; exactly one `featured` per grid                          |
| `OfferCallout`  | the dashed founder-offer note inside a pricing card                        |
| `CtaBand`       | the band every page ends on, with `DarkOfferCallout` for an offer          |
| `PillBadge`     | the one fully-round shape — `tone="brand"` for live, `neutral` for the lab |

## Three traps

**Styling a link as a button.** Wrap it: `<Button asChild variant="secondary">
<TrackedLink …/></Button>`. Passing `buttonVariants({ … })` straight to
`className` skips tailwind-merge and the button loses its border.

**Card titles and the page outline.** `CardTitle` renders a `div`. When the
title should appear in heading navigation, render a real heading instead —
which is what `AppCard` does.

**Custom type steps and `cn()`.** `text-hero`, `text-h2`, `text-kicker` and
friends are project tokens, not stock Tailwind. tailwind-merge does not know
them, so unless they are registered as font sizes it files them under
`text-color` — and any `text-ink-faint` in the same `cn()` call silently
deletes the size. `src/lib/utils.ts` registers them. If you copy `cn()` into a
new project, copy that registration with it.

## Where the truth is

Read `styles.css` and the files it imports for the full token set, and each
component's `.prompt.md` for its own API and gotchas.

## An idiomatic screen

```tsx
<HeroSplit
  badge={<PillBadge>Image Voice is live on the Shopify App Store</PillBadge>}
  title={
    <h1 className="lg:text-hero text-4xl tracking-[-0.045em] sm:text-6xl">
      Your money is <span className="text-primary">hiding.</span>
    </h1>
  }
  sub="Your Shopify, your 3PL, and your spreadsheet all tell a different story."
  cta={<Button size="lg">Scan my store free</Button>}
  finePrint="Free forever scan · No credit card · Your number in minutes"
  visual={<DataCard title="Inventory on hand" rows={rows} caption="Sample data — your scan is built from your store." />}
/>

<Section tone="dark">
  <SectionHeading
    tone="dark"
    kicker="Sound familiar?"
    title="You check three dashboards and still don’t know which number is real."
  />
  <StatementRows labelWidth="narrow" items={problems} />
</Section>

<Section>
  <SectionHeading kicker="The plan" title="Three steps between you and the hidden money" />
  <StepsRow className="mt-[60px]" steps={steps} />
</Section>
```
