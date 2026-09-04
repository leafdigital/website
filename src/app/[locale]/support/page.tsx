import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { APP_NAME, SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { absoluteUrl, localeMetadata } from "@/lib/metadata";
import { breadcrumbs, faqPage, organization } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template. A title
     * is the whole search result, and the strings in the locale files are
     * written to be exactly that — appending a suffix pushes them past 60
     * characters and truncates the words that were doing the work. Documents
     * (/privacy) still take the template, which is what it is there for. */
    title: { absolute: t("meta.title") },
    description: t("meta.description", { appName: APP_NAME }),
    ...localeMetadata("/support", locale),
  };
}

/**
 * The page is a schema; the locale file fills it. Layout and logic live here,
 * every word lives in `messages/{locale}/support.json` (docs/i18n.md §4).
 */
const faqKeys = ["undo", "billing", "scope", "speed"] as const;

export default function SupportPage() {
  const t = useTranslations("support");
  const locale = useLocale();

  const faq = faqKeys.map((key) => ({
    q: t(`faq.${key}.q`),
    /* appName is an ICU argument, never baked into the translated string. */
    a: t(`faq.${key}.a`, { appName: APP_NAME }),
  }));

  return (
    <Section>
      <JsonLd
        graph={[
          organization(),
          faqPage(absoluteUrl("/support", locale), faq),
          breadcrumbs(locale, [
            { name: SITE_NAME, route: "/" },
            { name: t("title"), route: "/support" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="sm:text-h2 text-3xl tracking-[-0.03em]">{t("title")}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-[1.65]">
          {t("intro")}
        </p>
        <div className="mt-9">
          <Button asChild size="lg">
            <TrackedLink
              href={`mailto:${SUPPORT_EMAIL}`}
              event="cta_contact_click"
              eventProps={{ location: "support" }}
            >
              {SUPPORT_EMAIL}
            </TrackedLink>
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="sm:text-h2 text-3xl tracking-[-0.03em]">
          {t("faqTitle")}
        </h2>
        <Faq items={faq} className="mt-6" />
      </div>
    </Section>
  );
}
