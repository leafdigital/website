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
      <CardTitle>Image Voice</CardTitle>
      <CardDescription>Live on the Shopify App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Free scan, a real description for every image.
      </p>
    </CardContent>
  </Card>
);

/** With a CardAction the header becomes two columns. */
export const WithAction = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Hidden Margin</CardTitle>
      <CardDescription>
        One readiness score, gaps priced in dollars.
      </CardDescription>
      <CardAction>
        <Badge variant="outline">IN THE LAB</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Missing costs, weights, codes.</p>
    </CardContent>
  </Card>
);
