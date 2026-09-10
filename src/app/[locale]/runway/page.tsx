import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { DataCard } from "@/components/data-card";
import { LabAppPage } from "@/components/lab-app-page";
import { RUNWAY_NAME, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "runway" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — see the
     * note on /reorder-loop for why every page title is written whole. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/runway", locale),
  };
}

/**
 * The hero visual: one line of the Monday list, which is the entire product.
 *
 * A stat card would have put a single figure up here, and the argument does
 * not survive a single figure — "4 days left" means nothing until you know
 * the supplier takes 26. So the card states the pair, then lands on what
 * closing the gap costs and how long it ties the cash up, because that is the
 * line a merchant is allowed to say no to.
 */
function ListCard() {
  const t = useTranslations("runway.card");
  const { runway } = SAMPLE;

  return (
    <DataCard
      float
      title={t("title")}
      rows={[
        {
          label: t("cover"),
          value: t("days", { count: runway.daysOfCover }),
        },
        {
          label: t("leadTime"),
          value: t("days", { count: runway.leadTimeDays }),
        },
        {
          label: t("order"),
          value: t("orderValue", {
            units: runway.shortUnits,
            cost: runway.orderCost,
          }),
          result: true,
        },
      ]}
      caption={t("caption", { days: runway.cashTiedDays })}
    />
  );
}

export default function RunwayPage() {
  return (
    <LabAppPage
      namespace="runway"
      route="/runway"
      name={RUNWAY_NAME}
      source="runway"
      visual={<ListCard />}
      /* Four, not the schema's three: the category is crowded with things
       * that look like this one, and "I already have low-stock alerts" is a
       * different objection from "Shopify already shows me days out of
       * stock." Answering only one of them answers neither. */
      objections={["one", "two", "three", "four"]}
    />
  );
}
