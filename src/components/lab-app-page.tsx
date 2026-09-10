import { useLocale, useTranslations } from "next-intl";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ContrastCards } from "@/components/contrast-cards";
import { Faq } from "@/components/faq";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { PullQuote } from "@/components/pull-quote";
import { JsonLd } from "@/components/seo/json-ld";
import { StepsRow } from "@/components/steps-row";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { WaitlistForm } from "@/components/waitlist-form";
import { Link } from "@/i18n/navigation";
import { OFFER, SITE_NAME } from "@/lib/constants";
import { absoluteUrl } from "@/lib/metadata";
import type { AppRoute } from "@/lib/routes";
import { breadcrumbs, faqPage, organization } from "@/lib/schema";

/**
 * The three lab apps make the same argument in the same order, so they are
 * one page schema filled from three message files rather than three files
 * that will drift.
 *
 * The order is the argument and it does not vary per app:
 *
 *   hero        the claim, with the one number that carries it beside it
 *   identify    their day, in their words — the dark band, once per page
 *   logic       what actually changes, in three moves
 *   objections  the reasons not to believe it, asked out loud
 *   confess     the one we share — a beat, nothing to click
 *   solution    the two futures, side by side
 *   ask         one thing to do
 *
 * What a page owns is its `visual` (the number in the hero is different every
 * time) and its accent word. Everything else is copy. If an app ever needs a
 * section this schema does not have, give it its own page rather than growing
 * a fourth variant flag here.
 */

/** Every namespace here fills the same key shape — see messages/en. */
const scenarios = ["one", "two", "three", "four"] as const;
const moves = ["one", "two", "three"] as const;

/**
 * How many objections a page answers. Three is the shape the schema was
 * written around and stays the default; a page passes its own list only when
 * the argument genuinely has a fourth one to answer — the `Faq` is a stacked
 * list, so it costs nothing but the words.
 */
const defaultObjections = ["one", "two", "three"] as const;

export function LabAppPage({
  namespace,
  route,
  name,
  source,
  visual,
  objections = defaultObjections,
}: {
  /** The message namespace: `reorderLoop`, `countCheck`, `lostSales`. */
  namespace: string;
  route: AppRoute;
  /** The brand name, for the breadcrumb trail. Never translated. */
  name: string;
  /** Which page the waitlist submission came from, for the inbox. */
  source: string;
  /** The hero's right column: this app's one number. */
  visual: React.ReactNode;
  /** Objection keys, in order. Defaults to the schema's three. */
  objections?: readonly string[];
}) {
  const t = useTranslations(namespace);
  const locale = useLocale();

  const faq = objections.map((key) => ({
    q: t(`objections.${key}.q`),
    a: t(`objections.${key}.a`),
  }));

  return (
    <>
      <JsonLd
        graph={[
          organization(),
          breadcrumbs(locale, [
            { name: SITE_NAME, route: "/" },
            { name, route },
          ]),
          /* The objections are the page's FAQ whether or not they are headed
           * "FAQ" — they are questions with answers, and the answer engines
           * that read this markup are exactly the audience for them. */
          faqPage(absoluteUrl(route, locale), faq),
        ]}
      />

      {/* 1 — Hero. "In the lab" is a status, so the badge stays neutral. */}
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
                href={`${route}#waitlist`}
                event="cta_waitlist_join"
                eventProps={{ location: `${source}-hero` }}
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
                href={`${route}#logic`}
                event="cta_app_view"
                eventProps={{ location: `${source}-hero-secondary` }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint", { spots: OFFER.charterStores })}
        visual={visual}
      />

      {/* 2 — Their day, stated back to them. One dark band per page. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("identify.kicker")}
          title={t("identify.title")}
          className="max-w-[760px]"
        />
        <StatementRows
          labelWidth="narrow"
          items={scenarios.map((key, i) => ({
            label: String(i + 1).padStart(2, "0"),
            statement: t(`identify.${key}.statement`),
            body: t(`identify.${key}.body`),
          }))}
        />
        <p data-reveal className="mt-10 text-[17px] text-white/55">
          {t("identify.closer")}
        </p>
      </Section>

      {/* 3 — What changes. The hero's secondary CTA lands here. */}
      <Section id="logic" divided className="scroll-mt-16">
        <SectionHeading kicker={t("logic.kicker")} title={t("logic.title")} />
        <StepsRow
          className="mt-[60px]"
          steps={moves.map((key) => ({
            title: t(`logic.${key}.title`),
            body: t(`logic.${key}.body`),
          }))}
        />
        <p data-reveal className="text-ink-faint mt-11 text-[15px]">
          {t("logic.footer")}
        </p>
      </Section>

      {/* 4 — The reasons not to believe it, asked before they are thought. */}
      <Section divided>
        <SectionHeading
          kicker={t("objections.kicker")}
          title={t("objections.title")}
        />
        <Faq className="mt-12" items={faq} />
      </Section>

      {/* 5 — The one objection we share. A beat; nothing to click. */}
      <PullQuote title={t("confess.title")} sub={t("confess.sub")} />

      {/* 6 — The two futures. */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          align="center"
          kicker={t("solution.kicker")}
          title={t("solution.title")}
          sub={t("solution.sub")}
          className="mb-14"
        />
        <ContrastCards
          withoutLabel={t("solution.withoutLabel")}
          withoutBody={t("solution.withoutBody")}
          withLabel={t("solution.withLabel")}
          withBody={t("solution.withBody")}
        />
      </Section>

      {/* 7 — One list, every app. */}
      <CtaBand
        id="waitlist"
        title={t("cta.title")}
        sub={t("cta.sub", { spots: OFFER.charterStores })}
        action={<WaitlistForm source={source} />}
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
