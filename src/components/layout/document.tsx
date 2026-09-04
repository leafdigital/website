import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { PillBadge } from "@/components/ui/pill-badge";

export type DocumentMeta = {
  title: string;
  updated: string;
  draft?: boolean;
};

/**
 * The shell every tier-3 document renders inside: draft badge, title, updated
 * date, the fallback notice, then the MDX body.
 *
 * It exists because there are four of these now — the privacy policy, the
 * guide, and the two comparisons — and the shell is the part that must not
 * differ between them. A document whose "last updated" line sits in a
 * different place on one page reads as a different kind of document, and the
 * whole point of these pages is that they are the same kind: dated, sourced,
 * and revisable.
 */
export async function DocumentArticle({
  meta,
  fellBack,
  children,
}: {
  meta: DocumentMeta;
  /** True when this locale has no translation and English is standing in. */
  fellBack: boolean;
  children: React.ReactNode;
}) {
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
        <div className="mt-6 leading-[1.65]">{children}</div>
      </article>
    </Section>
  );
}
