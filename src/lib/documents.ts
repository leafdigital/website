import { existsSync } from "node:fs";
import path from "node:path";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, languageTag } from "./metadata";
import type { AppRoute } from "./routes";

/**
 * Tier-3 documents are MDX files per locale, and a locale is allowed to be
 * missing — legal copy may lag a translation, or diverge deliberately by
 * jurisdiction (docs/i18n.md §4). Missing means "fall back to English and say
 * so", never a build failure; that strictness belongs to tiers 1 and 2.
 */
const contentRoot = path.join(process.cwd(), "content");

export function hasDocument(locale: string, doc: string) {
  return existsSync(path.join(contentRoot, locale, `${doc}.mdx`));
}

/** The locale actually rendered, which may not be the one requested. */
export function resolveDocumentLocale(locale: string, doc: string) {
  return hasDocument(locale, doc)
    ? { locale, fellBack: false }
    : { locale: routing.defaultLocale, fellBack: true };
}

/**
 * hreflang must only advertise locales that really have the document — telling
 * a search engine a page exists in Italian when it serves English is the kind
 * of thing that gets alternates ignored wholesale.
 */
export function documentLanguages(doc: string, href: AppRoute) {
  return Object.fromEntries(
    routing.locales
      .filter((locale: Locale) => hasDocument(locale, doc))
      .map((locale: Locale) => [
        languageTag(locale),
        absoluteUrl(href, locale),
      ]),
  );
}
