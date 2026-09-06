import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { DataCard } from "@/components/data-card";
import { LabAppPage } from "@/components/lab-app-page";
import { COUNT_CHECK_GAP, COUNT_CHECK_NAME, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "countCheck" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — see the
     * note on /reorder-loop for why every page title is written whole. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/count-check", locale),
  };
}

/**
 * The hero visual: one SKU, two systems, one day. The card reconciles itself
 * as it lands, so a visitor watches the two counts disagree before being told
 * what the disagreement is — which is the entire pitch, in a figure.
 */
function CountCard() {
  const t = useTranslations("countCheck.card");
  const { countCheck } = SAMPLE;

  return (
    <DataCard
      float
      title={t("title")}
      rows={[
        {
          label: t("threePl"),
          value: t("units", { count: countCheck.threePl }),
        },
        {
          label: t("shopify"),
          value: t("units", { count: countCheck.shopify }),
        },
        {
          label: t("gap"),
          value: t("gapValue", { count: COUNT_CHECK_GAP }),
          result: true,
        },
      ]}
      caption={t("caption")}
    />
  );
}

export default function CountCheckPage() {
  return (
    <LabAppPage
      namespace="countCheck"
      route="/count-check"
      name={COUNT_CHECK_NAME}
      source="count-check"
      visual={<CountCard />}
    />
  );
}
