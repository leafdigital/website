import { CtaBand, WaitlistForm } from "leaf-website";

/**
 * The form is styled for the dark CTA band and nothing else, so the card puts
 * it on `surface-deep`. Only the idle state is reachable without submitting —
 * sending, error and confirmation all follow a real POST to /api/waitlist.
 */
export const Default = () => (
  <div className="bg-surface-deep flex justify-center rounded-xl p-10">
    <WaitlistForm source="design-preview" />
  </div>
);

/** Where it actually sits: the `action` of a lab page’s closing CtaBand. */
export const InCtaBand = () => (
  <CtaBand
    id="waitlist"
    title="Run the free scan. See your score."
    sub="One list, every coming Leaf app — you’re first in line for all of them. Early merchants get a direct line to the founder and a say in what we build."
    action={<WaitlistForm source="hidden-margin" />}
    note="Silent images are already fixable today. Image Voice is live — run that scan now →"
  />
);
