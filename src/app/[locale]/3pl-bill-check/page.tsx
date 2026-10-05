import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AuditAppPage } from "@/components/audit-app-page";
import { DataCard } from "@/components/data-card";
import { FieldCard } from "@/components/field-card";
import {
  BILL_CHECK_LINES,
  BILL_CHECK_NAME,
  BILL_CHECK_PICK_OVER,
  BILL_CHECK_TOTAL,
  SAMPLE,
} from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "billCheck" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — see the
     * note on /image-voice for why every page title is written whole. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/3pl-bill-check", locale),
  };
}

/**
 * The hero visual: last month's invoice, read. Three named lines and the
 * rest, each priced as what it cost over the rate card, landing on the total
 * — which is derived from the rows above it, so the card can never claim a
 * sum its own lines do not make.
 */
function FindingsCard() {
  const t = useTranslations("billCheck.card");
  const { billCheck } = SAMPLE;

  return (
    <DataCard
      float
      title={t("title", { pages: billCheck.pages })}
      rows={[
        {
          label: t("pick", { count: billCheck.pickOrders }),
          value: t("over", { amount: BILL_CHECK_PICK_OVER }),
        },
        {
          label: t("storage", { count: billCheck.storagePallets }),
          value: t("over", { amount: billCheck.storageOver }),
        },
        {
          label: t("receiving", { count: billCheck.receivingUnits }),
          value: t("over", { amount: billCheck.receivingOver }),
        },
        {
          label: t("other", { count: billCheck.otherLines }),
          value: t("over", { amount: billCheck.otherOver }),
        },
        {
          label: t("gap", { lines: BILL_CHECK_LINES }),
          value: t("gapValue", { amount: BILL_CHECK_TOTAL }),
          result: true,
        },
      ]}
      caption={t("caption")}
    />
  );
}

/**
 * One line of the dispute pack, exactly as the 3PL receives it: their fee
 * code, the rate in the contract, the rate on the bill, the count, and the
 * difference. The difference is (billed − contract) × orders, computed, so
 * the specimen's arithmetic is the arithmetic the page says it hands back.
 */
function DisputeLine() {
  const t = useTranslations("billCheck.confess");
  const { billCheck } = SAMPLE;

  return (
    <FieldCard
      label={t("specimenLabel")}
      fields={[
        { label: t("feeCode"), value: t("feeCodeValue") },
        {
          label: t("contractRate"),
          value: t("rate", { amount: billCheck.pickContractRate }),
        },
        {
          label: t("billedRate"),
          value: t("rate", { amount: billCheck.pickBilledRate }),
        },
        {
          label: t("orders"),
          value: t("ordersValue", { count: billCheck.pickOrders }),
        },
        {
          label: t("difference"),
          value: t("differenceValue", { amount: BILL_CHECK_PICK_OVER }),
          result: true,
        },
      ]}
      caption={t("specimenCaption")}
    />
  );
}

export default function BillCheckPage() {
  return (
    <AuditAppPage
      namespace="billCheck"
      route="/3pl-bill-check"
      name={BILL_CHECK_NAME}
      mail="billCheck"
      visual={<FindingsCard />}
      specimen={<DisputeLine />}
      doc={{ pages: SAMPLE.billCheck.pages }}
      prices={["drift", "units", "clock"]}
      steps={["forward", "match", "dispute"]}
      changes={["one", "two", "three", "four", "five", "six"]}
      stop={["one", "two", "three", "four"]}
      /* Relationship first, then the two ways the offer could be worthless
       * (a clean bill, a spreadsheet), then who else could do it, then what
       * it touches. Someone who bails halfway has still been told it will
       * not sour anything and costs nothing if there is nothing to find. */
      faq={["sour", "clean", "spreadsheet", "bookkeeper", "touch"]}
    />
  );
}
