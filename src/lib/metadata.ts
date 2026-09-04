import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { bcp47, ogLocale, routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "./constants";
import type { AppRoute } from "./routes";

/**
 * The one place a canonical or an hreflang is assembled.
 *
 * It exists because the layout cannot do this job: metadata inherits down the
 * tree, so an `alternates` block set once in the layout gave every page the
 * layout's URL — `/image-voice` shipped claiming `/en` as its canonical,
 * which tells a crawler the whole site is one duplicated page. The route has
 * to come from the route, so the call site has to be the page.
 *
 * Under `as-needed` the English URL has no locale segment, so none of these
 * strings can be built by hand; `getPathname` owns the shape.
 */
/**
 * The absolute URL of a route in a locale. Everything that emits a URL —
 * canonicals, hreflang, the sitemap, the document pages — goes through here,
 * so the site cannot advertise one spelling and list another.
 *
 * The root's trailing slash is dropped because Next normalises it away when
 * it resolves `alternates.canonical` against `metadataBase`; matching that
 * keeps the sitemap and the canonical byte-identical rather than merely
 * equivalent.
 */
export function absoluteUrl(route: AppRoute, locale: string) {
  const path = getPathname({ href: route, locale });
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * The BCP-47 tag for a locale segment. Everything that advertises a language
 * to a machine — `hreflang`, `<html lang>`, `inLanguage` — spells it this way;
 * only URLs use the segment. See `bcp47` in src/i18n/routing.ts.
 */
export function languageTag(locale: string) {
  return bcp47[locale as Locale] ?? locale;
}

/** The `language_TERRITORY` form Open Graph requires. */
export function openGraphLocale(locale: string) {
  return ogLocale[locale as Locale] ?? locale;
}

/**
 * `hreflang` for every locale plus `x-default`, keyed by language tag rather
 * than URL segment. Exported because the sitemap advertises the same set and
 * the two must not drift.
 */
export function alternateLanguages(route: AppRoute) {
  return {
    ...Object.fromEntries(
      routing.locales.map((l) => [languageTag(l), absoluteUrl(route, l)]),
    ),
    /* Googlebot arrives with no useful accept-language from a US IP, so
     * the fallback it is offered is the authored locale. */
    "x-default": absoluteUrl(route, routing.defaultLocale),
  };
}

export function localeMetadata(route: AppRoute, locale: string): Metadata {
  return {
    alternates: {
      canonical: absoluteUrl(route, locale),
      languages: alternateLanguages(route),
    },
    openGraph: {
      url: absoluteUrl(route, locale),
      locale: openGraphLocale(locale),
      type: "website",
    },
  };
}
