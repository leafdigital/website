import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedExternalLink } from "@/components/analytics/tracked-external-link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Faq } from "@/components/faq";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import { APP_INSTALL_URL, APP_NAME, SAMPLE, SITE_NAME } from "@/lib/constants";
import { absoluteUrl, localeMetadata } from "@/lib/metadata";
import {
  breadcrumbs,
  faqPage,
  imageVoiceApplication,
  organization,
} from "@/lib/schema";
import { Journey } from "./journey";
import { PricingCards } from "./pricing-cards";
import { SpecimenCard } from "./specimen-card";
import { TodoCard } from "./todo-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imageVoice" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template. A title
     * is the whole search result, and the strings in the locale files are
     * written to be exactly that — appending a suffix pushes them past 60
     * characters and truncates the words that were doing the work. Documents
     * (/privacy) still take the template, which is what it is there for. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/image-voice", locale),
  };
}

const priceRows = ["traffic", "agentic", "accessibility"] as const;
const steps = ["scan", "write", "speak"] as const;

/** The content layer, in reading order: learn, then compare. */
const comparisons = [
  { href: "/guides/shopify-alt-text", key: "guide" },
  { href: "/image-voice/vs-alttext-ai", key: "altTextAi" },
  { href: "/image-voice/vs-altking", key: "altKing" },
] as const;
/**
 * The order is the reading order, and it is an argument: safety before
 * quality, quality before results, results before price. Someone who bails
 * out halfway has still been answered on the things that stop an install.
 */
const faqKeys = [
  /* Safety and control. */
  "breakStore",
  "speed",
  "existingAlt",
  "access",
  "uninstall",
  /* Quality. */
  "spam",
  "diy",
  "rot",
  "editing",
  /* Results. */
  "matters",
  "compliance",
  "languages",
  "seoApp",
  /* Pricing and plans. */
  "firstSweep",
  "images",
  "hugeCatalog",
] as const;

/**
 * A soft green aura behind a centred narrative. Decoration only: it exists
 * so a section of nothing but sentences still has a centre of gravity.
 */
