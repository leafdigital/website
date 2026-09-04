import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { indexedRoutes, lastModified, type AppRoute } from "@/lib/routes";
import { absoluteUrl, alternateLanguages } from "@/lib/metadata";

/* Same builder the canonical tags use — a sitemap that lists a URL the page
 * does not claim as its own is a sitemap arguing with the page. */
const url = (locale: string, route: AppRoute) => absoluteUrl(route, locale);

/**
 * Every indexed route in every locale, each entry carrying the full set of
 * language alternates so search engines can pair them up.
 *
 * Deliberately no `changefreq` or `priority`: Google ignores both and has
 * said so, and a sitemap full of ignored hints reads as one nobody maintains.
 * `lastmod` is the field it does read, so that is the field this file carries
 * — sourced from `lastModified` in src/lib/routes.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    indexedRoutes.map((route) => ({
      url: url(locale, route),
      lastModified: new Date(`${lastModified[route]}T00:00:00Z`),
      alternates: { languages: alternateLanguages(route) },
    })),
  );
}
