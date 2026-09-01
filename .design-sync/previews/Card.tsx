import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "leaf-website";

/** The canonical composition: header, title, description, content, footer. */
export const Default = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Leaf Alt Text</CardTitle>
      <CardDescription>
        Writes the alt text your catalog is missing.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Scan free, taste the quality on 25 of your own images, stay for the
        auto-pilot.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">
        See the app
      </Button>
    </CardFooter>
  </Card>
);

/** CardAction pins a control to the top-right of the header grid. */
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
      <p className="text-muted-foreground">
        Attribute by attribute, with the fixes ranked.
      </p>
    </CardContent>
  </Card>
);

/** `size="sm"` tightens --card-spacing from 4 to 3. */
export const Compact = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>AI Answer Accuracy</CardTitle>
      <CardDescription>Watch what the machines say about you.</CardDescription>
    </CardHeader>
  </Card>
);
