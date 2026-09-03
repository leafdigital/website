import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { localeForCountry } from "./i18n/geo";
import { LOCALE_CHOICE_COOKIE, LOCALE_HINT_COOKIE } from "./i18n/locale-choice";
import { routing } from "./i18n/routing";

/**
 * Two routers, and the difference between them is the whole locale policy.
 *
 * `negotiate` reads the cookie and `accept-language`; `pin` reads neither and
 * resolves an unprefixed path to English. Only the bare `/` gets the first
 * one. Under `as-needed`, `/image-voice` is a real English URL rather than an
 * undecided one, and running detection on it would take a visitor off a link
 * somebody deliberately sent them (docs/i18n.md §3).
 */
const negotiate = createMiddleware(routing);
const pin = createMiddleware({ ...routing, localeDetection: false });

/**
 * The locale the URL names. Under `as-needed` an unprefixed path names the
 * default locale just as explicitly as `/de` names German — there is no
 * "no locale here" case any more.
 */
function localeFromPath(pathname: string) {
  return (
    routing.locales.find(
      (locale) =>
        locale !== routing.defaultLocale &&
        (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
    ) ?? routing.defaultLocale
  );
}

/**
 * Named `proxy.ts` — Next 16 renamed `middleware.ts`. Handles the bare `/`
 * redirect and locale negotiation. Detection must happen here and not in a
 * page: a statically cached page cannot branch on request headers.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isRoot = pathname === "/";
  const response = isRoot ? negotiate(request) : pin(request);

  /**
   * `/` is the one URL whose response depends on the cookie and on
   * `accept-language`. Without `Vary`, a CDN would hand the first visitor's
   * redirect to everyone after them. Every other path resolves from the
   * pathname alone, so it stays fully cacheable on both headers.
   */
  if (isRoot) {
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

  if (suggested && suggested !== active && !chose) {
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
