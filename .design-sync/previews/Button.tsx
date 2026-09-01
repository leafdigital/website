import { Button } from "leaf-website";

/** The one-accent rule in practice: green is the action, everything else is neutral. */
export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button>Get early access</Button>
    <Button variant="outline">See the app</Button>
    <Button variant="secondary">Read the blog</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="destructive">Remove app</Button>
    <Button variant="link">Learn more</Button>
  </div>
);

/** Marketing-site scale. `lg` carries the CTA glow shadow. */
export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="lg">Scan my store free</Button>
    <Button size="default">Free scan</Button>
    <Button size="sm">Free scan</Button>
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

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Joining…</Button>
    <Button variant="outline" disabled>
      See the app
    </Button>
  </div>
);
