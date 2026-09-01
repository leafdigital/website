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
  "/apps",
  "/apps/alt-text",
  "/privacy",
  "/support",
] as const;

/**
 * Reachable and linked, but deliberately kept out of the sitemap: /services is
 * the quiet door pending a sunset decision, /blog is a stub with no posts.
 */
export const unlistedRoutes = ["/services", "/blog"] as const;

export type AppRoute =
  (typeof indexedRoutes)[number] | (typeof unlistedRoutes)[number];
