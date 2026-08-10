import type { Metadata } from "next";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Section, SectionHeading } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
            <Badge variant="outline">{APP_NAME} for Shopify</Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-[52px] sm:leading-[1.1]">
              {MIRROR.needsAttention.toLocaleString()} of your images may be
              saying nothing
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              That’s a typical scan of a {MIRROR.total.toLocaleString()}-image
              store. Yours takes about a minute, writes nothing, and shows you
              the real number — graded, not just counted.
            </p>
            <div className="mt-8">
              <TrackedLink
                href={APP_INSTALL_URL}
                event="cta_scan_click"
                eventProps={{ location: "alt-text-hero" }}
                className={buttonVariants({ size: "lg" })}
              >
                Scan my store free
              </TrackedLink>
              <p className="text-muted-foreground mt-3 text-sm">
                We only ever touch the alt field. Nothing is written without
                your approval.
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
      <Section wash>
        <SectionHeading
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
              <CardContent className="pt-6">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-muted-foreground mx-auto mt-10 max-w-2xl text-center leading-relaxed">
          And now a fourth: AI shopping agents describe your products to buyers
          by reading what your images say. Right now, yours may be saying
          nothing â while your competitors’ catalogs do the talking.
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
          <Card className="border-2">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Title-echo generators
              </p>
              <p className="mt-3 font-mono text-sm leading-relaxed">
                &ldquo;Aria Midi Dress — Olive — S/M/L — New Arrivals&rdquo;
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                100% coverage. Zero description. A screen reader and a shopping
                agent learn nothing.
              </p>
            </CardContent>
          </Card>
          <Card className="border-brand-600 border-2">
            <CardContent className="pt-6">
              <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
                {APP_NAME}
              </p>
              <p className="mt-3 font-mono text-sm leading-relaxed">
                &ldquo;Model wearing the Aria midi dress in olive linen,
                wrap-front with tie waist, photographed outdoors in soft
                light&rdquo;
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                Written from the actual image. Distinct for every photo of the
                product.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* 4 — Trust ladder. */}
      <Section wash>
        <SectionHeading
          kicker="How trust is earned"
          title="Scan. Taste. Review. Auto-pilot."
          sub="You hand over exactly as much as the app has earned — one rung at a time."
        />
        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {ladder.map((rung, i) => (
            <li key={rung.step}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{rung.step}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
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
        <ol className="mx-auto mt-12 max-w-2xl space-y-8 border-l-2 pl-8">
          {laws.map((law) => (
            <li key={law.rule}>
              <h3 className="text-lg font-bold">{law.rule}</h3>
              <p className="text-muted-foreground mt-1 leading-relaxed">
                {law.gloss}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6 — Pricing. */}
      <Section wash id="pricing">
        <SectionHeading
          kicker="Pricing"
          title="Less than an hour of a VA's time — for work no VA does well"
        />
        <PricingCards />
        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed">
          Catalog bigger than 10,000 images a month? A Scale waitlist spot gets
          you personal onboarding — reach us from the support page.
        </p>
      </Section>

      {/* 7 — FAQ + closing CTA. */}
      <Section>
        <SectionHeading kicker="Questions" title="Asked and answered" />
        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-10 max-w-2xl"
        >
          {faq.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            Your store has a number. One minute from now, you could be looking
            at it.
          </h2>
          <div className="mt-6">
            <TrackedLink
              href={APP_INSTALL_URL}
              event="cta_scan_click"
              eventProps={{ location: "alt-text-closing" }}
              className={buttonVariants({ size: "lg" })}
            >
              Scan my store free
            </TrackedLink>
          </div>
        </div>
      </Section>
    </>
  );
}
