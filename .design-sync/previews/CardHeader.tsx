import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "leaf-website";

// CardHeader is a grid that grows a second column when a CardAction is present,
// so each cell shows it inside a Card rather than alone.

/** Title plus description — the two-row form. */
export const TitleAndDescription = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Leaf Alt Text</CardTitle>
      <CardDescription>
        Writes the alt text your catalog is missing.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Scan free, stay for the auto-pilot.
      </p>
    </CardContent>
  </Card>
);

/** With a CardAction the header becomes two columns. */
export const WithAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Catalog Readiness</CardTitle>
      <CardDescription>
        A readiness score for the agentic shelf.
      </CardDescription>
      <CardAction>
        <Badge variant="outline">In the lab</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Attribute by attribute.</p>
    </CardContent>
  </Card>
);
