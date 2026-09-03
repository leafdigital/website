# Leaf Digital — website

Business website for Leaf Digital (leafdigital.io): the apps portfolio and the
thesis behind it. Next.js 16 (App Router) + Tailwind v4, six locales.

## Pages

| Route             | What it is                                            |
| ----------------- | ----------------------------------------------------- |
| `/`               | The suite. Hero, the villain, the plan, the apps grid |
| `/image-voice`    | The live app — free audit, pricing, FAQ               |
| `/hidden-margin`  | In the lab — readiness score, sample report, waitlist |
| `/reorder-engine` | Coming soon — the trust ladder, waitlist              |
| `/privacy`        | Tier-3 document (MDX per locale)                      |
| `/support`        | Utility copy + FAQ                                    |

English is unprefixed (`/image-voice`); every other locale carries its segment
(`/de/image-voice`). Old `/en/…` URLs redirect to the short form. Never build
a locale URL by hand — `Link` and `getPathname` own the shape, and
`src/lib/metadata.ts` is the only place a canonical or hreflang set is built.
`src/lib/routes.ts` is the one route table the sitemap and the nav both derive
from. `/apps`, `/services`
and `/blog` were retired with the v3 rebuild — the homepage `#apps` grid is
the only index of the portfolio.

Page copy lives in `messages/{locale}/{page}.json`, never in TSX
(`docs/i18n.md` §4). Sample figures and offer counts live in
`src/lib/constants.ts` — they are all expected to change.

## Context

- Replaces the static v1 site (repo: archive-site-v1-static) — which stays LIVE
  until domain cutover. Do not break it; do not archive it before cutover.
- Milestone 1 (blocks Image Voice's App Store submission): the /image-voice
  landing page, /privacy, /support — deployed on a preview domain so the URLs
  exist for the submission.
- Milestone 2: domain cutover, then archive the v1 repo.
- Milestone 3: umbrella build-out — Products-primary IA, email capture.
- Content library (LinkedIn posts, salvaged docs): private repo leafdigital/business.

## Dev

```
npm install && npm run dev
```

Scripts: `dev` / `build` / `start` / `lint` / `typecheck` / `format` /
`format:check` / `i18n:check` / `i18n:stamp`. Husky + lint-staged format and
lint staged files on commit. `build` runs `i18n:check` first, so a missing or
stale translation fails the build rather than shipping a half-English page.

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

## Domain cutover (Milestone 2 — leafdigital.co → leafdigital.io)

The site now lives on leafdigital.io; `SITE_URL` in `src/lib/constants.ts` is
the only place the code knows that.

1. Add `www.leafdigital.io` (and the apex) to the Vercel project serving this
   repo, and point the .io DNS at Vercel.
2. Set `NEXT_PUBLIC_SITE_INDEXABLE=true` on that project and redeploy.
3. Verify robots.txt allows crawling and pages emit no `noindex`.
4. Verify leafdigital.io in Resend — the waitlist route sends from
   `waitlist@leafdigital.io` and Resend rejects unverified senders.
5. Point leafdigital.co at a 301 to the matching leafdigital.io path, so the
   v1 site's link equity follows rather than competes.
6. Update the GA4 data stream URL on property `G-7RHWEPW611` to the .io host.
7. Update the App Store listing URLs to leafdigital.io paths.
8. Archive the v1 repo (only after all of the above).
