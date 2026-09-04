import type { Metadata } from "next";
import {
  DocumentArticle,
  type DocumentMeta,
} from "@/components/layout/document";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME } from "./constants";
import { documentLanguages, resolveDocumentLocale } from "./documents";
import { absoluteUrl, languageTag } from "./metadata";
import { article, breadcrumbs, organization } from "./schema";
import { routing } from "@/i18n/routing";
import type { AppRoute } from "./routes";

type DocModule = {
  default: React.ComponentType;
  meta: DocumentMeta;
};

/**
 * The content layer's page factory.
 *
 * Three routes — the guide and the two comparisons — that differ only in which
 * MDX file they render, which breadcrumb they sit under, and what their meta
 * description says. Writing that out three times means three places for the
 * canonical rule to be got wrong, and the canonical rule is the whole reason
 * these pages are safe to publish in six locales at all.
 *
 * The dynamic import lives here rather than in each route file on purpose: a
 * template-literal import compiles to a webpack context keyed on the path
 * prefix, so keeping all of them relative to this one module builds one
 * context over `content/` instead of three.
 */
export function contentDocument({
  doc,
  route,
  description,
  breadcrumb,
}: {
  /** File stem under `content/{locale}/`. */
  doc: string;
  route: AppRoute;
  description: string;
  /** The trail this page hangs off, excluding the site root and the page. */
  breadcrumb: { name: string; route: AppRoute }[];
}) {
  async function load(locale: string) {
    const { locale: resolved, fellBack } = resolveDocumentLocale(locale, doc);
    const mod = (await import(
      `../../content/${resolved}/${doc}.mdx`
    )) as DocModule;
    return { mod, fellBack, resolved };
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const { mod, resolved } = await load(locale);
    const url = absoluteUrl(route, resolved);

    return {
      title: { absolute: `${mod.meta.title} — ${SITE_NAME}` },
      description,
      /**
       * One rule, and it covers both kinds of document here.
       *
       * The canonical is the URL of the locale actually SERVED, not the one
       * requested. A translated document resolves to itself, so `/de/…`
       * canonicalises to `/de/…`. An untranslated one resolves to English, so
       * all six locales canonicalise to the single English URL — which is the
       * honest thing to advertise when five of them serve identical English
       * words. `documentLanguages` then lists only the locales that really
       * have the file, so hreflang never promises a translation that does not
       * exist (docs/i18n.md §8.5).
       *
       * The practical effect: translating a document is the whole migration.
       * Drop five MDX files in and its canonicals, hreflang and sitemap
       * entries all become per-locale on their own.
       */
      alternates: {
        canonical: url,
        languages: {
          ...documentLanguages(doc, route),
          "x-default": absoluteUrl(route, routing.defaultLocale),
        },
      },
      openGraph: {
        url,
        type: "article",
        locale: languageTag(resolved),
        modifiedTime: mod.meta.updated,
      },
    };
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { mod, fellBack, resolved } = await load(locale);
    const { default: Document, meta } = mod;
    /* The locale actually served — which is English when this document has no
     * translation, and the requested one when it does. */
    const url = absoluteUrl(route, resolved);

    return (
      <>
        <JsonLd
          graph={[
            organization(),
            article({
              url,
              headline: meta.title,
              description,
              updated: meta.updated,
              locale: resolved,
            }),
            breadcrumbs(resolved, [
              { name: SITE_NAME, route: "/" },
              ...breadcrumb,
              { name: meta.title, route },
            ]),
          ]}
        />
        <DocumentArticle meta={meta} fellBack={fellBack}>
          <Document />
        </DocumentArticle>
      </>
    );
  }

  return { generateMetadata, Page };
}
