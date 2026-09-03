import { Section, SectionHeading, StepsRow } from "leaf-website";

// Real copy: the homepage plan and Image Voice's how-it-works.

/**
 * The homepage plan — three steps, divided by a rule rather than by cards,
 * with step one's chip filled green because it is the only step you take.
 */
export const Default = () => (
  <StepsRow
    steps={[
      {
        title: "Connect",
        body: "Leaf links your systems and shows you, in dollars, where they disagree. No opinions — arithmetic.",
      },
      {
        title: "Shadow",
        body: "30 days of “here’s exactly what I would have done.” Money caught, proof on paper — your store is the case study.",
      },
      {
        title: "Let it run",
        body: "One-click approvals, then set your threshold and get your time back. Autonomy is earned, never assumed.",
      },
    ]}
  />
);

/**
 * How it actually sits on a page: a SectionHeading above, `mt-[60px]` on the
 * row, and the house closer in `ink-faint` underneath.
 */
export const InSection = () => (
  <Section>
    <SectionHeading kicker="How it works" title="Scan. Write. Speak." />
    <StepsRow
      className="mt-[60px]"
      steps={[
        {
          title: "Scan",
          body: "Free, on install, no setup. Your silent-image count in one number — graded, not counted.",
        },
        {
          title: "Write",
          body: "Every image actually looked at. Approve, edit, or skip from a keyboard queue built for 200 decisions in a sitting.",
        },
        {
          title: "Speak",
          body: "Auto-pilot you earn — offered only when your own approval record justifies it. Then every new image is described within minutes of upload, forever.",
        },
      ]}
    />
    <p className="text-ink-faint mt-11 text-[15px]">
      Audit → approval → earned autonomy. This is how every Leaf app works.
    </p>
  </Section>
);
