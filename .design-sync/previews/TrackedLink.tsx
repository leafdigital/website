import { Button, TrackedLink } from "leaf-website";

/**
 * The way to make a tracked link look like a button: Button with `asChild`,
 * which is what every CTA on the site does. The hero pair, verbatim.
 */
export const AsButton = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button asChild size="lg">
      <TrackedLink
        href="/image-voice"
        event="cta_scan_click"
        eventProps={{ location: "home-hero" }}
      >
        Scan my store free
      </TrackedLink>
    </Button>
    <Button asChild size="lg" variant="secondary" className="shadow-none">
      <TrackedLink
        href="/#apps"
        event="cta_app_view"
        eventProps={{ location: "home-hero-secondary" }}
      >
        See the apps
      </TrackedLink>
    </Button>
  </div>
);

/** The nav-height CTA: `sm` plus the smaller glow the header adds itself. */
export const InHeader = () => (
  <Button asChild size="sm" className="shadow-cta-sm">
    <TrackedLink
      href="/image-voice"
      event="cta_scan_click"
      eventProps={{ location: "header" }}
    >
      Free scan
    </TrackedLink>
  </Button>
);

/** Unstyled, it is an ordinary inline link that happens to report a click. */
export const AsTextLink = () => (
  <p className="text-muted-foreground max-w-md leading-relaxed">
    Hidden Margin and Reorder Engine are in the lab.{" "}
    <TrackedLink
      href="/hidden-margin"
      event="cta_waitlist_join"
      eventProps={{ location: "home-cta" }}
      className="text-brand-800 font-semibold underline underline-offset-4"
    >
      Join the waitlist →
    </TrackedLink>
  </p>
);
