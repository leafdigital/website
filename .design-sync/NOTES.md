# design-sync notes — leaf-website

Repo-specific gotchas for future syncs. Read this before re-running.

## Run it with the wrapper, not the converter directly

```sh
node .design-sync/build.mjs           # css -> pkgdir -> converter, in that order
DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node .ds-sync/package-validate.mjs ./ds-bundle
```

`build.mjs` exists because the order matters: Tailwind must be compiled
**after** any preview is authored (a utility used only by a preview is
otherwise missing from the shipped CSS and the card renders unstyled — this bit
us once with `grid-cols-2`), and the package dir carries copies of that CSS.
A bare `package-build.mjs` run ships stale CSS.

## Why this repo needs a synthetic package dir

It is a Next.js app, not a published package, so `node_modules/leaf-website`
does not exist and the converter needs it (`PKG_DIR = <node-modules>/<pkg>`).

- Symlinking the repo into its **own** `node_modules` under its own name is a
  cycle: ts-morph's directory walk dies with `ENAMETOOLONG`.
- Pointing `PKG_DIR` at the repo root also makes that walk descend the real
  `node_modules` (13k `.d.ts`) and run node out of memory.

`.design-sync/setup-pkgdir.mjs` builds `.design-sync/.cache/nm` — a scratch
node_modules that shallow-symlinks the real one, plus a **minimal real**
`leaf-website/` dir containing only `package.json` (deliberately no
`main`/`module`/`exports`, which is what selects the synth-entry path),
`src` and `public` symlinks, and copies of the compiled CSS, fonts, docs and
shims. It is regenerated every build; nothing there is durable.

## The i18n shims are the thing that keeps this buildable

The site was localized after the first sync. Seven components under
`src/components` now import `next-intl` or `@/i18n/*`, and `next-intl` is a
Next client-runtime package that reads `process.env` at module scope.

**The design system ships as ONE module**, so a single module-scope `process`
reference anywhere in the graph takes down every preview in the bundle. The
first rebuild after localization went from a clean bundle to **0/37 components
rendering** — 25 hard errors and the rest "root empty", primitives included,
none of which touch i18n. The bundle also grew 228 KB → 625 KB.

Four aliases fix it (`setup-pkgdir.mjs`), and the render check went to 34/37:

- `next-intl` → `shims/next-intl.tsx`. Serves the **real English copy** out of
  `messages/en/*.json` and formats it with `intl-messageformat`, which is what
  next-intl uses underneath — so ICU arguments and number skeletons behave as
  they do in production instead of being approximated. `Header`, `Footer` and
  `WaitlistForm` are almost entirely copy; a preview of them reading
  `[[footer.rights]]` would be worse than useless.
- `@/i18n/navigation` → plain `<a>`, a no-op router, identity `getPathname`.
  Same trade the `next/link` shim already makes. `locale` is destructured off
  so it never lands on the rendered anchor.
- `@/i18n/routing` → the locale list as plain data. The real file calls
  `defineRouting` from `next-intl/routing`, which re-imports the runtime.
- `@/lib/analytics` → no-op `trackCta`. The real module pulls
  `@vercel/analytics` **and** `@next/third-parties/google`; the GA helper is
  gated on a `process.env`-derived flag, and a design session must never post
  events to the production properties.

`setup-pkgdir.mjs` also symlinks `messages/` into the package dir for the
first of those. **If a locale is added, update `shims/i18n-routing.ts` too** —
its list is a copy, not a derivation.

## Shims (`.design-sync/shims/`, aliased via the package dir's tsconfig)

- `next/link` → plain `<a>`, `next/image` → plain `<img>`. The real modules drag
  the Next client runtime into the bundle, whose bare `process.env` reads throw
  before anything mounts (bundle was 477 KB and every preview blank; now 228 KB).
- `next-image.tsx` inlines `/brand/leaf-logo.svg` as a data URI so `Header`
  renders the real logo — absolute public paths have no server behind them.
  **Add a line to its `PUBLIC_ASSETS` map when a component starts using another
  asset from `public/`.**
- `@/lib/constants` → a shim that imports a `process` guard first, then
  re-exports the real file. `src/lib/constants.ts` reads
  `process.env.NEXT_PUBLIC_SITE_INDEXABLE` at module scope; Next substitutes
  that at build time, a browser bundle does not. No values are duplicated.

## Two converter quirks worth knowing

- **tsconfig comment stripping.** The converter strips `/* */` before
  `JSON.parse`. The repo's tsconfig pairs an `"@/*"` key with a later
  `"**/*.ts"` glob, and the stripper reads that whole span as one block comment,
  mangles the JSON, and the paths plugin silently returns `null` — aliases never
  fire, with no error. `setup-pkgdir.mjs` therefore emits a **minimal** tsconfig
  (paths only, no include/exclude globs).
- **The paths plugin is first-match-wins, not longest-prefix.** Exact aliases
  must be listed _before_ the `"@/*"` wildcard or the wildcard shadows them.

## CSS is safelisted on purpose

Tailwind only emits classes it finds in the scanned sources: a build from this
repo alone carried ~190 utilities — just what the site happens to use. The
design agent composes _new_ layouts, so anything outside that set would silently
do nothing. `build-css.mjs` ships an `@source inline(...)` safelist of the
standard layout/spacing/type/colour vocabulary (~3,900 classes, 314 KB).
**Keep it in sync with the family table in `conventions.md`.**

The safelist was extended for v3 (2026-09-03) with the named type ramp
(`text-hero`/`text-h2`/`text-h2-lg`/`text-h3`/`text-kicker`/`text-fine`/
`text-caption`), the ink-and-surface families (`ink*`, `surface-*`,
`on-dark*`, `hairline*`, `brand-on-dark`), `white/<alpha>` for dark bands, the
four new shadows and the `animate-*` entrances. Before that a design agent
typing `text-h2-lg` or `bg-surface-deep` got a class that did nothing. CSS went
314 KB → 440 KB.

