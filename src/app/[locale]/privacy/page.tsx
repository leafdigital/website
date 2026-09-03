import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { PillBadge } from "@/components/ui/pill-badge";
import { routing } from "@/i18n/routing";
import { documentLanguages, resolveDocumentLocale } from "@/lib/documents";
import { APP_NAME, SITE_NAME } from "@/lib/constants";
import { absoluteUrl, localeMetadata } from "@/lib/metadata";

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
    ...localeMetadata("/privacy", locale),
    alternates: {
      ...localeMetadata("/privacy", locale).alternates,
      /* Tier-3 override: a locale with no translated document is omitted
       * from hreflang rather than advertised and served English
       * (docs/i18n.md §8.5). */
      languages: {
        ...documentLanguages(DOC, "/privacy"),
        "x-default": absoluteUrl("/privacy", routing.defaultLocale),
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
        {meta.draft ? <PillBadge>{t("document.draft")}</PillBadge> : null}
        <h1 className="sm:text-h2 mt-6 text-3xl tracking-[-0.03em]">
          {meta.title}
        </h1>
        <p className="text-ink-faint text-fine mt-2">
          {t("document.updated", { date: new Date(meta.updated) })}
        </p>
        {fellBack ? (
          <p className="border-border text-muted-foreground text-fine mt-6 rounded-lg border px-4 py-3">
            {t("document.fallbackNotice")}
          </p>
        ) : null}
        <div className="mt-6 leading-[1.65]">
          <Document />
        </div>
      </article>
    </Section>
  );
}
