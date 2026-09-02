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
