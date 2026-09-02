import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { indexedRoutes, type AppRoute } from "@/lib/routes";
import { absoluteUrl } from "@/lib/metadata";

/* Same builder the canonical tags use — a sitemap that lists a URL the page
 * does not claim as its own is a sitemap arguing with the page. */
const url = (locale: string, route: AppRoute) => absoluteUrl(route, locale);

/**
 * Every indexed route in every locale, each entry carrying the full set of
 * language alternates so search engines can pair them up.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    indexedRoutes.map((route) => ({
      url: url(locale, route),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((l) => [l, url(l, route)])),
          "x-default": url(routing.defaultLocale, route),
        },
      },
    })),
  );
}
