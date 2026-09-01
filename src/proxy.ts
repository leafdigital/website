import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const localePrefixes = routing.locales.map((locale) => `/${locale}`);

/** True when the URL already names a locale, so nothing was negotiated. */
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
  const response = handleI18nRouting(request);

  /**
   * Only unprefixed requests are negotiated, and their outcome depends on the
   * cookie and `accept-language`. Without `Vary`, a CDN would hand the first
   * visitor's redirect to everyone after them. Locale-prefixed URLs are
   * unaffected by either header, so they stay fully cacheable.
   */
  if (!hasLocalePrefix(request.nextUrl.pathname)) {
    response.headers.append("Vary", "Accept-Language");
    response.headers.append("Vary", "Cookie");
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next|_vercel|brand|.*\\..*).*)",
};