function Aura({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 rounded-[50%] blur-[40px] ${className}`}
    />
  );
}

/**
 * /image-voice, v2 — the same argument as v1, told as one continuous scroll
 * instead of eight stacked blocks.
 *
 * The through-line: you are shown the problem (a to-do list that strikes
 * itself out), told what it costs (the one dark band), shown the evidence
 * (one specimen card, junk struck through in red), shown the mechanism
 * (three steps on a drawn thread), walked through what happens to you (four
 * chapters on a drawn spine), and only then given a price. Every reveal on
 * the page restates the layout — a rule draws, a strike crosses, a spine
 * grows — rather than decorating it.
 */
export default function ImageVoicePage() {
  const t = useTranslations("imageVoice");
  const locale = useLocale();
  const { silentImages, totalImages } = SAMPLE;
  /* Built once and used twice: the accordion renders these, the FAQPage node
   * describes them. One source, so the two can never disagree. */
  const faq = faqKeys.map((key) => ({
    q: t(`faq.${key}.q`),
    a: t(`faq.${key}.a`),
  }));
  const lead = (chunks: React.ReactNode) => (
    <strong className="text-foreground font-semibold">{chunks}</strong>
  );

  return (
    <>
      <JsonLd
        graph={[
          organization(),
          imageVoiceApplication({
            locale,
            description: t("meta.description"),
            planNames: {
              audit: t("pricing.audit.name"),
              keeper: t("pricing.keeper.name"),
              curator: t("pricing.curator.name"),
            },
          }),
          faqPage(absoluteUrl("/image-voice", locale), faq),
          breadcrumbs(locale, [
            { name: SITE_NAME, route: "/" },
            { name: APP_NAME, route: "/image-voice" },
          ]),
        ]}
      />
      {/* 1 — Hero. Number-free by design: the one number on this screen is
          the one inside the ring. */}
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
        sub={t.rich("hero.subhead", { lead })}
        cta={
          <>
            <Button asChild size="lg">
              {/* External — a plain anchor, not the locale-aware Link. */}
              <TrackedExternalLink
                href={APP_INSTALL_URL}
                rel="noreferrer"
                event="cta_scan_click"
                eventProps={{ location: "image-voice-hero" }}
              >
                {t("hero.ctaPrimary")}
              </TrackedExternalLink>
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
            {/* The evidence keeps moving after it lands — the one card on
                the page that is alive rather than arriving. */}
            <div className="border-hairline bg-card shadow-card animate-float rounded-2xl border px-10 py-8">
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

      {/* 2 — The task that never gets done. Four sentences and a list; the
          section is deliberately mostly air. */}
      <Section className="relative isolate overflow-hidden sm:py-[150px]">
        <Aura className="top-[14%] h-[620px] w-[940px] bg-[radial-gradient(closest-side,rgba(67,160,71,0.07),transparent_70%)]" />
        <div className="mx-auto flex max-w-[840px] flex-col items-center gap-6 text-center sm:gap-[30px]">
          <Kicker data-reveal>{t("task.eyebrow")}</Kicker>
          <h2
            data-reveal
            className="text-[32px] leading-[1.15] font-bold tracking-[-0.03em] [--reveal-delay:80ms] sm:text-[42px]"
          >
            {t("task.opener")}
          </h2>
          <p
            data-reveal
            className="text-muted-foreground max-w-[720px] text-xl leading-[1.45] font-medium text-balance [--reveal-delay:160ms] sm:text-[26px]"
          >
            {t("task.middleOne")}
          </p>
          <p
            data-reveal
            className="text-muted-foreground max-w-[720px] text-xl leading-[1.45] font-medium text-balance [--reveal-delay:240ms] sm:text-[26px]"
          >
            {t("task.middleTwo")}
          </p>
          <p
            data-reveal
            className="text-primary text-[25px] leading-[1.3] font-bold tracking-[-0.02em] [--reveal-delay:320ms] sm:text-[31px]"
          >
            {t("task.resolution")}
          </p>
        </div>
        <TodoCard />
      </Section>

      {/* 3 — One villain, three bills. The page's only dark band, and the one
          block v2 deliberately left alone. */}
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

      {/* 4 — The competitive argument, shown rather than claimed. One
          specimen, struck through and replaced. */}
      <Section className="relative isolate overflow-hidden sm:py-[130px]">
        <Aura className="top-[22%] h-[600px] w-[900px] bg-[radial-gradient(closest-side,rgba(67,160,71,0.06),transparent_70%)]" />
        <SectionHeading
          align="center"
          kicker={t("checkbox.kicker")}
          title={t("checkbox.title")}
          sub={t("checkbox.sub")}
          className="max-w-[720px]"
        />
        <SpecimenCard />
        <p
          data-reveal
          className="text-muted-foreground mx-auto mt-14 max-w-[660px] text-center text-lg leading-[1.6] text-balance"
        >
          {t.rich("checkbox.closer", { lead })}
        </p>
      </Section>

      {/* 5 — The ladder every Leaf app climbs, drawn as one thread. */}
      <Section divided>
        <SectionHeading
          align="center"
          kicker={t("how.kicker")}
          title={t("how.title")}
        />
        <StepsRow
          variant="connected"
          className="mt-[70px]"
          steps={steps.map((key) => ({
            title: t(`how.${key}.title`),
            body: t(`how.${key}.body`),
          }))}
        />
        <p data-reveal className="text-ink-faint mt-14 text-center text-[15px]">
          {t("how.footer")}
        </p>
      </Section>

      {/* 6 — Not a feature list. Four chapters, in the order they happen. */}
      <Section divided>
        <SectionHeading
          kicker={t("benefits.kicker")}
          title={t("benefits.title")}
          sub={t("benefits.sub")}
          className="max-w-[680px]"
        />
        <Journey />
      </Section>

      {/* 7 — Pricing. The free plan is a plan, not a trial. */}
      <Section id="pricing" divided className="scroll-mt-16">
        <SectionHeading
          align="center"
          kicker={t("pricing.kicker")}
          title={t("pricing.title")}
          sub={t("pricing.sub")}
          className="max-w-[720px]"
        />
        <PricingCards />
        <p
          data-reveal
          className="text-muted-foreground mx-auto mt-11 max-w-[720px] text-center leading-[1.6]"
        >
          {t("pricing.trust")}
        </p>
        <p
          data-reveal
          className="text-ink-faint mt-5 text-center text-[15px] [--reveal-delay:90ms]"
        >
          {t.rich("pricing.footer", {
            link: (chunks) => (
              <Link href="/" className="text-brand-800 font-semibold">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </Section>

      {/* 8 — The objections, answered before they are asked. */}
      <Section divided containerClassName="max-w-[800px]">
        <SectionHeading
          align="center"
          kicker={t("faq.kicker")}
          title={t("faq.title")}
        />
        <Faq
          className="mt-12"
          /* Seventeen questions is a wall to scroll past on the way to the
           * install button. Six covers the whole safety group plus the one
           * everybody asks; the rest are there for whoever wants them. */
          collapseAfter={6}
          moreLabel={t("faq.showAll", { count: faqKeys.length })}
          lessLabel={t("faq.showFewer")}
          items={faq}
        />
      </Section>

      {/* 8.5 — The content layer, linked from the one page it belongs to.
          Two of these three send readers to a competitor if the competitor
          is the better fit, which is the same argument the FAQ above makes
          and the reason this block sits after it rather than in the nav. */}
      <Section divided containerClassName="max-w-[800px]">
        <SectionHeading
          align="center"
          kicker={t("compare.kicker")}
          title={t("compare.title")}
        />
        <div data-reveal-group className="border-hairline mt-10 border-b">
          {comparisons.map(({ href, key }) => (
            <TrackedLink
              key={href}
              href={href}
              data-reveal
              event="cta_app_view"
              eventProps={{ location: "image-voice-compare", page: key }}
              className="group hover:bg-brand-50/50 border-hairline flex items-center justify-between gap-6 border-t px-2 py-6 transition-colors duration-200"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-foreground text-[19px] font-semibold tracking-[-0.015em]">
                  {t(`compare.${key}`)}
                </span>
                <span className="text-muted-foreground text-[15px] leading-[1.55]">
                  {t(`compare.${key}Sub`)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-brand-800 shrink-0 text-2xl transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                {"\u2192"}
              </span>
            </TrackedLink>
          ))}
        </div>
      </Section>

      {/* 9 — Install. Two futures, one button. */}
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
