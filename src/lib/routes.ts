/**
 * The route table. The sitemap and the nav both derive from here, so a page
 * cannot drift out of one and stay in the other.
 *
 * Paths are locale-relative — never write a locale into one. `Link` and
 * `getPathname` resolve them against the active locale.
 */

/** Indexed routes. These, times every locale, are the sitemap. */
export const indexedRoutes = [
  "/",
  "/image-voice",
  "/hidden-margin",
  "/reorder-engine",
  "/privacy",
  "/support",
] as const;

/**
 * Nothing is reachable-but-unlisted any more: /apps, /services and /blog were
 * retired with the v3 rebuild. The homepage `#apps` grid is the only index of
 * the portfolio, and each app owns its own route.
 */
export const unlistedRoutes = [] as const;

export type AppRoute =
  (typeof indexedRoutes)[number] | (typeof unlistedRoutes)[number];

/**
 * When each route's content last changed, `YYYY-MM-DD`.
 *
 * This is the sitemap's `<lastmod>`, and it is hand-maintained on purpose.
 * The two automatic sources are both worse: build time stamps every URL with
 * the same date on every deploy, which is the pattern Google learns to
 * discount, and `git log` cannot be trusted on a CI checkout that may be
 * shallow. A date that only moves when the words move is the one a crawler
 * can actually use.
 *
 * The rule: change a page's copy, change its date in the same commit. A stale
 * date here costs a recrawl; a fresh one on an unchanged page costs trust.
 */
export const lastModified: Record<AppRoute, string> = {
  "/": "2026-09-04",
  "/image-voice": "2026-09-04",
  "/hidden-margin": "2026-09-04",
  "/reorder-engine": "2026-09-04",
  "/privacy": "2026-09-02",
  "/support": "2026-09-04",
};
