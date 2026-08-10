import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { buttonVariants } from "@/components/ui/button";

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
 * only.
 */
export function AppCard({ app }: { app: AppCardData }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-xl">{app.name}</CardTitle>
          {app.status === "live" ? (
            <Badge>Live</Badge>
          ) : (
            <Badge variant="outline">In the lab</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <p className="text-muted-foreground leading-relaxed">
          {app.description}
        </p>
        {app.href && app.cta ? (
          <div>
            <TrackedLink
              href={app.href}
              event="cta_install_click"
              eventProps={{ location: "app-card", app: app.name }}
              className={buttonVariants({ variant: "outline" })}
            >
              {app.cta}
            </TrackedLink>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
