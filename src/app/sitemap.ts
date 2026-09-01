import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { indexedRoutes } from "@/lib/routes";
import { SITE_URL } from "@/lib/constants";

const url = (locale: string, route: string) =>
  `${SITE_URL}${getPathname({ href: route, locale })}`;

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
