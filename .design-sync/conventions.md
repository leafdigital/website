# Building with the Leaf Digital design system

These are the components behind leafdigital.io — a Shopify app studio's
marketing site. Small surface, opinionated brand rules. Read this before
composing a screen.

## Setup

No provider or theme wrapper. Import a component and render it; load
`styles.css` and everything is styled. `Geist` ships with the bundle and is the
default face — do not add a font stack of your own.

```tsx
import { Section, SectionHeading, AppCard, Button } from "<the DS>";
```

`Geist Mono` ships alongside it and is the same family — it is the face for
**numbers and data**, always with `tabular-nums`. It is not a second brand
face; never set prose in it.

## The two brand rules that matter

**One accent.** Green means _action_. It belongs to CTAs, the `CoverageRing`,
the `Live` badge, and the logo — nothing else. If green is on screen it is
either the thing you want the visitor to do or the number you want them to
feel. Everything else is neutral. Alternating green sections defeats it.

**Contrast law.** The green ramp below `--color-brand-800` fails WCAG AA behind
white text. `bg-primary` is already `brand-800`, so use it. Never hand-roll
`bg-brand-500` + `text-white`. Below-800 greens are for decoration only —
gradients, the ring stroke, the `bg-accent` wash. The single exception is the
dark band: on `bg-surface-dark` (`#0B120D`), `text-brand-on-dark` (`#7BC67F`)
carries the kicker, and only there.

**Ink, not gray.** Neutrals are a green-tinted ink ramp — `text-foreground`
(`#17211A`), `text-muted-foreground` (`#5B665E`), `text-ink-faint` (`#8B948D`,
captions and fine print only, never a link). Lines are alpha ink:
`border-border`, or `border-hairline-soft` / `border-hairline-strong`. The
`neutral-*` gray scale is legacy — do not reach for it.

## Styling idiom

Tailwind v4 utilities against semantic CSS variables. Prefer the semantic name
over a raw scale value — `bg-primary`, not `bg-brand-800` — so a token change
propagates.

| Family                        | Use these                                                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface                       | `bg-background` `bg-card` `bg-muted` `bg-secondary` `bg-accent` `bg-popover`                                                                                    |
| Text                          | `text-foreground` `text-muted-foreground` `text-primary` `text-card-foreground` `text-accent-foreground` `text-secondary-foreground` `text-destructive`         |
| Line                          | `border-border` `border-input` `ring-ring`                                                                                                                      |
| Brand scale (decoration only) | `bg-brand-50` … `bg-brand-900`, `text-brand-800`, `stroke-brand-600`                                                                                            |
| Neutrals                      | `bg-neutral-50` … `bg-neutral-900`, `text-neutral-500`                                                                                                          |
| Radius                        | `rounded-lg` (12px — buttons, inner tiles) `rounded-2xl` (18px — cards) `rounded-full` (pills only). The ladder is capped at 18px; nothing softer exists.       |
| Shadow                        | `shadow-card` (the card's two-layer shadow) `shadow-cta` (the green glow, key CTAs only)                                                                        |
| Type                          | `text-hero` (72) `text-h2` (44) `text-h3` (20) `text-kicker` (13/700/wide) `text-fine` (13) `text-caption` (12), plus `text-xs`…`text-6xl` for responsive steps |
| Motion                        | `animate-fade-up` (700ms entrance, reduced-motion safe), `duration-150` on hover — colour and background only, nothing moves                                    |

Layout, spacing, flex/grid and the `sm:` `md:` `lg:` `xl:` variants are all
available on the usual Tailwind scale.

## Composing a page

Stack `Section`s — each one supplies the vertical rhythm and the 1120px content
column, so never re-measure padding per band. `Section tone="wash"` paints the
quiet green background; `Section tone="dark"` is the full-bleed `#0B120D` band
for a big statement (the problem section, a final CTA) — **max one or two per
page**, or it stops landing. Pass the matching `tone="dark"` to
`SectionHeading` inside it. Use `Container` directly only for bars (`Header`
does this). `SectionHeading` is the standard kicker/title/sub block and always
renders an `h2`; `Kicker` is that label on its own, for above an `h1` or
inside a pattern.

The v3 pattern components: `HeroSplit` (7fr/5fr hero with the radial glow),
`DataCard` (the hero visual — real numbers, never photography), `StepsRow`
(numbered columns divided by hairlines, not cards), `OfferCallout` (the dashed
founder-offer note inside a pricing card), `PillBadge` (the one fully-round
shape).

## Two traps

**Styling a link as a button.** Wrap it: `<Button asChild variant="secondary">
<TrackedLink …/></Button>`. Passing `buttonVariants({ variant: "secondary" })`
straight to `className` skips tailwind-merge, so the base `border-transparent`
survives alongside the hairline and the button loses its border. Every call
site in the site now uses the `asChild` form.

**Card titles and the page outline.** `CardTitle` renders a `div`. When the
title should appear in heading navigation, render a real heading instead —
`<h3 className="font-heading text-h3">` — which is what `AppCard` does.

## Where the truth is

Read `styles.css` and the files it imports for the full token set, and each
component's `.prompt.md` for its own API and gotchas. `Header`, `Footer` and
`WaitlistForm` take **no props** — they render fixed content, so design around
them rather than trying to configure them.

## An idiomatic screen

```tsx
<Section>
  <SectionHeading
    kicker="What we build"
    title="Shopify apps that earn their keep"
    sub="Small, sharp tools for merchants who would rather fix the catalog."
  />
  <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {apps.map((app) => (
      <AppCard key={app.name} app={app} />
    ))}
  </div>
</Section>
```
