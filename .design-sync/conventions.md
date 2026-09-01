# Building with the Leaf Digital design system

These are the components behind leafdigital.co — a Shopify app studio's
marketing site. Small surface, opinionated brand rules. Read this before
composing a screen.

## Setup

No provider or theme wrapper. Import a component and render it; load
`styles.css` and everything is styled. `Geist` ships with the bundle and is the
default face — do not add a font stack of your own.

```tsx
import { Section, SectionHeading, AppCard, Button } from "<the DS>";
```

## The two brand rules that matter

**One accent.** Green means _action_. It belongs to CTAs, the `CoverageRing`,
the `Live` badge, and the logo — nothing else. If green is on screen it is
either the thing you want the visitor to do or the number you want them to
feel. Everything else is neutral. Alternating green sections defeats it.

**Contrast law.** The green ramp below `--color-brand-800` fails WCAG AA behind
white text. `bg-primary` is already `brand-800`, so use it. Never hand-roll
`bg-brand-500` + `text-white`. Below-800 greens are for decoration only —
gradients, the ring stroke, the `bg-accent` wash.

## Styling idiom

Tailwind v4 utilities against semantic CSS variables. Prefer the semantic name
over a raw scale value — `bg-primary`, not `bg-brand-800` — so a token change
propagates.

| Family                        | Use these                                                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surface                       | `bg-background` `bg-card` `bg-muted` `bg-secondary` `bg-accent` `bg-popover`                                                                                          |
| Text                          | `text-foreground` `text-muted-foreground` `text-primary` `text-card-foreground` `text-accent-foreground` `text-secondary-foreground` `text-destructive`               |
| Line                          | `border-border` `border-input` `ring-ring`                                                                                                                            |
| Brand scale (decoration only) | `bg-brand-50` … `bg-brand-900`, `text-brand-800`, `stroke-brand-600`                                                                                                  |
| Neutrals                      | `bg-neutral-50` … `bg-neutral-900`, `text-neutral-500`                                                                                                                |
| Radius                        | `rounded-sm` `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-full`                                                                                      |
| Shadow                        | `shadow-sm` `shadow-md` `shadow-lg` `shadow-cta` (the CTA glow)                                                                                                       |
| Type                          | `text-xs`…`text-6xl`, `font-medium` `font-semibold` `font-bold` `font-extrabold`, `font-heading`, `tracking-tight`, `text-balance`, `leading-relaxed`, `tabular-nums` |

Layout, spacing, flex/grid and the `sm:` `md:` `lg:` `xl:` variants are all
available on the usual Tailwind scale.

## Composing a page

Stack `Section`s — each one supplies the vertical rhythm and the 1120px content
column, so never re-measure padding per band. `Section wash` paints the quiet
green background. Use `Container` directly only for bars (`Header` does this).
`SectionHeading` is the standard kicker/title/sub block and always renders an
`h2`.

## Two traps

**Styling a link as a button.** Wrap it: `<Button asChild variant="outline">
<TrackedLink …/></Button>`. Passing `buttonVariants({ variant: "outline" })`
straight to `className` skips tailwind-merge, so the base `border-transparent`
survives alongside `border-border` and the outline button loses its border. The
site's own `Header` and `AppCard` still do this — copy the `asChild` form, not
theirs.

**Card titles and the page outline.** `CardTitle` renders a `div`. When the
title should appear in heading navigation, render a real heading instead —
`<h3 className="font-heading text-xl font-bold">` — which is what `AppCard`
does.

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