The scroll-reveal rules (`[data-armed]`, `[data-reveal-group] > *`) live at the
**top level** of `globals.css`, deliberately outside `@layer utilities` —
Tailwind v4 tree-shakes that layer against class names found in the source
scan, and attribute-only selectors match nothing, so they were silently
dropped from the compiled stylesheet. They ship in `_ds_bundle.css` now, but
they are inert here: only the site's bootstrapper sets `data-armed`. That is
correct — a design canvas renders content in its final state.

`--font-sans` is also declared there: `globals.css` has
`--font-sans: var(--font-sans)` inside `@theme inline`, which Next resolves by
setting the var on `<html>` via the `next/font` className. Nothing sets it in a
plain bundle, so without that declaration the var is self-referential and every
component renders in a **serif**. The `@font-face` itself ships via
`cfg.extraFonts` (`extractFonts` copies only `@font-face` rules — a `:root`
block in that file is dropped, which is why the var lives in the compiled CSS).

## Known render warns

- **`Footer`'s year comes from the capture clock**, not from today — the
  component reads the live year and the harness pins one. Currently renders
  "© 2026". Not a defect.
- **`CoverageRing` previews force `prefers-reduced-motion`.** The ring tweens
  for 1.6s on scroll-into-view and a screenshot otherwise catches it mid-count
  (856 instead of 1,255). The component already renders its final state under
  reduced motion, so the preview opts in. Designs get the real animation.
- **`Faq.Opened` opens the first row through the DOM** in a ref callback. `Faq`
  renders native `<details>` and takes no `open` prop, so without it the answer
  styling is never visible on any cell.

## Site bug found during the sync (not a sync artifact)

`src/components/layout/header.tsx` and `src/components/app-card.tsx` pass
`buttonVariants({ variant: "outline" })` straight to `className`. That skips
tailwind-merge, so the base `border-transparent` and the outline variant's
`border-border` both survive — and `.border-transparent` is emitted _after_
`.border-border` in the stylesheet, so the outline CTA renders **with no
border** on the live site. `Button` itself is fine (it runs `cn()`).
Fix is `<Button asChild variant="outline">…</Button>`. The `TrackedLink`
preview shows the failure beside the fix; `AppCard`'s previews render the
current (borderless) behaviour faithfully.

## The pre-commit hook and these files

`.design-sync/**` is in eslint's `globalIgnores` (a directory inside it makes a
bare `npm run lint` die with EISDIR). That interacts badly with `lint-staged`:
staging a preview made `eslint --max-warnings 0` emit _"File ignored because of
a matching ignore pattern"_ — a warning — and then fail the commit on it, for
every file, whether or not anything was actually wrong.

Fixed 2026-09-03 by adding `--no-warn-ignored` to the `lint-staged` command in
`package.json`. Real warnings in `src/` still fail the commit; deliberately
ignored paths no longer do.

So these files are **not** linted by the hook. Author them as if they were
anyway — they are read by a design agent as exemplars:

- **Use a typographic apostrophe (’) in JSX text**, not `'`.
- The shims carry file-level `eslint-disable` headers on purpose: they
  destructure Next-only props precisely so they are _not_ forwarded,
  `next-image.tsx` renders a plain `<img>` by design, and the analytics shim
  keeps unused parameters to preserve the real module's signature.
- Previews legitimately use raw `<a href="/internal-path">`. The locale-aware
  `Link` is not a design-system export and there is no Next router in a
  canvas, so `@next/next/no-html-link-for-pages` would be a false positive
  here. It only shows up under `--no-ignore`.

`prettier --write` still reformats staged previews during the commit, which
changes their source hash and therefore **clears their grades** — expect a
re-capture and re-grade pass after committing. Cheaper: run
`npx prettier --write .design-sync` _before_ the final build.

`prettier --write` also reformats staged previews during the commit, which
changes their source hash and therefore **clears their grades** — expect a
re-capture and re-grade pass after committing, and re-upload afterwards.
Cheaper alternative: run `npx prettier --write .design-sync` _before_ the final
build so the committed formatting is what you verified.

## Re-sync risks

- **The safelist is a hand-maintained list.** It is not derived from anything.
  New Tailwind utilities the brand adopts will not appear until added, and the
  `conventions.md` family table can drift from it. Re-check both together.
- **`PUBLIC_ASSETS` in `next-image.tsx` is hand-maintained.** A new image in a
  component renders broken until it is added there.
- **`AppCard` needs `cardMode: "column"`** in `cfg.overrides` — its stories
  are wider than the default grid cell and the product card crops them.
- **Grouping comes from `category` frontmatter** in `.design-sync/docs/*.md`.
  A new component with no doc lands in `general`; add a doc file with a
  `category` before syncing.
- **Fonts are fetched from Google Fonts** (`geist-latin.woff2`, committed under
  `.design-sync/fonts/`). Geist is served as one variable file covering
  weights 100–900. Nothing re-fetches it; it only changes if someone deletes it.
- **Chromium comes from the installed Google Chrome** via `DS_CHROMIUM_PATH`,
  not a playwright-managed browser (only the `playwright` driver is installed,
  with browser download skipped). If Chrome moves, the render check fails with
  `[RENDER_SKIPPED]`.
- **`src/lib/og.tsx` and the App Router pages are deliberately out of scope** —
  `cfg.srcDir` is `src/components`. Widening it pulls `next/og` and wasm into
  the bundle and the build fails.
