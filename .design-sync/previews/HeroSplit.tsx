import { Button, DataCard, HeroSplit, Kicker, PillBadge } from "leaf-website";

// Copy is the real one from messages/en/*.json; the figures are SAMPLE in
// src/lib/constants.ts, rendered here the way `en` formats them.

/**
 * The homepage hero as it ships: brand badge, an h1 with exactly one green
 * word, two CTAs, the fine-print line, and a DataCard as the evidence column.
 */
export const Default = () => (
  <HeroSplit
    badge={
      <PillBadge>
        <span
          aria-hidden="true"
          className="bg-brand-600 size-1.5 rounded-full"
        />
        Image Voice is live on the Shopify App Store
      </PillBadge>
    }
    title={
      <h1 className="lg:text-hero text-4xl tracking-[-0.045em] sm:text-6xl">
        Your money
        <br />
        is <span className="text-primary">hiding.</span>
      </h1>
    }
    sub="Your Shopify, your 3PL, and your spreadsheet all tell a different story. And the money hides in the gaps."
    cta={
      <>
        <Button size="lg">Scan my store free</Button>
        <Button size="lg" variant="secondary" className="shadow-none">
          See the apps
        </Button>
      </>
    }
    finePrint="Free forever scan · No credit card · Your number in minutes"
    visual={
      <DataCard
        title="Inventory on hand · same SKU set, same day"
        rows={[
          { label: "Shopify", value: "12,480 units" },
          { label: "Your 3PL", value: "12,118 units" },
          { label: "Your spreadsheet", value: "12,940 units" },
          {
            label: "The gap",
            value: "822 units · ~$19,700",
            result: true,
          },
        ]}
        caption="Sample data — your scan is built from your store."
      />
    }
  />
);

/**
 * A lab app: the badge goes neutral because “in the lab” is a status, a
 * `kicker` carries the thesis above the headline, and with no `visual` the
 * copy column simply holds its 7fr width.
 */
export const LabApp = () => (
  <HeroSplit
    badge={
      <PillBadge tone="neutral">
        Hidden Margin · in the lab · early access open
      </PillBadge>
    }
    kicker={
      <Kicker className="tracking-[0.1em]">
        Hidden margins kill businesses
      </Kicker>
    }
    title={
      <h1 className="text-4xl tracking-[-0.045em] sm:text-6xl lg:text-[66px] lg:leading-[1.02]">
        Your catalog has <span className="text-primary">holes.</span>
      </h1>
    }
    sub={
      <>
        Missing costs, weights, codes.{" "}
        <strong className="text-foreground font-semibold">
          Today they hide money.
        </strong>{" "}
        Tomorrow they turn away customers you’ll never even see.
      </>
    }
    cta={
      <>
        <Button size="lg">Join the waitlist</Button>
        <Button size="lg" variant="secondary" className="shadow-none">
          See a sample report
        </Button>
      </>
    }
    finePrint="Free scan · One readiness score · Gaps priced in dollars"
  />
);
