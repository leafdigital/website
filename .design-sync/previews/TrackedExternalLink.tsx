import { Button, TrackedExternalLink } from "leaf-website";

// The only off-site link on the site: the App Store listing (APP_INSTALL_URL).

/**
 * The install CTA on `/image-voice`'s closing band — white on the dark
 * gradient, because green stops reading as the action once the ground is
 * dark.
 */
export const Default = () => (
  <div className="from-surface-deep via-brand-900 to-brand-800 bg-linear-[135deg] via-55% p-10 text-center">
    <Button asChild size="lg" variant="onDark" className="shadow-on-dark">
      <TrackedExternalLink
        href="https://apps.shopify.com/image-voice"
        rel="noreferrer"
        event="cta_install_click"
        eventProps={{ location: "image-voice-cta" }}
      >
        Install on the Shopify App Store
      </TrackedExternalLink>
    </Button>
  </div>
);

/** The same link on a light ground: the ordinary green CTA. */
export const OnLight = () => (
  <Button asChild size="lg">
    <TrackedExternalLink
      href="https://apps.shopify.com/image-voice"
      rel="noreferrer"
      event="cta_install_click"
      eventProps={{ location: "pricing" }}
    >
      Install on the Shopify App Store
    </TrackedExternalLink>
  </Button>
);
