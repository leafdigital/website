import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { PullQuote } from "@/components/pull-quote";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { WaitlistForm } from "@/components/waitlist-form";
import { Link } from "@/i18n/navigation";
import { OFFER, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reorderEngine" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localeMetadata("/reorder-engine", locale),
  };
}

const blindRows = ["cash", "spot", "night"] as const;
const rungs = ["shadow", "approve", "autonomy"] as const;

/**
 * The hero visual: two numbers and the whole market thesis. 9 apps forecast,
 * 0 send the order — the gap is the product. Deliberately free of any
 * performance claim; nothing here has been proven on a real store yet.
 */
function GapCard() {
  const t = useTranslations("reorderEngine.gap");

  return (
    <div className="border-hairline bg-card shadow-card flex w-full flex-col gap-[26px] rounded-2xl border p-9">
      <div className="flex flex-col gap-1.5">
        <span className="text-[54px] leading-none font-extrabold tracking-[-0.03em]">
          {t("forecastCount", { count: SAMPLE.forecastingApps })}
        </span>
        <p className="text-muted-foreground">{t("forecast")}</p>
      </div>
      <div className="border-hairline-soft border-t" />
      <div className="flex flex-col gap-1.5">
        <span className="text-primary text-[54px] leading-none font-extrabold tracking-[-0.03em]">
          {t("sendCount", { count: SAMPLE.appsThatSendThePo })}
        </span>
        <p className="text-muted-foreground">{t("send")}</p>
      </div>
      <p className="border-hairline-soft text-fine text-ink-faint border-t pt-[18px]">
        {t("caption")}
      </p>
    </div>
  );
}

export default function ReorderEnginePage() {
  const t = useTranslations("reorderEngine");

  return (
    <>
      {/* 1 — Hero. Coming soon is a status, so the badge stays neutral. */}
      <HeroSplit
        badge={<PillBadge tone="neutral">{t("hero.badge")}</PillBadge>}
        kicker={
          <Kicker className="tracking-[0.1em]">{t("hero.kicker")}</Kicker>
        }
        title={
          <h1 className="text-4xl tracking-[-0.045em] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
            {t.rich("hero.headline", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        }
        sub={t("hero.subhead")}
        cta={
          <>
            <Button asChild size="lg">
              <TrackedLink
                href="/reorder-engine#waitlist"
                event="cta_waitlist_join"
                eventProps={{ location: "reorder-engine-hero" }}
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
                href="/reorder-engine#ladder"
                event="cta_app_view"
                eventProps={{ location: "reorder-engine-hero-secondary" }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint", { spots: OFFER.charterStores })}
        visual={<GapCard />}
      />

      {/* 2 — Reorder day, stated plainly. No body copy: these land alone. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("blind.kicker")}
          title={t("blind.title")}
          className="max-w-[760px]"
        />
        <StatementRows
          items={blindRows.map((key) => ({
            label: t(`blind.${key}.label`),
            statement: t(`blind.${key}.statement`),
          }))}
        />
      </Section>

      {/* 3 — The question the whole product answers. */}
      <PullQuote title={t("why.title")} sub={t("why.sub")} />

      {/* 4 — The ladder. This app is the reason the ladder exists. */}
      <Section id="ladder" divided className="scroll-mt-16">
        <SectionHeading kicker={t("ladder.kicker")} title={t("ladder.title")} />
        <StepsRow
          className="mt-[60px]"
          steps={rungs.map((key) => ({
            title: t(`ladder.${key}.title`),
            body: t(`ladder.${key}.body`),
          }))}
        />
        <p className="reveal text-ink-faint mt-11 text-[15px]">
          {t("ladder.footer")}
        </p>
      </Section>

      {/* 5 — One list, every app. */}
      <CtaBand
        id="waitlist"
        title={t("cta.title")}
        sub={t("cta.sub", { spots: OFFER.charterStores })}
        action={<WaitlistForm source="reorder-engine" />}
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
