import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroSplit } from "@/components/hero-split";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/layout/cta-band";
import { Section, SectionHeading } from "@/components/layout/section";
import { StatementRows } from "@/components/layout/statement-rows";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl, localeMetadata } from "@/lib/metadata";
import { aboutPage, breadcrumbs, faqPage, organization } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    /* `absolute` bypasses the layout's "%s — Leaf Digital" template — the
     * title already names the company, and a suffix would say it twice. */
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    ...localeMetadata("/about", locale),
  };
}

/** The page is a schema; `messages/{locale}/about.json` fills it. */
const beliefs = ["one", "two", "three"] as const;
/**
 * Capped at four, on purpose. A long FAQ on an About page reads as nervous —
 * the page is a statement, and a wall of questions under it undercuts that.
 * The deep FAQs belong on the app pages, where the objections are specific.
 */
const faqKeys = ["who", "safe", "uninstall", "free"] as const;
const commitments = [
  "prices",
  "approval",
  "reconcile",
  "fit",
  "replies",
] as const;

/**
 * The commitments, as a numbered list on hairlines rather than a row of
 * cards or a bulleted block. The heading asks to be held to it, so it has to
 * read like something you could check off line by line — which is also why
 * it is an `<ol>`: the numbers are there so a merchant can quote one back.
 */
function Commitments() {
  const t = useTranslations("about.work");

  return (
    <ol data-reveal-group className="border-hairline border-b">
      {commitments.map((key, i) => (
        <li
          key={key}
          className="border-hairline grid grid-cols-[40px_1fr] items-baseline gap-4 border-t py-6 sm:grid-cols-[56px_1fr] sm:py-7"
        >
          <span
            aria-hidden="true"
            className="text-ink-faint font-mono text-[13px]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-lg leading-[1.55] font-semibold tracking-[-0.01em] sm:text-xl">
            {t(key)}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * /about — where Leaf comes from, what it believes, and the list it asks to
 * be held to.
 *
 * Built from the same parts as the app pages so it reads as the same
 * company: the hero glow, one dark band (the beliefs — the one section that
 * should land as statements, not paragraphs), and the CTA band. The two
 * prose sections set their heading in a left column against the text, the
 * way a contents page would; an about page is read, not scanned.
 *
 * The CTA sends people to the free scan and nowhere else. Every other app is
 * in the lab, and "the best introduction is your own store" is only true of
 * the one that can run on it today.
 */
export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();
  const faq = faqKeys.map((key) => ({
    q: t(`faq.${key}.q`),
    a: t(`faq.${key}.a`),
  }));
  const lead = (chunks: React.ReactNode) => (
    <strong className="text-foreground font-semibold">{chunks}</strong>
  );
  const app = (
    href: "/image-voice" | "/reorder-loop" | "/count-check" | "/runway",
  ) =>
    function AppLink(chunks: React.ReactNode) {
      return (
        <Link href={href} className="text-brand-800 font-semibold">
          {chunks}
        </Link>
      );
    };

  return (
    <>
      <JsonLd
        graph={[
          organization(),
          aboutPage({
            url: absoluteUrl("/about", locale),
            name: t("meta.title"),
            description: t("meta.description"),
            locale,
          }),
          breadcrumbs(locale, [
            { name: SITE_NAME, route: "/" },
            { name: t("breadcrumb"), route: "/about" },
          ]),
          /* No rich result for a company FAQ since 2023 — it is here because
           * answer engines still read it, and "who is behind this" is exactly
           * what they get asked. */
          faqPage(absoluteUrl("/about", locale), faq),
        ]}
      />

      {/* 1 — Hero. No visual: the page's evidence is the list further down,
          and a card of numbers up here would be an app page's hero. */}
      <HeroSplit
        title={
          <h1 className="text-4xl tracking-[-0.045em] sm:text-6xl lg:text-[66px] lg:leading-[1.02]">
            {t.rich("hero.headline", {
              accent: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        }
        sub={t("hero.subhead")}
      />

      {/* 2 — Where we come from. */}
      <Section divided>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading title={t("origin.title")} />
          <div
            data-reveal
            className="text-muted-foreground flex max-w-[680px] flex-col gap-6 text-lg leading-[1.7]"
          >
            <p>{t.rich("origin.one", { lead })}</p>
            <p>
              {t.rich("origin.two", {
                imageVoice: app("/image-voice"),
                reorderLoop: app("/reorder-loop"),
                countCheck: app("/count-check"),
                runway: app("/runway"),
              })}
            </p>
          </div>
        </div>
      </Section>

      {/* 3 — What we believe. The page's one dark band. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          title={t("believe.title")}
          className="max-w-[760px]"
        />
        <StatementRows
          labelWidth="narrow"
          items={beliefs.map((key, i) => ({
            label: String(i + 1).padStart(2, "0"),
            statement: t(`believe.${key}.statement`),
            body: t.has(`believe.${key}.body`)
              ? t(`believe.${key}.body`)
              : undefined,
          }))}
        />
      </Section>

      {/* 4 — How we work. The list the page asks to be held to. */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading title={t("work.title")} sub={t("work.sub")} />
          <Commitments />
        </div>
      </Section>

      {/* 5 — The four questions asked before anyone installs. */}
      <Section divided>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionHeading title={t("faq.title")} />
          <Faq items={faq} />
        </div>
      </Section>

      {/* 6 — The one thing to do. */}
      <CtaBand
        title={t("cta.title")}
        sub={t("cta.sub")}
        action={
          <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
            <TrackedLink
              href="/image-voice#scan"
              data-motion="dot"
              event="cta_scan_click"
              eventProps={{ location: "about-cta" }}
            >
              {t("cta.button")}
            </TrackedLink>
          </Button>
        }
        note={
          <>
            {t.rich("cta.note", {
              apps: (chunks) => (
                <Link href="/#apps" className="font-semibold text-white">
                  {chunks}
                </Link>
              ),
              guide: (chunks) => (
                <Link
                  href="/guides/shopify-alt-text"
                  className="font-semibold text-white"
                >
                  {chunks}
                </Link>
              ),
            })}
            <span className="mt-4 block font-semibold text-white">
              {t("cta.signoff")}
            </span>
          </>
        }
      />
    </>
  );
}
