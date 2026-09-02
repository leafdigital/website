import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedExternalLink } from "@/components/analytics/tracked-external-link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Faq } from "@/components/faq";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { Link } from "@/i18n/navigation";
import { APP_INSTALL_URL, SAMPLE } from "@/lib/constants";
import { localeMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { PricingCards } from "./pricing-cards";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imageVoice" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localeMetadata("/image-voice", locale),
  };
}

const priceRows = ["traffic", "agentic", "accessibility"] as const;
const steps = ["scan", "write", "speak"] as const;
const benefits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
] as const;
const faqKeys = [
  "breakStore",
  "compliance",
  "spam",
  "languages",
  "howLong",
] as const;

/** A mono chip showing a literal alt attribute — the evidence, not a quote. */
function CodeChip({
  children,
  tone = "before",
}: {
  children: string;
  tone?: "before" | "after";
}) {
  return (
    <p
      className={cn(
        "rounded-md border bg-white p-3.5 font-mono text-[13px]",
        tone === "before"
          ? "border-ink/8 text-ink-faint leading-[1.6]"
          : "border-brand-800/20 leading-[1.7]",
      )}
    >
      {children}
    </p>
  );
}

export default function ImageVoicePage() {
  const t = useTranslations("imageVoice");
  const { silentImages, totalImages, bulkRemaining } = SAMPLE;
  const lead = (chunks: React.ReactNode) => (
    <strong className="text-foreground font-semibold">{chunks}</strong>
  );

  return (
    <>
      {/* 1 — Hero. One number does the arguing. */}
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
          <h1 className="text-4xl tracking-[-0.045em] sm:text-6xl lg:text-[68px] lg:leading-[1.02]">
            {t.rich("hero.headline", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        }
        sub={t.rich("hero.subhead", { silent: silentImages, lead })}
        cta={
          <>
            <Button asChild size="lg">
              <TrackedLink
                href="/image-voice#scan"
                event="cta_scan_click"
                eventProps={{ location: "image-voice-hero" }}
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
                href="/image-voice#pricing"
                event="cta_pricing_view"
                eventProps={{ location: "image-voice-hero" }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint")}
        visual={
          <figure className="flex flex-col items-center">
            <div className="border-hairline bg-card shadow-card rounded-2xl border px-10 py-8">
              <CoverageRing
                covered={silentImages}
                total={totalImages}
                label={t("ring.label")}
                totalLabel={t("ring.total", { total: totalImages })}
                ariaLabel={t("ring.aria", {
                  silent: silentImages,
                  total: totalImages,
                })}
              />
            </div>
            <figcaption className="text-caption text-ink-faint mt-3.5 text-center">
              {t("ring.caption")}
            </figcaption>
          </figure>
        }
      />

      {/* 2 — One villain, three bills. The page's only dark band. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("prices.kicker")}
          title={t("prices.title")}
          sub={t("prices.sub")}
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

      {/* 3 — The competitive argument, shown rather than claimed. */}
      <Section>
        <SectionHeading
          kicker={t("checkbox.kicker")}
          title={t("checkbox.title")}
          sub={t("checkbox.sub")}
          className="max-w-[680px]"
        />
        <div className="reveal-group mt-14 grid gap-[18px] md:grid-cols-2">
          <div className="border-hairline bg-surface-muted flex flex-col gap-4 rounded-xl border p-[30px]">
            <p className="text-fine text-ink-faint font-bold tracking-[0.05em] uppercase">
              {t("checkbox.beforeLabel")}
            </p>
            <div className="flex flex-col gap-2.5">
              <CodeChip>{t("checkbox.beforeOne")}</CodeChip>
              <CodeChip>{t("checkbox.beforeTwo")}</CodeChip>
            </div>
            <p className="text-ink-faint text-base sm:text-sm">
              {t("checkbox.beforeCaption")}
            </p>
          </div>
          <div className="border-brand-800/35 shadow-featured from-brand-50 flex flex-col gap-4 rounded-xl border-[1.5px] bg-linear-to-b to-white to-70% p-[30px]">
            <p className="text-fine text-brand-800 font-bold tracking-[0.05em] uppercase">
              {t("checkbox.afterLabel")}
            </p>
            <CodeChip tone="after">{t("checkbox.afterCode")}</CodeChip>
            <p className="text-muted-foreground text-base sm:text-sm">
              {t("checkbox.afterCaption")}
            </p>
          </div>
        </div>
        <p className="reveal text-muted-foreground mt-11 max-w-[640px] leading-[1.6]">
          {t.rich("checkbox.closer", { lead })}
        </p>
      </Section>

      {/* 4 — The ladder every Leaf app climbs. */}
      <Section divided>
        <SectionHeading kicker={t("how.kicker")} title={t("how.title")} />
        <StepsRow
          className="mt-[60px]"
          steps={steps.map((key) => ({
            title: t(`how.${key}.title`),
            body: t(`how.${key}.body`),
          }))}
        />
        <p className="reveal text-ink-faint mt-11 text-[15px]">
          {t("how.footer")}
        </p>
      </Section>

      {/* 5 — Eleven promises. The first one is free, so it leads. */}
      <Section divided>
        <SectionHeading
          kicker={t("benefits.kicker")}
          title={t("benefits.title")}
          className="max-w-[680px]"
        />
        <ul className="reveal-group mt-14 grid gap-4 md:grid-cols-2">
          {benefits.map((key, i) => {
            const featured = i === 0;
            return (
              <li
                key={key}
                className={cn(
                  "rounded-xl p-[30px]",
                  featured
                    ? "border-brand-800/35 from-brand-50 border-[1.5px] bg-linear-to-b to-white to-70% shadow-[0_14px_36px_rgb(46_125_50/0.08)] md:col-span-2"
                    : "border-hairline bg-card border",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-fine font-mono font-bold tabular-nums",
                    featured ? "text-brand-800" : "text-ink-faint",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[19px] tracking-[-0.01em]">
                  {t(`benefits.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-base leading-[1.6] sm:text-[15px]">
                  {t(`benefits.${key}.body`, {
                    silent: silentImages,
                    remaining: bulkRemaining,
                  })}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 6 — Pricing. The free plan is a plan, not a trial. */}
      <Section id="pricing" divided className="scroll-mt-16">
        <SectionHeading
          kicker={t("pricing.kicker")}
          title={t("pricing.title")}
          sub={t("pricing.sub")}
          className="max-w-[680px]"
        />
        <PricingCards />
        <p className="reveal text-ink-faint mt-11 text-[15px]">
          {t.rich("pricing.footer", {
            link: (chunks) => (
              <Link href="/" className="text-brand-800 font-semibold">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </Section>

      {/* 7 — The objections, answered before they are asked. */}
      <Section divided containerClassName="max-w-[800px]">
        <SectionHeading kicker={t("faq.kicker")} title={t("faq.title")} />
        <Faq
          className="mt-12"
          items={faqKeys.map((key) => ({
            q: t(`faq.${key}.q`),
            a: t(`faq.${key}.a`),
          }))}
        />
      </Section>

      {/* 8 — Install. The only external link on the page. */}
      <CtaBand
        id="scan"
        title={t("cta.title")}
        sub={t("cta.sub")}
        action={
          <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
            {/* External — a plain anchor, not the locale-aware Link. */}
            <TrackedExternalLink
              href={APP_INSTALL_URL}
              rel="noreferrer"
              event="cta_install_click"
              eventProps={{ location: "image-voice-cta" }}
            >
              {t("cta.button")}
            </TrackedExternalLink>
          </Button>
        }
      />
    </>
  );
}
