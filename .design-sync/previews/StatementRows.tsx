import { Section, SectionHeading, StatementRows } from "leaf-website";

// Every story is wrapped in `Section tone="dark"`: the rows are white text on
// white/12 hairlines and render nothing of their own, so this is the only
// surface they exist on. Copy is the real one from messages/en/*.json.

/**
 * `labelWidth="narrow"` — the homepage's numbered sequence, where the count
 * is the point and the statements start close to the digits.
 */
export const Numbered = () => (
  <Section tone="dark">
    <SectionHeading
      tone="dark"
      kicker="Sound familiar?"
      title="You check three dashboards and still don’t know which number is real."
      sub="You didn’t build a brand for this. The failure is never a feature — it’s the seams. Nobody holds the map, so the money hides between systems."
      className="max-w-[760px]"
    />
    <StatementRows
      labelWidth="narrow"
      items={[
        {
          label: "01",
          statement: "Cash locked in inventory nobody meant to order",
        },
        {
          label: "02",
          statement: "Sales lost to stockouts no system ever records",
        },
        {
          label: "03",
          statement:
            "Refund waves colliding with PO deposits you can’t see coming",
        },
        { label: "04", statement: "Sync breaks discovered months too late" },
      ]}
    />
    <p className="mt-10 text-[17px] text-white/55">
      Everything expensive is invisible. That’s the villain — and it’s why no
      single dashboard has ever caught it.
    </p>
  </Section>
);

/**
 * `labelWidth="wide"` (the default) — named micro-labels need the 220px
 * column, and each row argues its own bill in `body`.
 */
export const NamedWithBody = () => (
  <Section tone="dark">
    <SectionHeading
      tone="dark"
      kicker="One villain, three prices"
      title="Silence charges you three ways"
      sub="One problem, stacked three deep. Fix the silence once and all three bills stop."
      className="max-w-[760px]"
    />
    <StatementRows
      items={[
        {
          label: "LOST TRAFFIC",
          statement: "Google skips them",
          body: "An image with no description never enters image search. The traffic goes to the store next door whose pictures speak.",
        },
        {
          label: "LOST AGENTIC SALES",
          statement: "AI shoppers can’t read them",
          body: "Shopping agents browse your catalog raw. A silent image doesn’t exist to them — and neither does the product.",
        },
        {
          label: "ACCESSIBILITY RISK",
          statement: "Screen readers get nothing",
          body: "The EAA has had ecommerce in scope since June 2025; ADA suits hit thousands of US stores a year. Unreadable images are your most visible gap.",
        },
      ]}
    />
  </Section>
);

/**
 * Wide labels with `body` omitted across the whole set — three statements
 * that land alone, which is how Reorder Engine states reorder day.
 */
export const StatementsOnly = () => (
  <Section tone="dark">
    <SectionHeading
      tone="dark"
      kicker="Reorder day"
      title="Where founders fly blind"
      className="max-w-[760px]"
    />
    <StatementRows
      items={[
        {
          label: "THE CASH TRAP",
          statement: "Cash buried in slow movers while bestsellers stock out",
        },
        {
          label: "THE BLIND SPOT",
          statement:
            "The spreadsheet can’t tell “low demand” from “nothing to sell”",
        },
        {
          label: "THE 11PM JOB",
          statement: "Nobody is watching when it breaks — except you, at night",
        },
      ]}
    />
  </Section>
);
