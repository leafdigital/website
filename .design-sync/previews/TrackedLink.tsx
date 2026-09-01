import { Button, TrackedLink, buttonVariants } from "leaf-website";

/**
 * The reliable way to make a tracked link look like a button: Button with
 * `asChild`. Button runs its classes through tailwind-merge, so the outline
 * variant's `border-border` correctly replaces the base `border-transparent`.
 */
export const AsButton = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button asChild size="sm">
      <TrackedLink
        href="/apps/alt-text#scan"
        event="cta_scan_click"
        eventProps={{ location: "header" }}
      >
        Free scan
      </TrackedLink>
    </Button>
    <Button asChild variant="outline">
      <TrackedLink
        href="/apps/alt-text"
        event="cta_app_view"
        eventProps={{ location: "app-card", app: "Leaf Alt Text" }}
      >
        See the app
      </TrackedLink>
    </Button>
  </div>
);

/**
 * The same two CTAs styled by passing `buttonVariants(...)` straight to
 * className — what the site's own header and app cards currently do. The solid
 * variant is fine; the outline one loses its border, because without
 * tailwind-merge both `border-transparent` (base) and `border-border` (outline)
 * survive and the later rule in the stylesheet wins. Shown so the difference is
 * visible; prefer the `asChild` form above.
 */
export const RawVariantClasses = () => (
  <div className="flex flex-wrap items-center gap-3">
    <TrackedLink
      href="/apps/alt-text#scan"
      event="cta_scan_click"
      eventProps={{ location: "header" }}
      className={buttonVariants({ size: "sm" })}
    >
      Free scan
    </TrackedLink>
    <TrackedLink
      href="/apps/alt-text"
      event="cta_app_view"
      eventProps={{ location: "app-card" }}
      className={buttonVariants({ variant: "outline" })}
    >
      See the app — border lost
    </TrackedLink>
  </div>
);

/** Unstyled, it is an ordinary inline link that happens to report a click. */
export const AsTextLink = () => (
  <p className="text-muted-foreground max-w-md leading-relaxed">
    Every product image an assistant can’t read is a product it can’t recommend.{" "}
    <TrackedLink
      href="/apps/alt-text"
      event="cta_app_view"
      eventProps={{ location: "body-copy" }}
      className="text-primary underline underline-offset-4"
    >
      See what the scan finds
    </TrackedLink>
    .
  </p>
);
