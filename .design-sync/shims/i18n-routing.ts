/**
 * design-sync shim for `@/i18n/routing`.
 *
 * The real module calls `defineRouting` from `next-intl/routing`, which pulls
 * the Next client runtime — and its module-scope `process.env` reads — into
 * the bundle. The values here are copied from `src/i18n/routing.ts` and are
 * the only part any component actually reads.
 *
 * Keep the locale list in step with the real file if a locale is added.
 */
export const routing = {
  locales: ["en", "es", "pt-br", "de", "fr", "it"] as const,
  defaultLocale: "en" as const,
};

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return (
    value !== undefined &&
    (routing.locales as readonly string[]).includes(value)
  );
}
