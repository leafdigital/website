import type { Locale } from "./routing";

/**
 * Country → language *suggestion*. Deliberately coarse: this only ever offers
 * a banner, never a redirect, so a wrong guess costs a dismissed prompt rather
 * than a visitor stranded in a language they don't read (docs/i18n.md §3).
 *
 * Portugal maps to pt-br because pt-BR is the only Portuguese we ship; if a
 * pt-PT locale is ever added, split this entry first.
 */
const countryToLocale: Record<string, Locale> = {
  BR: "pt-br",
  PT: "pt-br",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  UY: "es",
  PY: "es",
  BO: "es",
  CR: "es",
  PA: "es",
  DO: "es",
  GT: "es",
  DE: "de",
  AT: "de",
  IT: "it",
  FR: "fr",
  MC: "fr",
  LU: "fr",
};

export function localeForCountry(country: string | null | undefined) {
  if (!country) return undefined;
  return countryToLocale[country.toUpperCase()];
}
