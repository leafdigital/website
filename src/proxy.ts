import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { localeForCountry } from "./i18n/geo";
import { LOCALE_CHOICE_COOKIE, LOCALE_HINT_COOKIE } from "./i18n/locale-choice";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const localePrefixes = routing.locales.map((locale) => `/${locale}`);

/** The locale named in the URL, if any. */
function localeFromPath(pathname: string) {
  return routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function hasLocalePrefix(pathname: string) {
  return localePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Named `proxy.ts` — Next 16 renamed `middleware.ts`. Handles the bare `/`
 * redirect and locale negotiation. Detection must happen here and not in a
 * page: a statically cached page cannot branch on request headers.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = handleI18nRouting(request);

  /**
   * Only unprefixed requests are negotiated, and their outcome depends on the
   * cookie and `accept-language`. Without `Vary`, a CDN would hand the first
   * visitor's redirect to everyone after them. Locale-prefixed URLs are
   * unaffected by either header, so they stay fully cacheable.
   */
  if (!hasLocalePrefix(pathname)) {
    response.headers.append("Vary", "Accept-Language");
    response.headers.append("Vary", "Cookie");
  }

  /**
   * Geo is a *suggestion only*, and it is published as a cookie rather than
   * read in a layout: touching headers() during render would drop every page
   * out of static generation. The banner is client-side; the page stays SSG.
   *
   * Suppressed once the visitor has made an explicit choice — someone who
   * picked a language should never be nagged about their IP.
   */
  const active = localeFromPath(pathname);
  const suggested = localeForCountry(
    request.headers.get("x-vercel-ip-country"),
  );
  /* NEXT_LOCALE is written on every request, so it proves nothing about intent. */
  const chose = request.cookies.has(LOCALE_CHOICE_COOKIE);

  if (active && suggested && suggested !== active && !chose) {
    response.cookies.set(LOCALE_HINT_COOKIE, suggested, {
      maxAge: 60 * 60,
      sameSite: "lax",
      path: "/",
    });
  } else if (request.cookies.has(LOCALE_HINT_COOKIE)) {
    response.cookies.delete(LOCALE_HINT_COOKIE);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next|_vercel|brand|.*\\..*).*)",
};
