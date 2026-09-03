import { OfferCallout } from "leaf-website";

// Copy from messages/en/imageVoice.json → `pricing.curator`; the price is
// FOUNDING_CURATOR_PRICE (half of PRICING.curator, $28.90).

/** The dashed note on white: a note pinned to a plan, not another plan. */
export const Default = () => (
  <div className="max-w-sm">
    <OfferCallout label="Founding Curator">
      The <strong>first 25 merchants</strong> take Curator at{" "}
      <strong>half price, for life</strong> — $14.45/mo, and the title stays
      yours.
    </OfferCallout>
  </div>
);

/**
 * Pinned inside a plan card, which is the job. Note how quiet it stays — on
 * `/image-voice` the featured card fills this tile with green instead,
 * because there the offer has to outrank the plan around it.
 */
export const InPlanCard = () => (
  <div className="border-hairline bg-card max-w-sm rounded-xl border p-8">
    <h3 className="text-lg">Curator</h3>
    <p className="mt-1 text-[34px] leading-tight font-extrabold tracking-[-0.03em]">
      $28.90
      <span className="text-ink-faint text-[15px] font-medium">/mo</span>
    </p>
    <p className="text-ink-faint mt-1 text-sm">
      The whole store speaks — 14-day free trial
    </p>
    <OfferCallout label="Founding Curator" className="mt-4">
      The <strong>first 25 merchants</strong> take Curator at{" "}
      <strong>half price, for life</strong> — $14.45/mo.
    </OfferCallout>
  </div>
);
