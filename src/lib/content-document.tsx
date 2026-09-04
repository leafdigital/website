import type { Metadata } from "next";
import {
  DocumentArticle,
  type DocumentMeta,
} from "@/components/layout/document";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME } from "./constants";
import { englishOnlyMetadata, resolveDocumentLocale } from "./documents";
import { absoluteUrl } from "./metadata";
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
    return { mod, fellBack };
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const { mod } = await load(locale);

    return {
      title: { absolute: `${mod.meta.title} — ${SITE_NAME}` },
      description,
      /* English-only: every locale points at the English URL rather than
       * advertising six copies of the same words. See englishOnlyMetadata. */
      alternates: englishOnlyMetadata(route),
      openGraph: {
        url: absoluteUrl(route, routing.defaultLocale),
        type: "article",
        modifiedTime: mod.meta.updated,
      },
    };
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { mod, fellBack } = await load(locale);
    const { default: Document, meta } = mod;
    const url = absoluteUrl(route, routing.defaultLocale);

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
              /* The document is English whatever locale asked for it. */
              locale: routing.defaultLocale,
            }),
            breadcrumbs(routing.defaultLocale, [
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
