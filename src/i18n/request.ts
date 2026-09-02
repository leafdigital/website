import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";

/**
 * Per-request i18n config. Messages are split one namespace per file
 * (docs/i18n.md §4) and merged here, so `useTranslations("support")` reads
 * `messages/{locale}/support.json`.
 */
const namespaces = [
  "common",
  "og",
  "support",
  "home",
  "imageVoice",
  "hiddenMargin",
  "reorderEngine",
] as const;

/**
 * Resolution order, and why it needs two steps:
 *
 * 1. An explicitly passed locale — `getTranslations({locale})`. Route handlers
 *    (opengraph-image and friends) MUST use this: `next/root-params` throws
 *    inside them, and Next says support there is still to come.
 * 2. `next/root-params`, the Next 16.3 way to read the `[locale]` segment
 *    without threading `params` through every layout.
 *
 * Deliberately NOT `requestLocale`: it derives from headers, and awaiting it
 * opts every page out of static rendering. Anything it would have caught is
 * outside the `[locale]` segment and correctly falls back to the default.
 */
async function resolveLocale(explicit: string | undefined) {
  if (explicit) return explicit;

  try {
    const { locale } = await import("next/root-params");
    return await locale();
  } catch {
    // Route handler, or outside the [locale] segment.
    return undefined;
  }
}

export default getRequestConfig(async ({ locale: explicit }) => {
  const segment = await resolveLocale(explicit);

  /**
   * `[locale]` acts as a catch-all, so unknown paths (`/favicon.ico`) land
   * here with a bogus segment. Routes outside the segment — sitemap, robots,
   * the waitlist handler — resolve to nothing. Both fall back to the default.
   */
  const locale = isLocale(segment) ? segment : routing.defaultLocale;

  const loaded = await Promise.all(
    namespaces.map(
      (ns) =>
        import(`../../messages/${locale}/${ns}.json`) as Promise<{
          default: Record<string, unknown>;
        }>,
    ),
  );

  return {
    locale,
    /**
     * Pinned so dates render identically wherever the build runs. Without it
     * the build machine's zone leaks into static output — a document dated
     * 2026-08-10 renders as 9 August on any host behind UTC.
     */
    timeZone: "UTC",
    messages: Object.fromEntries(
      namespaces.map((ns, i) => [ns, loaded[i].default]),
    ),
  };
});
