import { WaitlistForm } from "leaf-website";

/**
 * The form takes no props and owns its own state, so the card shows the idle
 * state — the only one reachable without submitting. The sending, error and
 * confirmation states all follow a real POST to /api/waitlist.
 */
export const Idle = () => (
  <div className="max-w-md">
    <WaitlistForm />
  </div>
);

/** How it actually sits on the page: inside the homepage's washed CTA band. */
export const InCtaSection = () => (
  <div className="bg-accent rounded-lg px-6 py-10">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-balance">
        Get early access
      </h2>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        We only write when there’s something to try.
      </p>
      <div className="mt-8">
        <WaitlistForm />
      </div>
    </div>
  </div>
);
