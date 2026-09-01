import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { routing } from "@/i18n/routing";
import { documentLanguages, resolveDocumentLocale } from "@/lib/documents";
import { APP_NAME, SITE_NAME } from "@/lib/constants";

const DOC = "privacy";

type DocModule = {
  default: React.ComponentType;
  meta: { title: string; updated: string; draft?: boolean };
};

/** Per-locale MDX, with English standing in when a translation is missing. */
async function loadDocument(locale: string) {
  const { locale: resolved, fellBack } = resolveDocumentLocale(locale, DOC);
  const mod = (await import(
    `../../../../content/${resolved}/privacy.mdx`
  )) as DocModule;
  return { mod, fellBack };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { mod } = await loadDocument(locale);

  return {
    title: mod.meta.title,
    description: `How ${SITE_NAME} handles data across this website and the ${APP_NAME} app — what we access, what we store, how long we keep it, and the AI processing we disclose plainly.`,
    alternates: {
      canonical: `/${locale}/${DOC}`,
      languages: {
        ...documentLanguages(DOC, `/${DOC}`),
        "x-default": `/${routing.defaultLocale}/${DOC}`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { mod, fellBack } = await loadDocument(locale);
  const { default: Document, meta } = mod;
  const t = await getTranslations("common");

  return (
    <Section>
      <article className="mx-auto max-w-2xl">
        {/* DRAFT marker — maintainer + legal sign-off removes `draft` from the
         * MDX meta export, in every locale (LF-220 AC). */}
        {meta.draft ? (
          <Badge variant="outline">{t("document.draft")}</Badge>
        ) : null}
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          {meta.title}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t("document.updated", { date: new Date(meta.updated) })}
        </p>
        {fellBack ? (
          <p className="border-border text-muted-foreground mt-6 rounded-md border px-4 py-3 text-sm">
            {t("document.fallbackNotice")}
          </p>
        ) : null}
        <div className="mt-6 leading-relaxed">
          <Document />
        </div>
      </article>
    </Section>
  );
}
