# Leaf Digital — website

Business website for Leaf Digital (leafdigital.co): the apps portfolio, thesis
narrative, and agency services. Next.js 16 (App Router) + Tailwind v4.

## Context

- Replaces the static v1 site (repo: archive-site-v1-static) — which stays LIVE
  until domain cutover. Do not break it; do not archive it before cutover.
- Milestone 1 (blocks the alt-text app's Sep 5 App Store submission):
  /apps/alt-text landing page, /privacy, /support — deployed on a preview
  domain so the URLs exist for the submission.
- Milestone 2: port homepage positioning + the AI-shopping-agent widget + lead
  form from the v1 site (check what the current form posts to first), then
  domain cutover, then archive the v1 repo.
- Milestone 3: umbrella build-out — Products-primary IA, email capture.
- Content library (LinkedIn posts, salvaged docs): private repo leafdigital/business.

## Dev

```
npm install && npm run dev
```

Scripts: `dev` / `build` / `start` / `lint` / `typecheck` / `format` /
`format:check`. Husky + lint-staged format and lint staged files on commit.

## Brand

The canonical kit lives in [brand/](brand/): `tokens.json` (exact v1 colors +
type scale), `BRAND.md` (one-page brand note — green means act),
`leaf-logo.svg` (the full nav logo: mark + wordmark), `leaf-mark.svg`
(favicon), `leaf-wordmark.svg`, `og-image-v1.png`. The Tailwind v4 theme in
`src/app/globals.css` is generated from these values — change the kit, then
the theme, never just the theme.

## Search-engine indexing (pre-cutover guard)

This deploy ships `noindex` + robots `disallow` by default so it can never
compete with the live v1 site. The switch is the `NEXT_PUBLIC_SITE_INDEXABLE`
env var (see `src/lib/constants.ts`), flipped only at cutover.

## Domain cutover (Milestone 2 — zero DNS changes)

1. In the OLD Vercel project (the one holding leafdigital.co), swap the Git
   connection to `leafdigital/website`. Do not touch DNS.
2. Set `NEXT_PUBLIC_SITE_INDEXABLE=true` on that project and redeploy.
3. Verify robots.txt allows crawling and pages emit no `noindex`.
4. Update the App Store listing URLs to leafdigital.co paths if they were
   submitted on a preview domain.
5. Archive the v1 repo (only after all of the above).
