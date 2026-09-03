import { TrackedLink } from "@/components/analytics/tracked-link";
import type { AppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type AppCardData = {
  name: string;
  /** `live` is on the App Store today; `lab` is a waitlist. */
  status: "live" | "lab";
  statusLabel: string;
  description: string;
  href: AppRoute;
  cta: string;
};

/**
 * One card per app. The whole card is the link — a card with a link inside it
 * gives you a 32px target inside a 300px one, and every visitor aims at the
 * card anyway.
 *
 * `featured` is the live app: green wash, heavier border, green lift on
 * hover. Exactly one card per grid may carry it, or the grid stops saying
 * "this is the one that works today".
 *
 * Names are real headings, not styled divs, so the portfolio appears in
 * heading navigation; the caller picks the level that keeps the outline
 * unbroken.
 */
export function AppCard({
  app,
  featured = false,
  headingLevel: Heading = "h3",
}: {
  app: AppCardData;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <TrackedLink
      href={app.href}
      event="cta_app_view"
      eventProps={{ location: "apps-grid", app: app.name }}
      className={cn(
        "flex flex-col items-start gap-3.5 rounded-xl p-8 transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-[5px] motion-reduce:hover:translate-y-0",
        featured
          ? "border-brand-800/35 shadow-featured from-brand-50 border-[1.5px] bg-linear-to-b to-white to-70% hover:shadow-[0_24px_52px_rgb(46_125_50/0.16)]"
          : "border-hairline bg-card hover:border-ink/22 border hover:shadow-[0_18px_40px_rgb(23_33_26/0.08)]",
      )}
    >
      <span
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.06em]",
          featured
            ? "bg-primary text-primary-foreground"
            : "border-ink/16 text-muted-foreground border",
        )}
      >
        {app.statusLabel}
      </span>
      <Heading className="text-[23px] tracking-[-0.02em]">{app.name}</Heading>
      <p className="text-muted-foreground flex-1 text-base leading-[1.6] sm:text-[15px]">
        {app.description}
      </p>
      <span className="text-brand-800 text-[15px] font-semibold">
        {app.cta}
      </span>
    </TrackedLink>
  );
}
