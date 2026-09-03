import { Button } from "leaf-website";

/** The one-accent rule in practice: green is the action, everything else neutral. */
export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Run the free scan</Button>
    <Button variant="secondary">See pricing</Button>
    <Button variant="ghost">See the apps</Button>
    <Button variant="destructive">Remove app</Button>
    <Button variant="link">Join the waitlist</Button>
  </div>
);

/** Marketing-site scale: 52 / 44 / 38. `lg` is the only one with the CTA glow. */
export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="lg">Scan my store free</Button>
    <Button size="default">Free scan</Button>
    <Button size="sm" className="shadow-cta-sm">
      Free scan
    </Button>
    <Button size="icon" aria-label="Open menu">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
      </svg>
    </Button>
  </div>
);

/** On the dark band the action goes white — green stops reading as a button. */
export const OnDark = () => (
  <div className="bg-surface-dark flex flex-wrap items-center gap-3 rounded-xl p-8">
    <Button size="lg" variant="onDark" className="shadow-on-dark">
      Run the free scan
    </Button>
    <Button variant="onDark">Get early access</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Joining…</Button>
    <Button variant="secondary" disabled>
      See pricing
    </Button>
  </div>
);
