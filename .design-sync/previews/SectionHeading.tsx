import { SectionHeading } from "leaf-website";

/** The full block: kicker, heading, sub — centred in a 2xl measure. */
export const Full = () => (
  <SectionHeading
    kicker="What we build"
    title="Shopify apps that earn their keep"
    sub="Small, sharp tools for merchants who would rather fix the catalog than read another dashboard."
  />
);

/** Heading only — the common case inside a dense page. */
export const TitleOnly = () => (
  <SectionHeading title="Questions, answered plainly" />
);

export const WithSub = () => (
  <SectionHeading
    title="Your catalog, as a shopping agent sees it"
    sub="Every product image the assistants can't read is a product they can't recommend."
  />
);
