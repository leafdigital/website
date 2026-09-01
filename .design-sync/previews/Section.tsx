import { Button, Section, SectionHeading } from "leaf-website";

/** The default band: standard vertical rhythm, content in the page column. */
export const Default = () => (
  <Section>
    <SectionHeading
      kicker="What we build"
      title="Shopify apps that earn their keep"
      sub="Small, sharp tools for merchants who would rather fix the catalog than read another dashboard."
    />
  </Section>
);

/** `wash` paints the quiet green background — for bands that carry the brand. */
export const Washed = () => (
  <Section wash id="early-access">
    <div className="text-center">
      <SectionHeading
        title="Get early access"
        sub="We only write when there's something to try."
      />
      <div className="mt-8">
        <Button size="lg">Get early access</Button>
      </div>
    </div>
  </Section>
);
