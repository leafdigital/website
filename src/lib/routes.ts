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
 * The content layer: routes that exist in English only.
 *
 * Six marketing pages is a ceiling. These are the pages that answer a buying
 * query rather than a branded one — the guide somebody reads before they
 * shortlist, and the two comparisons they read while shortlisting.
 *
 * English-only is a decision, not a backlog item. Two reasons, and the second
 * is the one that matters. The queries are English: somebody searching
 * "alttext.ai alternative" is typing a competitor's English brand name.
 * And every sentence on a comparison page is a factual claim about a company
 * that can change its pricing on a Tuesday — six translations of a claim is
 * six copies to keep true, and the stale ones are the ones nobody notices.
 *
 * They still RENDER in every locale, because a visitor who switches language
 * mid-journey must not hit a 404. What they do not do is get advertised as
 * six pages: each locale's copy declares the English URL as its canonical,
 * and the sitemap lists the English URL alone. See `contentCanonical`.
 */
export const contentRoutes = [
  "/guides/shopify-alt-text",
  "/image-voice/vs-alttext-ai",
  "/image-voice/vs-altking",
] as const;

export type ContentRoute = (typeof contentRoutes)[number];

export function isContentRoute(route: AppRoute): route is ContentRoute {
  return (contentRoutes as readonly string[]).includes(route);
}

/**
 * Nothing is reachable-but-unlisted any more: /apps, /services and /blog were
 * retired with the v3 rebuild. The homepage `#apps` grid is the only index of
 * the portfolio, and each app owns its own route.
 */
export const unlistedRoutes = [] as const;

export type AppRoute =
  | (typeof indexedRoutes)[number]
  | (typeof contentRoutes)[number]
  | (typeof unlistedRoutes)[number];

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
  "/guides/shopify-alt-text": "2026-09-04",
  "/image-voice/vs-alttext-ai": "2026-09-04",
  "/image-voice/vs-altking": "2026-09-04",
};
