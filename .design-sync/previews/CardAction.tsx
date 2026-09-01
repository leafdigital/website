import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "leaf-website";

// CardAction takes the second column of CardHeader's grid — it only lands in
// the top-right when it is a direct child of CardHeader.

export const WithBadge = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Leaf Alt Text</CardTitle>
      <CardDescription>Live on the App Store.</CardDescription>
      <CardAction>
        <Badge>Live</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Scan free, stay for the auto-pilot.
      </p>
    </CardContent>
  </Card>
);

export const WithButton = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Catalog Readiness</CardTitle>
      <CardDescription>
        A readiness score for the agentic shelf.
      </CardDescription>
      <CardAction>
        <Button variant="ghost" size="sm">
          Details
        </Button>
      </CardAction>
    </CardHeader>
  </Card>
);
