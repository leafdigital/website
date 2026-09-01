import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";

/**
 * Per-request i18n config. Reads the `[locale]` root param directly, which
 * Next 16.3 supports without an experimental flag — no threading `params`
 * through every layout.
 *
 * Messages are split one namespace per file (docs/i18n.md §4) and merged here,
 * so `useTranslations("common")` reads `messages/{locale}/common.json`.
 */
const namespaces = ["common"] as const;

export default getRequestConfig(async () => {
  const { locale: getLocale } = await import("next/root-params");
  const segment = await getLocale();

  /**
   * `[locale]` acts as a catch-all, so unknown paths (`/favicon.ico`) land here
   * with a bogus segment. Routes outside the segment — sitemap, robots, the
   * waitlist handler — get `undefined`. Both fall back to the default.
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
    messages: Object.fromEntries(
      namespaces.map((ns, i) => [ns, loaded[i].default]),
    ),
  };
});
