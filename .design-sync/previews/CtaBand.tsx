import {
  Button,
  CtaBand,
  DarkOfferCallout,
  TrackedLink,
  WaitlistForm,
} from "leaf-website";

// Copy verbatim from messages/en/home.json and messages/en/hiddenMargin.json.
// The band is full-bleed and supplies its own ground, so no wrapper here.

/**
 * The homepage close: one button, and a note pointing at the apps a visitor
 * did not come for.
 */
export const Default = () => (
  <CtaBand
    title="Install the free scanner. See what’s hiding."
    sub="We won’t show you someone else’s numbers. We’ll show you yours — free, in minutes, before you decide anything."
    action={
      <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
        <TrackedLink
          href="/image-voice"
          event="cta_scan_click"
          eventProps={{ location: "home-cta" }}
        >
          Run the free scan
        </TrackedLink>
      </Button>
    }
    note={
      <>
        Hidden Margin and Reorder Engine are in the lab.{" "}
        <a href="/hidden-margin" className="font-semibold text-white">
          Join the waitlist →
        </a>
      </>
    }
  />
);

/**
 * A lab app's close: the founder offer earns its own frosted tile above the
 * waitlist form, and the note carries one cross-link per sibling app.
 */
export const WithOffer = () => (
  <CtaBand
    id="waitlist"
    title="Run the free scan. See your score."
    sub="One list, every coming Leaf app — you’re first in line for all of them. Early merchants get a direct line to the founder and a say in what we build."
    offer={
      <DarkOfferCallout label="Founding-merchant offer">
        The first 15 stores get the top plan at the middle plan’s price — locked
        for life.
      </DarkOfferCallout>
    }
    action={<WaitlistForm source="hidden-margin" />}
    note={
      <>
        Silent images are already fixable today.{" "}
        <a href="/image-voice" className="font-semibold text-white">
          Image Voice is live — run that scan now →
        </a>
        <br />
        Cash trapped in inventory?{" "}
        <a href="/reorder-engine" className="font-semibold text-white">
          Reorder Engine is coming →
        </a>
      </>
    }
  />
);
