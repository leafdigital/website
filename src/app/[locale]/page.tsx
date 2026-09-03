import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { DataCard } from "@/components/data-card";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { Link } from "@/i18n/navigation";
import { SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";
import { PlanTimeline } from "./plan-timeline";
import { SuiteIndex } from "./suite-index";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localeMetadata("/", locale),
  };
}

/** The page is a schema; `messages/{locale}/home.json` fills it. */
const villainRows = ["one", "two", "three", "four"] as const;

/**
 * The homepage, v2 — the same argument as v3, told as one descent.
 *
 * The routing is the honest part and it survives the redesign: the hero
 * sends you to the one app you can install today, and the closing band
 * sends you to the waitlist for the one this page spends its middle
 * describing. We do not point a "run the free scan" button at a scanner
 * that is still in the lab.
 */
export default function Home() {
  const t = useTranslations("home");
  const { inventory } = SAMPLE;

  return (
    <>
      {/* 1 — Hero. The visual is the argument: three systems, one SKU set,
          reconciling themselves while you read the headline. */}
      <HeroSplit
        badge={
          <PillBadge>
            <span
              aria-hidden="true"
              className="bg-brand-600 size-1.5 rounded-full"
            />
            {t("hero.badge")}
          </PillBadge>
        }
        title={
          <h1 className="lg:text-hero text-4xl tracking-[-0.045em] sm:text-6xl">
            {t.rich("hero.headline", {
              br: () => <br />,
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        }
        sub={t("hero.subhead")}
        cta={
          /* One CTA. A second button here would have to point at something
             that is not installable yet — the fine print below does that
             work in sentences instead. */
          <Button
            asChild
            size="lg"
            /* The label is a sentence, not a verb — on a phone it has to be
               allowed to wrap rather than push the hero column sideways. */
            className="h-auto min-h-[52px] max-w-full py-3 text-center whitespace-normal sm:h-[52px] sm:py-0 sm:whitespace-nowrap"
          >
            <TrackedLink
              href="/image-voice"
              event="cta_scan_click"
              eventProps={{ location: "home-hero" }}
            >
              {t("hero.ctaPrimary")}
            </TrackedLink>
          </Button>
        }
        finePrint={t("hero.finePrint")}
        visual={
          <DataCard
            float
            title={t("inventory.title")}
            caption={t.rich("inventory.caption", {
              link: (chunks) => (
                <Link
                  href="/hidden-margin"
                  className="text-brand-800 font-semibold"
                >
                  {chunks}
                </Link>
              ),
            })}
            rows={[
              {
                label: t("inventory.shopify"),
                value: t("inventory.units", { count: inventory.shopify }),
              },
              {
                label: t("inventory.threePl"),
                value: t("inventory.units", { count: inventory.threePl }),
              },
              {
                label: t("inventory.spreadsheet"),
                value: t("inventory.units", { count: inventory.spreadsheet }),
              },
              {
                label: t("inventory.gap"),
                value: t("inventory.gapValue", {
                  units: inventory.gapUnits,
                  dollars: inventory.gapDollars,
                }),
                result: true,
              },
            ]}
          />
        }
      />

      {/* 2 — The villain. One dark band per page; this is the page's, and
          v2 deliberately left its layout alone. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("villain.kicker")}
          title={t("villain.title")}
          sub={t("villain.sub")}
          className="max-w-[760px]"
        />
        <StatementRows
          labelWidth="narrow"
          items={villainRows.map((key, i) => ({
            label: String(i + 1).padStart(2, "0"),
            statement: t(`villain.${key}`),
          }))}
        />
        <p data-reveal className="mt-10 text-[17px] text-white/55">
          {t("villain.closer")}
        </p>
      </Section>

      {/* 3 — The plan. A descent down a drawn spine, because the order is
          the argument: autonomy comes last and has to be earned. */}
      {/* `overflow-x-clip`, not `hidden`: the steps slide in from their own
          side, and a step whose row already touches the content edge would
          otherwise put 30px of horizontal scroll on the page for the length
          of its reveal. Clip does not make a scroll container, so nothing
          else in the section changes. */}
      <Section className="overflow-x-clip sm:pt-[120px]">
        <SectionHeading
          align="center"
          kicker={t("plan.kicker")}
          title={t("plan.title")}
        />
        <PlanTimeline />
      </Section>

      {/* 4 — The suite. The only index of the portfolio; there is no /apps. */}
      <Section id="apps" className="scroll-mt-16 pt-5 sm:pt-5">
        <SectionHeading
          align="center"
          kicker={t("suite.kicker")}
          title={t("suite.title")}
          sub={t("suite.sub")}
        />
        <SuiteIndex />
      </Section>

      {/*
       * 5 — The two futures, side by side. No reveal, deliberately: after a
       * page of things that draw and slide themselves in, two plain cards
       * that are simply THERE is the loudest thing left.
       */}
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-[18px] md:grid-cols-2">
          <div className="border-hairline bg-surface-muted rounded-xl border p-10">
            <p className="text-fine text-ink-faint font-bold tracking-[0.05em] uppercase">
              {t("contrast.withoutLabel")}
            </p>
            <p className="text-muted-foreground mt-3 text-lg leading-[1.6]">
              {t("contrast.withoutBody")}
            </p>
          </div>
          <div className="border-brand-800/35 shadow-featured from-brand-50 rounded-xl border-[1.5px] bg-linear-to-b to-white p-10">
            <p className="text-fine text-brand-800 font-bold tracking-[0.05em] uppercase">
              {t("contrast.withLabel")}
            </p>
            <p className="mt-3 text-lg leading-[1.6]">
              {t("contrast.withBody")}
            </p>
          </div>
        </div>
      </Section>

      {/* 6 — The one thing to do. Waitlist-first: the scan this page argues
          for is the one that is still in the lab. */}
      <CtaBand
        title={t("cta.title")}
        sub={t("cta.sub")}
        action={
          <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
            <TrackedLink
              href="/hidden-margin#waitlist"
              data-motion="dot"
              event="cta_app_view"
              eventProps={{ location: "home-cta" }}
            >
              {t("cta.button")}
            </TrackedLink>
          </Button>
        }
        note={t.rich("cta.note", {
          link: (chunks) => (
            <Link href="/image-voice" className="font-semibold text-white">
              {chunks}
            </Link>
          ),
        })}
      />
    </>
  );
}
