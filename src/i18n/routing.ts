import { defineRouting } from "next-intl/routing";

/**
 * The single source of truth for locales and URL shape. Everything else —
 * navigation helpers, the proxy, generateStaticParams, the sitemap matrix —
 * derives from this object. See docs/i18n.md.
 */
export const routing = defineRouting({
  /**
   * `en` is authored; the other five are generated (docs/i18n.md §7).
   * All six are Latin-script, so the Geist `latin` subset already covers them.
   * URL segments are lowercase BCP-47: `pt-br`, never `pt-BR`.
   */
  locales: ["en", "es", "pt-br", "de", "fr", "it"],
  defaultLocale: "en",

  /**
   * Every locale is prefixed, English included. The `as-needed` alternative
   * special-cases the default locale in every link helper, canonical tag and
   * sitemap entry forever, to save one path segment. The site is not indexed
   * yet, so prefix-all costs nothing now and inherits no redirect debt.
   */
  localePrefix: "always",

  /**
   * Cookie → `accept-language`, in that order, on `/` only. An explicit locale
   * in the URL always wins and is never overridden.
   */
  localeDetection: true,

  /** Defaults to session-only; the user's switcher choice should outlive the tab. */
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },

  /**
   * The proxy sets alternate-language `Link` headers. We *also* emit
   * `<link rel="alternate">` tags from generateMetadata, because plenty of SEO
   * tooling only inspects the document head (docs/i18n.md §9).
   */
  alternateLinks: true,
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return (
    value !== undefined &&
    (routing.locales as readonly string[]).includes(value)
  );
}
