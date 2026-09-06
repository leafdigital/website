import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LabAppPage } from "@/components/lab-app-page";
import { StatCard } from "@/components/stat-card";
import { REORDER_LOOP_NAME, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reorderLoop" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template. A title
     * is the whole search result, and the strings in the locale files are
     * written to be exactly that — appending a suffix pushes them past 60
     * characters and truncates the words that were doing the work. Documents
     * (/privacy) still take the template, which is what it is there for. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/reorder-loop", locale),
  };
}

/**
 * The hero visual: two numbers and the whole market thesis. Nine apps
 * forecast, none of them finish the order — that gap is the product.
 * Deliberately free of any performance claim; nothing here has been proven on
 * a real store yet, and the caption says so.
 */
function GapCard() {
  const t = useTranslations("reorderLoop.card");

  return (
    <StatCard
      stats={[
        {
          value: t("forecastCount", { count: SAMPLE.forecastingApps }),
          label: t("forecast"),
        },
        {
          value: t("finishCount", { count: SAMPLE.appsThatFinishTheOrder }),
          label: t("finish"),
          accent: true,
        },
      ]}
      caption={t("caption")}
    />
  );
}

export default function ReorderLoopPage() {
  return (
    <LabAppPage
      namespace="reorderLoop"
      route="/reorder-loop"
      name={REORDER_LOOP_NAME}
      source="reorder-loop"
      visual={<GapCard />}
    />
  );
}
