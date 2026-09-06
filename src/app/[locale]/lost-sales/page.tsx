import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LabAppPage } from "@/components/lab-app-page";
import { StatCard } from "@/components/stat-card";
import { LOST_SALES_NAME, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lostSales" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — see the
     * note on /reorder-loop for why every page title is written whole. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/lost-sales", locale),
  };
}

/**
 * The hero visual: the days at zero, and the number of systems that wrote
 * down what they cost. The second figure is the accent — a stockout everyone
 * noticed is not the problem, a stockout nothing recorded is.
 */
function ZeroDaysCard() {
  const t = useTranslations("lostSales.card");
  const { lostSales } = SAMPLE;

  return (
    <StatCard
      stats={[
        {
          value: t("daysCount", { count: lostSales.zeroDays }),
          label: t("days"),
        },
        {
          value: t("recordsCount", { count: lostSales.systemsThatRecordedIt }),
          label: t("records"),
          accent: true,
        },
      ]}
      caption={t("caption")}
    />
  );
}

export default function LostSalesPage() {
  return (
    <LabAppPage
      namespace="lostSales"
      route="/lost-sales"
      name={LOST_SALES_NAME}
      source="lost-sales"
      visual={<ZeroDaysCard />}
    />
  );
}
