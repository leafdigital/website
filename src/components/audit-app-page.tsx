import { useLocale, useTranslations } from "next-intl";
import { TrackedExternalLink } from "@/components/analytics/tracked-external-link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ChangeTimeline } from "@/components/change-timeline";
import { DocumentCard } from "@/components/document-card";
import { Faq } from "@/components/faq";
import { HeroSplit } from "@/components/hero-split";
import { CtaBand } from "@/components/layout/cta-band";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { JsonLd } from "@/components/seo/json-ld";
import { StepsRow } from "@/components/steps-row";
import { StrikeList } from "@/components/strike-list";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/constants";
import { mailto } from "@/lib/mailto";
import { absoluteUrl } from "@/lib/metadata";
import type { AppRoute } from "@/lib/routes";
import { breadcrumbs, faqPage, organization } from "@/lib/schema";

/**
 * The audit pages — Ledger and 3PL Bill Check — make the Image Voice
 * argument for an app you cannot install yet. Same shape, told as one
 * continuous scroll:
 *
 *   hero      the claim, the one card of numbers beside it, and the ask
 *   task      the job nobody does, and the document it happens to
 *   prices    one villain, three prices — the page's only dark band
 *   confess   the objection we share, answered with a specimen record
 *   how       three moves on a drawn thread
 *   changes   what is different on Tuesday, as a timeline
 *   stop      the list that crosses itself out
 *   pair      (optional) the second buyer — Ledger's bookkeeper
 *   trust     one paragraph, on the wash
 *   faq       the questions we'd ask too
 *   ask       two futures, one button
 *
 * The ask is an email. There is no waitlist and no install: the visitor
 * forwards an invoice or sends ten POs, and the free audit comes back. So
 * the primary CTA is a mailto whose subject line (`common.mail.*`) tells the
 * inbox which audit it is, and the structured data is the page, the trail
 * and the FAQ — no `SoftwareApplication`, because nothing can be installed.
 *
 * What a page owns: its hero `visual`, its `specimen` record, the `doc` the
 * task happens to, and the key lists below. Everything else is copy.
 */
