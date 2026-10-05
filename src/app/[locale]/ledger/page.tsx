import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AuditAppPage } from "@/components/audit-app-page";
import { DataCard } from "@/components/data-card";
import { FieldCard } from "@/components/field-card";
import {
  LEDGER_BILLED_VALUE,
  LEDGER_NAME,
  LEDGER_SHORT_UNITS,
  LEDGER_SHORT_VALUE,
  SAMPLE,
} from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ledger" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — see the
     * note on /image-voice for why every page title is written whole. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/ledger", locale),
  };
}

/**
 * The hero visual: the last ten POs, read from the documents. Three lines,
 * because the page's three prices are these three — what landed short, what
 * is being priced off a stale cost, and what is coming due that Shopify
 * cannot see. The wires are the result row: it is the number that moves the
 * bank account.
 */
function PosCard() {
  const t = useTranslations("ledger.card");
  const { ledger } = SAMPLE;

  return (
    <DataCard
      float
      title={t("title", { count: ledger.pos })}
      rows={[
        {
          label: t("short"),
          value: t("shortValue", { count: ledger.landedShort }),
        },
        {
          label: t("stale"),
          value: t("staleValue", { count: ledger.staleSkus }),
        },
        {
          label: t("due", { days: ledger.dueDays }),
          value: t("dueValue", { amount: ledger.dueAmount }),
          result: true,
        },
      ]}
      caption={t("caption")}
    />
  );
}

/**
 * One PO, opened up: ordered, billed, landed, and the difference priced at
 * the unit cost the supplier actually invoiced. Every number on the card is
 * either a sample input or derived from one — the 20 units are ordered minus
 * landed, and their value is those units times the invoiced cost.
 */
function PoRecord() {
  const t = useTranslations("ledger.confess");
  const { ledger } = SAMPLE;

  return (
    <FieldCard
      label={t("specimenLabel")}
      fields={[
        { label: t("po"), value: t("poValue") },
        {
          label: t("ordered"),
          value: t("orderedValue", { count: ledger.ordered }),
        },
        {
          label: t("billed"),
          value: t("billedValue", {
            count: ledger.billed,
            amount: LEDGER_BILLED_VALUE,
          }),
        },
        {
          label: t("landed"),
          value: t("landedValue", { count: ledger.landed }),
        },
        {
          label: t("difference"),
          value: t("differenceValue", {
            count: LEDGER_SHORT_UNITS,
            amount: LEDGER_SHORT_VALUE,
          }),
          result: true,
        },
      ]}
      caption={t("specimenCaption")}
    />
  );
}

export default function LedgerPage() {
  return (
    <AuditAppPage
      namespace="ledger"
      route="/ledger"
      name={LEDGER_NAME}
      mail="ledger"
      visual={<PosCard />}
      specimen={<PoRecord />}
      doc={{ days: SAMPLE.ledger.trackerAgeDays }}
      prices={["short", "stale", "cash"]}
      steps={["forward", "join", "write"]}
      changes={["one", "two", "three", "four", "five", "six"]}
      stop={["one", "two", "three", "four", "five"]}
      /* The bookkeeper first, because that is who the merchant will ask;
       * then the two ways this could be wrong or redundant; then control,
       * what it touches, and what leaving costs. */
      faq={["bookkeeper", "disagree", "shopify", "send", "touch", "leave"]}
    />
  );
}
