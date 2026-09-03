import { Section, SectionHeading } from "leaf-website";

/** The full block, left-aligned in its 660px measure — the v3 default. */
export const Default = () => (
  <SectionHeading
    kicker="The suite"
    title="The plan, made real"
    sub="Small, sharp apps. Each one finds money in a specific seam — then does the work itself."
  />
);

/** Kicker and heading only — the common case on a dense page. */
export const TitleOnly = () => (
  <SectionHeading kicker="Due diligence" title="The questions we’d ask too" />
);

/** `tone="dark"` inside the dark band: white 48px heading, green kicker. */
export const OnDark = () => (
  <Section tone="dark">
    <SectionHeading
      tone="dark"
      kicker="Sound familiar?"
      title="You check three dashboards and still don’t know which number is real."
      sub="You didn’t build a brand for this. The failure is never a feature — it’s the seams."
      className="max-w-[760px]"
    />
  </Section>
);

/** `align="center"` — the exception, for a band with one thing in it. */
export const Centered = () => (
  <SectionHeading
    align="center"
    kicker="Pricing"
    title="The magic happens before the paywall"
    sub="Judge the writing on your own products, free, forever."
  />
);