export function AuditAppPage({
  namespace,
  route,
  name,
  mail,
  visual,
  specimen,
  doc,
  prices,
  steps,
  changes,
  stop,
  faq: faqKeys,
}: {
  /** The message namespace: `ledger`, `billCheck`. */
  namespace: string;
  route: AppRoute;
  /** The brand name, for the breadcrumb trail. Never translated. */
  name: string;
  /** The `common.mail.*` key holding this audit's subject line. */
  mail: string;
  /** The hero's right column: this app's card of numbers. */
  visual: React.ReactNode;
  /** The specimen record in the confess section — a `FieldCard`. */
  specimen: React.ReactNode;
  /** The ICU values the task document's `meta` line needs. */
  doc: Record<string, number>;
  /** Key lists, in reading order. */
  prices: readonly string[];
  steps: readonly string[];
  changes: readonly string[];
  stop: readonly string[];
  faq: readonly string[];
}) {
  const t = useTranslations(namespace);
  const common = useTranslations("common");
  const locale = useLocale();
  /* A page's analytics location is its route, minus the slash. */
  const source = route.slice(1);
  const href = mailto(common(`mail.${mail}`));
  const lead = (chunks: React.ReactNode) => (
    <strong className="text-foreground font-semibold">{chunks}</strong>
  );
  /* Built once and used twice: the accordion renders these, the FAQPage node
   * describes them. One source, so the two can never disagree. */
  const faq = faqKeys.map((key) => ({
    q: t(`faq.${key}.q`),
    a: t(`faq.${key}.a`),
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
          faqPage(absoluteUrl(route, locale), faq),
        ]}
      />

      {/* 1 — Hero. "In the lab" is a status, so the badge stays neutral. */}
      <HeroSplit
        badge={<PillBadge tone="neutral">{t("hero.badge")}</PillBadge>}
        title={
          <h1 className="text-4xl tracking-[-0.045em] sm:text-5xl lg:text-[60px] lg:leading-[1.04]">
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
              {/* A mailto — a plain anchor, not the locale-aware Link. */}
              <TrackedExternalLink
                href={href}
                event="cta_audit_request"
                eventProps={{ location: `${source}-hero` }}
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
                href={`${route}#changes`}
                event="cta_app_view"
                eventProps={{ location: `${source}-hero-secondary` }}
              >
                {t("hero.ctaSecondary")}
              </TrackedLink>
            </Button>
          </>
        }
        finePrint={t("hero.finePrint")}
        visual={visual}
      />

      {/* 2 — The task nobody does. Three sentences and the document they
          happen to; the section is deliberately mostly air. */}
      <Section className="relative isolate overflow-hidden sm:py-[150px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[14%] left-1/2 -z-10 h-[620px] w-[940px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(67,160,71,0.07),transparent_70%)] blur-[40px]"
        />
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
          {t.has("task.resolution") ? (
            <p
              data-reveal
              className="text-primary text-[25px] leading-[1.3] font-bold tracking-[-0.02em] [--reveal-delay:320ms] sm:text-[31px]"
            >
              {t("task.resolution")}
            </p>
          ) : null}
        </div>
        <DocumentCard
          name={t("task.doc.name")}
          meta={t("task.doc.meta", doc)}
          stamp={t.has("task.doc.stamp") ? t("task.doc.stamp") : undefined}
          caption={t("task.doc.caption")}
        />
      </Section>

      {/* 3 — One villain, three prices. The page's only dark band. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker={t("prices.kicker")}
          title={t("prices.title")}
          className="max-w-[760px]"
        />
        <StatementRows
          items={prices.map((key) => ({
            label: t(`prices.${key}.label`),
            statement: t(`prices.${key}.statement`),
            body: t(`prices.${key}.body`),
          }))}
        />
      </Section>

      {/* 4 — Attack and confess. The objection, then the record that answers
          it — shown, not claimed. */}
      <Section className="relative isolate overflow-hidden sm:py-[130px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[22%] left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(67,160,71,0.06),transparent_70%)] blur-[40px]"
        />
        <SectionHeading
          align="center"
          kicker={t("confess.kicker")}
          title={t("confess.title")}
          sub={t("confess.sub")}
          className="max-w-[720px]"
        />
        {specimen}
        <p
          data-reveal
          className="text-muted-foreground mx-auto mt-14 max-w-[660px] text-center text-lg leading-[1.6] text-balance"
        >
          {t.rich("confess.closer", { lead })}
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
        <p
          data-reveal
          className="text-ink-faint mx-auto mt-14 max-w-[640px] text-center text-[15px] leading-[1.6]"
        >
          {t("how.footer")}
        </p>
      </Section>

      {/* 6 — Not a feature list. The hero's secondary CTA lands here. */}
      <Section id="changes" divided className="scroll-mt-16">
        <SectionHeading
          kicker={t("changes.kicker")}
          title={t("changes.title")}
          sub={t("changes.sub")}
          className="max-w-[680px]"
        />
        <ChangeTimeline
          items={changes.map((key) => ({
            label: t(`changes.${key}.label`),
            title: t(`changes.${key}.title`),
            body: t(`changes.${key}.body`),
          }))}
        />
      </Section>

      {/* 7 — The list that crosses itself out. */}
      <Section divided containerClassName="max-w-[800px]">
        <SectionHeading kicker={t("stop.kicker")} title={t("stop.title")} />
        <StrikeList items={stop.map((key) => t(`stop.${key}`))} />
      </Section>

      {/* 8 — The second buyer, when there is one. Ledger's bookkeeper is the
          one case; Bill Check has no `pair` keys and skips the band. */}
      {t.has("pair.title") ? (
        <Section divided>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
            <SectionHeading kicker={t("pair.kicker")} title={t("pair.title")} />
            <p
              data-reveal
              className="text-muted-foreground max-w-[640px] text-xl leading-[1.55] lg:pt-11"
            >
              {t("pair.body")}
            </p>
          </div>
        </Section>
      ) : null}

      {/* 9 — Trust. One paragraph, on the wash, nothing to click. */}
      <Section tone="wash">
        <p
          data-reveal
          className="text-foreground mx-auto max-w-[760px] text-center text-xl leading-[1.55] text-balance sm:text-[24px]"
        >
          {t("trust")}
        </p>
      </Section>

      {/* 10 — The objections, answered before they are asked. */}
      <Section
        id="faq"
        divided
        className="scroll-mt-16"
        containerClassName="max-w-[800px]"
      >
        <SectionHeading
          align="center"
          kicker={t("faq.kicker")}
          title={t("faq.title")}
        />
        <Faq className="mt-12" items={faq} />
      </Section>

      {/* 11 — Two futures, one button. */}
      <CtaBand
        id="send"
        title={t("cta.title")}
        sub={t("cta.sub")}
        action={
          <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
            <TrackedExternalLink
              href={href}
              data-motion="dot"
              event="cta_audit_request"
              eventProps={{ location: `${source}-cta` }}
            >
              {t("cta.button")}
            </TrackedExternalLink>
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
