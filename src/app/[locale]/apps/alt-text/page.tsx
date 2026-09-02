import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { Faq } from "@/components/faq";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
import { Card, CardContent } from "@/components/ui/card";
import { APP_INSTALL_URL, APP_NAME, MIRROR } from "@/lib/constants";
import { PricingCards } from "./pricing-cards";

export const metadata: Metadata = {
  title: `${APP_NAME} — alt text for Shopify, actually looked at`,
  description:
    "Scan your store free and see how many product images are invisible to Google, screen readers, and AI shopping agents. Then watch real alt text get written — image by image, reversible, and only ever the alt field.",
};

/* The four product laws — verbatim from the product blueprint. Do not edit
 * copy here without the maintainer: these are frozen strings. */
const laws = [
  {
    rule: "Never touch anything but the alt field.",
    gloss:
      "Not your theme, not your titles, not your images. One field, loudly promised.",
  },
  {
    rule: "Never write from the filename or product title.",
    gloss:
      "Every image is actually looked at. That is the quality moat — and it goes on the pricing page.",
  },
  {
    rule: "Never silently overwrite alt a human wrote.",
    gloss:
      "Descriptive alt you or your team wrote is detected and skipped — shown as “already good” in your scan.",
  },
  {
    rule: "Never start alt with “image of”.",
    gloss:
      "Around 125 characters. Distinct for every image of the same product. Your brand and product name where they read naturally.",
  },
];

const ladder = [
  {
    step: "Scan",
    body: "Install, and the mirror appears in about a minute: one number, graded missing / weak / good. No setup, no wizard, nothing written yet.",
  },
  {
    step: "Taste",
    body: "We write alt for 25 of your own images, free, lifetime — side by side with the pictures. Judge the quality with your own eyes, on your own products.",
  },
  {
    step: "Review",
    body: "Fix the catalog with review mode on by default: the app proposes, you approve, edit, or skip — keyboard-fast, 200 decisions in a sitting. Nothing touches Shopify until you approve it.",
  },
  {
    step: "Auto-pilot",
    body: "After your approvals settle, the app offers to take over — quoting your own record: “You approved 96% unchanged.” Per-source, always reversible. We never ask for trust; we show the receipts.",
  },
];

const faq = [
  {
    q: "Can I undo what it writes?",
    a: "Yes — every applied alt keeps its before and after, with one-click restore, for 30 days. Auto-pilot is reversible the same way, and you can switch it off per source at any time.",
  },
  {
    q: "What exactly does the app touch?",
    a: "The alt field. Nothing else — not your theme code, not your images, not your product content. That is the first of the four laws above, and the app is built so it cannot do otherwise.",
  },
  {
    q: "Will it overwrite alt text my team already wrote?",
    a: "No. Human-written descriptive alt is detected and skipped, and shows up as “already good” in your scan. We grade it; we don't replace it.",
  },
  {
    q: "How is this different from the cheap alt-text generators?",
    a: "Most of them template your product title into the alt field and call it 100% coverage. We look at every image with a vision model and describe what is actually in the picture — that's the difference you taste-test on your own 25, free.",
  },
  {
    q: "How does billing work?",
    a: "The scan and 25 fixes are free forever. Paid plans are flat monthly prices with usage caps — no metered surprises — and a 14-day trial. Cancel any time; your alt text stays yours.",
  },
  {
    q: "What about very large catalogs?",
    a: "The Scale tier handles up to 10,000 images a month. Bigger than that? Join the Scale waitlist from the pricing section and we'll onboard you personally.",
  },
];

