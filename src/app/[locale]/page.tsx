import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AppCard, type AppCardData } from "@/components/app-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { DataCard } from "@/components/data-card";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { Link } from "@/i18n/navigation";
import { SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";

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
const steps = ["connect", "shadow", "run"] as const;
const villainRows = ["one", "two", "three", "four"] as const;

export default function Home() {
  const t = useTranslations("home");
  const { inventory } = SAMPLE;

  const apps: (AppCardData & { featured: boolean })[] = [
    {
      name: "Image Voice",
      status: "live",
      statusLabel: t("suite.live"),
      description: t("suite.imageVoice.description"),
      href: "/image-voice",
      cta: t("suite.imageVoice.cta"),
      featured: true,
    },
    {
      name: "Hidden Margin",
      status: "lab",
      statusLabel: t("suite.lab"),
      description: t("suite.hiddenMargin.description"),
      href: "/hidden-margin",
      cta: t("suite.hiddenMargin.cta"),
      featured: false,
    },
    {
      name: "Reorder Engine",
      status: "lab",
      statusLabel: t("suite.lab"),
      description: t("suite.reorderEngine.description"),
      href: "/reorder-engine",
      cta: t("suite.reorderEngine.cta"),
      featured: false,
    },
  ];

  return (
    <>
      {/* 1 — Hero. The visual is the argument: three systems, one SKU set. */}
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
          <>
            <Button asChild size="lg">
              <TrackedLink
                href="/image-voice"
                event="cta_scan_click"
                eventProps={{ location: "home-hero" }}
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
                href="/#apps"
                event="cta_app_view"
                eventProps={{ location: "home-hero-secondary" }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint")}
        visual={
          <DataCard
            title={t("inventory.title")}
            caption={t("inventory.caption")}
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

      {/* 2 — The villain. One dark band per page; this is the page's. */}
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

      {/* 3 — The plan. Three steps, divided by rules rather than cards. */}
      <Section>
        <SectionHeading kicker={t("plan.kicker")} title={t("plan.title")} />
        <StepsRow
          className="mt-[60px]"
          steps={steps.map((key) => ({
            title: t(`plan.${key}.title`),
            body: t(`plan.${key}.body`),
          }))}
        />
      </Section>

      {/* 4 — The suite. The only index of the portfolio; there is no /apps. */}
      <Section id="apps" className="scroll-mt-16 pt-5 sm:pt-5">
        <SectionHeading
          kicker={t("suite.kicker")}
          title={t("suite.title")}
          sub={t("suite.sub")}
        />
        <ul data-reveal-group className="mt-14 grid gap-[18px] md:grid-cols-3">
          {apps.map((app) => (
            <li key={app.name} className="flex">
              <AppCard app={app} featured={app.featured} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 — The two futures, side by side. */}
      <Section className="pt-0 sm:pt-0">
        <div data-reveal-group className="grid gap-[18px] md:grid-cols-2">
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

      {/* 6 — The one thing to do. */}
      <CtaBand
        title={t("cta.title")}
        sub={t("cta.sub")}
        action={
          <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
            <TrackedLink
              href="/image-voice"
              event="cta_scan_click"
              eventProps={{ location: "home-cta" }}
            >
              {t("cta.button")}
            </TrackedLink>
          </Button>
        }
        note={t.rich("cta.note", {
          link: (chunks) => (
            <Link href="/hidden-margin" className="font-semibold text-white">
              {chunks}
            </Link>
          ),
        })}
      />
    </>
  );
}
