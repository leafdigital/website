import { Section, SectionHeading } from "leaf-website";

/** The default band: white ground, standard rhythm, content in the page column. */
export const Default = () => (
  <Section>
    <SectionHeading
      kicker="The plan"
      title="Three steps between you and the hidden money"
      sub="Small, sharp apps. Each one finds money in a specific seam — then does the work itself."
    />
  </Section>
);

/**
 * `tone="dark"` is the full-bleed statement band — one per page. The heading
 * needs its own `tone="dark"`; the section only sets the surface.
 */
export const Dark = () => (
  <Section tone="dark">
    <SectionHeading
      tone="dark"
      kicker="Sound familiar?"
      title="You check three dashboards and still don’t know which number is real."
      sub="You didn’t build a brand for this. The failure is never a feature — it’s the seams. Nobody holds the map, so the money hides between systems."
      className="max-w-[760px]"
    />
  </Section>
);

/** `divided` trades the top padding for a hairline — two bands, one argument. */
export const Divided = () => (
  <Section divided>
    <SectionHeading kicker="Due diligence" title="The questions we’d ask too" />
  </Section>
);

/** `tone="wash"` paints the quiet green ground. Sparingly — it is the accent. */
export const Wash = () => (
  <Section tone="wash">
    <SectionHeading
      kicker="What you get"
      title="What changes when your images stop being silent"
    />
  </Section>
);
