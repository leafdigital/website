import { useTranslations } from "next-intl";
import { TrackedExternalLink } from "@/components/analytics/tracked-external-link";
import { Button } from "@/components/ui/button";
import {
  APP_INSTALL_URL,
  FOUNDING_CURATOR_PRICE,
  OFFER,
  PRICING,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Three plans, and the argument is the order: the free one is a real plan,
 * not a trial. Curator is the only featured card — a floating pill, a green
 * wash, and the founder offer stated in a filled tile inside it, because an
 * offer that reads as fine print does not get taken.
 *
 * Every button points at the same place. There is nothing to buy on this
 * page: you install, you scan, you decide.
 *
 * v2 adds the hover lift and makes the founder tile breathe: it is the one
 * offer on the page with a countdown behind it, and a tile that sits
 * perfectly still reads as boilerplate.
 */
function Plan({
  name,
  price,
  period,
  tagline,
  features,
  cta,
  featured = false,
  featuredLabel,
  offer,
}: {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: React.ReactNode[];
  cta: string;
  featured?: boolean;
  featuredLabel?: string;
  offer?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-xl p-8",
        /* The lift is on `translate`, not `transform` — the reveal system
         * owns `transform` on these cards and would flatten a hover that
         * shared it. */
        "transition-[translate,box-shadow] duration-250 ease-out hover:-translate-y-1 motion-reduce:transition-none",
        featured
          ? "border-brand-800/40 shadow-featured from-brand-50 border-[1.5px] bg-linear-to-b to-white to-70% hover:shadow-[0_24px_56px_rgb(46_125_50/0.2)]"
          : "border-hairline bg-card hover:shadow-card-lifted border",
      )}
    >
      {featured && featuredLabel ? (
        <span
          data-reveal
          data-motion="dot"
          className="bg-primary text-primary-foreground absolute -top-3 left-8 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.05em] uppercase [--reveal-delay:260ms]"
        >
          {featuredLabel}
        </span>
      ) : null}
      <div>
        <h3 className="text-lg">{name}</h3>
        <p className="mt-1 text-[34px] leading-tight font-extrabold tracking-[-0.03em]">
          {price}
          {period ? (
            <span className="text-ink-faint text-[15px] font-medium">
              {period}
            </span>
          ) : null}
        </p>
        <p className="text-ink-faint mt-1 text-sm">{tagline}</p>
      </div>
      {offer}
      <ul className="flex flex-col gap-2.5 text-base leading-[1.5] sm:text-sm">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <Button
        asChild
        variant={featured ? "default" : "secondary"}
        className={cn("mt-auto h-11 w-full", featured && "shadow-cta-sm")}
      >
        {/* External — a plain anchor, not the locale-aware Link. Every plan
            button is the same free scan, so none of them stops at an anchor
            further down the page. */}
        <TrackedExternalLink
          href={APP_INSTALL_URL}
          rel="noreferrer"
          event="cta_scan_click"
          eventProps={{ location: "pricing", plan: name }}
        >
          {cta}
        </TrackedExternalLink>
      </Button>
    </div>
  );
}

export function PricingCards() {
  const t = useTranslations("imageVoice.pricing");
  /* Load-bearing words inside a feature line, supplied at the call site so
   * the sentence stays one key (docs/i18n.md §6). */
  const lead = (chunks: React.ReactNode) => (
    <strong className="font-semibold">{chunks}</strong>
  );

  return (
    <div data-reveal-group className="mt-14 grid gap-[18px] lg:grid-cols-3">
      <Plan
        name={t("audit.name")}
        price={t("audit.price", { amount: PRICING.audit })}
        tagline={t("audit.tagline")}
        cta={t("audit.cta")}
        features={[t("audit.one"), t("audit.two"), t("audit.three")]}
      />
      <Plan
        name={t("keeper.name")}
        price={t("keeper.price", { amount: PRICING.keeper })}
        period={t("period")}
        tagline={t("keeper.tagline")}
        cta={t("keeper.cta")}
        features={[
          t("keeper.one"),
          t.rich("keeper.two", { lead }),
          t("keeper.three"),
          t("keeper.four"),
          t("keeper.five"),
        ]}
      />
      <Plan
        featured
        featuredLabel={t("featured")}
        name={t("curator.name")}
        price={t("curator.price", { amount: PRICING.curator })}
        period={t("period")}
        tagline={t("curator.tagline")}
        cta={t("curator.cta")}
        offer={
          /* A filled green tile, not a dashed note: this is the one place on
           * the page where the offer has to outrank the plan around it. */
          <aside className="bg-primary border-brand-800/50 animate-glow-pulse rounded-lg border-[1.5px] px-4 py-3.5 shadow-[0_6px_18px_rgb(46_125_50/0.25)]">
            <p className="text-[12px] font-bold tracking-[0.06em] text-white/75 uppercase">
              {t("curator.offerLabel")}
            </p>
            <p className="mt-1 text-sm leading-[1.5] text-white">
              {t.rich("curator.offer", {
                lead: (chunks) => <strong>{chunks}</strong>,
                spots: OFFER.foundingCurators,
                price: FOUNDING_CURATOR_PRICE,
              })}
            </p>
          </aside>
        }
        features={[
          t("curator.one"),
          t.rich("curator.two", { lead }),
          t("curator.three"),
          t("curator.four"),
        ]}
      />
    </div>
  );
}
