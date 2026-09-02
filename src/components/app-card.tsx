import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";

export type AppCardData = {
  name: string;
  status: "live" | "lab";
  description: string;
  /** Live apps link somewhere; lab cards don't. */
  href?: string;
  cta?: string;
};

/**
 * One card per app, shared by the homepage strip and /apps so the portfolio
 * reads identically everywhere. Lab cards promise no dates — status text
 * only. Card names are real headings (not CardTitle's div) so they appear in
 * heading navigation; the caller picks the level that keeps the page's
 * outline unbroken (h3 under a section h2, h2 directly under the page h1).
 */
export function AppCard({
  app,
  headingLevel: Heading = "h3",
}: {
  app: AppCardData;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Heading className="font-heading text-h3">{app.name}</Heading>
          {app.status === "live" ? (
            <Badge>Live</Badge>
          ) : (
            <Badge variant="outline">In the lab</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <p className="text-muted-foreground leading-[1.65]">
          {app.description}
        </p>
        <div>
          {app.href && app.cta ? (
            <Button asChild variant="secondary">
              <TrackedLink
                href={app.href}
                event="cta_app_view"
                eventProps={{ location: "app-card", app: app.name }}
              >
                {app.cta}
              </TrackedLink>
            </Button>
          ) : (
            /* Lab cards send intent to the one early-access form at the
             * bottom of the homepage — no inline inputs on cards. */
            <Button asChild variant="secondary">
              <TrackedLink
                href="/#early-access"
                event="cta_app_view"
                eventProps={{ location: "lab-card-waitlist", app: app.name }}
              >
                Get early access
              </TrackedLink>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