export default function AltTextPage() {
  return (
    <>
      {/* 1 — Hero: the mirror. */}
      <Section id="scan" className="pb-12">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <PillBadge>{APP_NAME} for Shopify</PillBadge>
            {/* Sized for this page's 50/50 split, not the 7fr hero column —
             * see the sweep note about moving this onto `HeroSplit`. The
             * headline figure stays in the heading face: mono advances open
             * gaps a display line can't carry. */}
            <h1 className="mt-6 text-4xl tracking-[-0.045em] tabular-nums sm:text-5xl">
              {MIRROR.needsAttention.toLocaleString()} of your images may be
              saying <span className="text-primary">nothing</span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-[1.65]">
              That’s a typical scan of a {MIRROR.total.toLocaleString()}-image
              store. Yours takes about a minute, writes nothing, and shows you
              the real number — graded, not just counted.
            </p>
            <div className="mt-9">
              <Button asChild size="lg">
                <TrackedLink
                  href={APP_INSTALL_URL}
                  event="cta_scan_click"
                  eventProps={{ location: "alt-text-hero" }}
                >
                  Scan my store free
                </TrackedLink>
              </Button>
              <p className="text-fine text-ink-faint mt-4">
                Free forever to scan · No card · We only ever touch the alt
                field
              </p>
            </div>
          </div>
          <CoverageRing
            covered={MIRROR.needsAttention}
            total={MIRROR.total}
            label="images need attention"
            className="justify-self-center"
          />
        </div>
      </Section>

      {/* 2 — Problem / agitate. */}
      <Section tone="dark">
        <SectionHeading
          tone="dark"
          kicker="The quiet leak"
          title="Missing alt text costs you three ways, and none of them show up in your analytics"
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              title: "SEO money left on the table",
              body: "Google Images is a shopping surface. Every image without real alt text is a product your next customer searches for and never sees.",
            },
            {
              title: "Accessibility exposure",
              body: "ADA-adjacent lawsuits name missing alt text. Screen-reader users hear your catalog as silence — and plaintiffs' firms listen for exactly that.",
            },
            {
              title: "It's nobody's job",
              body: "Three thousand images, and no one on the team owns a single one of them. Unassigned work doesn't get done — it compounds.",
            },
          ].map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent>
                <h3 className="text-h3">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-[1.65]">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-on-dark-muted mx-auto mt-10 max-w-2xl text-center leading-[1.65]">
          And now a fourth: AI shopping agents describe your products to buyers
          by reading what your images say. Right now, yours may be saying
          nothing — while your competitors’ catalogs do the talking.
        </p>
      </Section>

      {/* 3 — Taste test. */}
      <Section>
        <SectionHeading
          kicker="The taste test"
          title="Judge the quality on your own products — 25 images, free, lifetime"
          sub="Cheap generators echo your product title and call it coverage. We look at the picture. Here's the difference on one image:"
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          <Card>
            <CardContent>
              <p className="text-kicker text-ink-faint uppercase">
                Title-echo generators
              </p>
              <p className="mt-3 font-mono text-sm leading-[1.6]">
                &ldquo;Aria Midi Dress — Olive — S/M/L — New Arrivals&rdquo;
              </p>
              <p className="text-muted-foreground text-fine mt-3">
                100% coverage. Zero description. A screen reader and a shopping
                agent learn nothing.
              </p>
            </CardContent>
          </Card>
          <Card className="border-brand-800/25">
            <CardContent>
              <Kicker>{APP_NAME}</Kicker>
              <p className="mt-3 font-mono text-sm leading-[1.6]">
                &ldquo;Model wearing the Aria midi dress in olive linen,
                wrap-front with tie waist, photographed outdoors in soft
                light&rdquo;
              </p>
              <p className="text-muted-foreground text-fine mt-3">
                Written from the actual image. Distinct for every photo of the
                product.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* 4 — Trust ladder. */}
      <Section tone="wash">
        <SectionHeading
          kicker="How trust is earned"
          title="Scan. Taste. Review. Auto-pilot."
          sub="You hand over exactly as much as the app has earned — one rung at a time."
        />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {ladder.map((rung, i) => (
            <li key={rung.step}>
              <Card className="h-full">
                <CardContent>
                  <Kicker>Step {i + 1}</Kicker>
                  <h3 className="text-h3 mt-1.5">{rung.step}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-[1.65]">
                    {rung.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5 — The four product laws, engraved. */}
      <Section>
        <SectionHeading
          kicker="Product law"
          title="What we never do"
          sub="Written down before the first install, enforced by the code — not the marketing."
        />
        <ol className="border-border mx-auto mt-12 max-w-2xl space-y-8 border-l pl-8">
          {laws.map((law) => (
            <li key={law.rule}>
              <h3 className="text-h3">{law.rule}</h3>
              <p className="text-muted-foreground mt-1.5 leading-[1.65]">
                {law.gloss}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — Pricing. */}
      <Section tone="wash" id="pricing">
        <SectionHeading
          kicker="Pricing"
          title="Less than an hour of a VA's time — for work no VA does well"
        />
        <PricingCards />
        <p className="text-ink-faint text-fine mx-auto mt-8 max-w-2xl text-center">
          Catalog bigger than 10,000 images a month? A Scale waitlist spot gets
          you personal onboarding — reach us from the support page.
        </p>
      </Section>

      {/* 7 — FAQ + closing CTA. */}
      <Section>
        <SectionHeading kicker="Questions" title="Asked and answered" />
        <Faq items={faq} className="mx-auto mt-10 max-w-2xl" />
        <div className="mt-16 text-center">
          <h2 className="sm:text-h2 text-3xl tracking-[-0.03em]">
            Your store has a number. One minute from now, you could be looking
            at it.
          </h2>
          <div className="mt-9">
            <Button asChild size="lg">
              <TrackedLink
                href={APP_INSTALL_URL}
                event="cta_scan_click"
                eventProps={{ location: "alt-text-closing" }}
              >
                Scan my store free
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
