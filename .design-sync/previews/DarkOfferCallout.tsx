import { DarkOfferCallout } from "leaf-website";

// It is frosted glass, so both stories put it on CtaBand's own gradient —
// there has to be something behind it to blur. Copy from
// messages/en/hiddenMargin.json → `cta`, spots from OFFER.foundingMerchants.

/** The tile as `/hidden-margin` ships it, above the waitlist form. */
export const Default = () => (
  <div className="from-surface-deep via-brand-900 to-brand-800 bg-linear-[135deg] via-55% p-10">
    <div className="mx-auto max-w-[560px]">
      <DarkOfferCallout label="Founding-merchant offer">
        The first 15 stores get the top plan at the middle plan’s price — locked
        for life.
      </DarkOfferCallout>
    </div>
  </div>
);

/**
 * `<strong>` inside the sentence comes up to full white — the only emphasis
 * the tile has, and where the price mechanic belongs.
 */
export const WithEmphasis = () => (
  <div className="from-surface-deep via-brand-900 to-brand-800 bg-linear-[135deg] via-55% p-10">
    <div className="mx-auto max-w-[560px]">
      <DarkOfferCallout label="Founding-merchant offer">
        The first 15 stores get{" "}
        <strong>the top plan at the middle plan’s price</strong> — locked for
        life.
      </DarkOfferCallout>
    </div>
  </div>
);
