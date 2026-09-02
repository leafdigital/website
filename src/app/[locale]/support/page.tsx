import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Faq } from "@/components/faq";
import { Button } from "@/components/ui/button";
import { APP_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("support");
  return {
    title: t("meta.title"),
    description: t("meta.description", { appName: APP_NAME }),
  };
}

/**
 * The page is a schema; the locale file fills it. Layout and logic live here,
 * every word lives in `messages/{locale}/support.json` (docs/i18n.md §4).
 */
const faqKeys = ["undo", "billing", "scope", "speed"] as const;

export default function SupportPage() {
  const t = useTranslations("support");

  const faq = faqKeys.map((key) => ({
    q: t(`faq.${key}.q`),
    /* appName is an ICU argument, never baked into the translated string. */
    a: t(`faq.${key}.a`, { appName: APP_NAME }),
  }));

  return (
    <Section>
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
