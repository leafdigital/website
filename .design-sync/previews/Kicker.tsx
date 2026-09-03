import { Kicker, Section } from "leaf-website";

// Kickers as the site ships them: section labels from messages/en/home.json,
// hero labels from the app pages.

/** The section label above an h2 — what `SectionHeading` renders for you. */
export const Default = () => (
  <div>
    <Kicker>The plan</Kicker>
    <h2 className="sm:text-h2 mt-3.5 text-3xl leading-[1.1] tracking-[-0.03em]">
      Three steps between you and the hidden money
    </h2>
  </div>
);

/**
 * The hero cut: the app pages widen the tracking to `0.1em` above an h1,
 * where the label has a 66px headline under it to hold its own against.
 */
export const Hero = () => (
  <div>
    <Kicker className="tracking-[0.1em]">Hidden margins kill businesses</Kicker>
    <h1 className="mt-3.5 text-4xl tracking-[-0.045em] sm:text-6xl">
      Your catalog has <span className="text-primary">holes.</span>
    </h1>
  </div>
);

/**
 * `tone="dark"` on the statement band — the one surface where a below-800
 * green carries text.
 */
export const OnDark = () => (
  <Section tone="dark">
    <Kicker tone="dark">Sound familiar?</Kicker>
    <h2 className="text-on-dark sm:text-h2-lg mt-[18px] max-w-[760px] text-3xl leading-[1.1] tracking-[-0.03em]">
      You check three dashboards and still don’t know which number is real.
    </h2>
  </Section>
);
