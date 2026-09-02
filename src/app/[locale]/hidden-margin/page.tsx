import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand, DarkOfferCallout } from "@/components/layout/cta-band";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { PullQuote } from "@/components/pull-quote";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { WaitlistForm } from "@/components/waitlist-form";
import { Link } from "@/i18n/navigation";
import { OFFER } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";
import { ReadinessCard } from "./readiness-card";
import { SampleReport } from "./sample-report";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hiddenMargin" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localeMetadata("/hidden-margin", locale),
  };
}

const priceRows = ["today", "tomorrow"] as const;
const steps = ["scan", "enrich", "ready"] as const;

export default function HiddenMarginPage() {
  const t = useTranslations("hiddenMargin");
  const lead = (chunks: React.ReactNode) => (
    <strong className="text-foreground font-semibold">{chunks}</strong>
  );

  return (
    <>
      {/* 1 — Hero. The badge is neutral: in the lab is a status, not a sale. */}
      <HeroSplit
        badge={<PillBadge tone="neutral">{t("hero.badge")}</PillBadge>}
        kicker={
          <Kicker className="tracking-[0.1em]">{t("hero.kicker")}</Kicker>
        }
        title={
          <h1 className="text-4xl tracking-[-0.045em] sm:text-6xl lg:text-[66px] lg:leading-[1.02]">
            {t.rich("hero.headline", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        }
        sub={t.rich("hero.subhead", { lead })}
        cta={
          <>
            <Button asChild size="lg">
              <TrackedLink
                href="/hidden-margin#waitlist"
                event="cta_waitlist_join"
                eventProps={{ location: "hidden-margin-hero" }}
              >
                {t("hero.ctaPrimary")}
              </TrackedLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="shadow-none"
            >
              <TrackedLink
                href="/hidden-margin#report"
                event="cta_app_view"
                eventProps={{ location: "hidden-margin-hero-secondary" }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint")}
        visual={<ReadinessCard />}
      />

      {/* 2 — Two bills, one set of blanks. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("prices.kicker")}
          title={t("prices.title")}
          className="max-w-[760px]"
        />
        <StatementRows
          items={priceRows.map((key) => ({
            label: t(`prices.${key}.label`),
            statement: t(`prices.${key}.statement`),
            body: t(`prices.${key}.body`),
          }))}
        />
      </Section>

      {/* 3 — The sentence every merchant has said to themselves. */}
      <PullQuote title={t("someday.title")} sub={t("someday.sub")} />

      {/* 4 — Not a checklist, a bill. */}
      <Section id="report" divided className="scroll-mt-16">
        <SectionHeading
          kicker={t("report.kicker")}
          title={t("report.title")}
          sub={t("report.sub")}
          className="max-w-[680px]"
        />
        <SampleReport />
        <p className="text-fine text-ink-faint mt-5">{t("report.caption")}</p>
      </Section>

      {/* 5 — The ladder every Leaf app climbs. */}
      <Section divided>
        <SectionHeading kicker={t("how.kicker")} title={t("how.title")} />
        <StepsRow
          className="mt-[60px]"
          steps={steps.map((key) => ({
            title: t(`how.${key}.title`),
            body: t(`how.${key}.body`),
          }))}
        />
        <p className="text-ink-faint mt-11 text-[15px]">{t("how.footer")}</p>
      </Section>

      {/* 6 — One list, every app. The offer earns its own tile. */}
      <CtaBand
        id="waitlist"
        title={t("cta.title")}
        sub={t("cta.sub")}
        offer={
          <DarkOfferCallout label={t("cta.offerLabel")}>
            {t("cta.offer", { spots: OFFER.foundingMerchants })}
          </DarkOfferCallout>
        }
        action={<WaitlistForm source="hidden-margin" />}
        note={
          <>
            {t.rich("cta.noteLive", {
              link: (chunks) => (
                <Link href="/image-voice" className="font-semibold text-white">
                  {chunks}
                </Link>
              ),
            })}
            <br />
            {t.rich("cta.noteNext", {
              link: (chunks) => (
                <Link
                  href="/reorder-engine"
                  className="font-semibold text-white"
                >
                  {chunks}
                </Link>
              ),
            })}
          </>
        }
      />
    </>
  );
}
