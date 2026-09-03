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
   * English is unprefixed: `/image-voice`, not `/en/image-voice`. Every other
   * locale keeps its segment.
   *
   * This reverses the Phase-0 decision (docs/i18n.md §3, amended). The
   * trade it warned about is real and is now paid deliberately: the default
   * locale is special-cased in every URL we build, which is why no component
   * may hand-write one — `getPathname` and `Link` are the only two places
   * that know the shape, and `src/lib/metadata.ts` is the only place a
   * canonical or an hreflang is assembled.
   *
   * next-intl redirects `/en/…` to `/…` on its own, so the prefixed URLs
   * that shipped before this change keep resolving rather than 404ing.
   */
  localePrefix: "as-needed",

  /**
   * Cookie → `accept-language`, in that order, on `/` only — `src/proxy.ts`
   * pins every other path. Under `as-needed` an unprefixed deep path is a
   * real English URL, and letting negotiation run on it would move a visitor
   * off a link somebody sent them. An explicit locale in the URL always wins.
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
