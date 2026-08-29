import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "leaf-website";

// CardFooter is the bottom action row. Adding border-t gives it a divider with
// the card's own padding.

export const WithAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Leaf Alt Text</CardTitle>
      <CardDescription>Live on the App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Scan free, stay for the auto-pilot.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">
        See the app
      </Button>
    </CardFooter>
  </Card>
);

export const Divided = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Catalog Readiness</CardTitle>
      <CardDescription>
        A readiness score for the agentic shelf.
      </CardDescription>
    </CardHeader>
    <CardFooter className="border-t">
      <Button variant="ghost" size="sm">
        Get early access
      </Button>
    </CardFooter>
  </Card>
);
