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
      <CardTitle>Image Voice</CardTitle>
      <CardDescription>Live on the Shopify App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Your images are silent — to Google, to AI shoppers, to screen readers.
        Free scan, a real description for every image.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" size="sm">
        See the app
      </Button>
    </CardFooter>
  </Card>
);

/** CardAction pins a control to the top-right of the header grid. */
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
      <p className="text-muted-foreground">
        Missing costs, HS codes, countries of origin.
      </p>
    </CardContent>
  </Card>
);

/** `size="sm"` tightens --card-spacing from 5 to 4. */
export const Compact = () => (
  <Card size="sm" className="max-w-xs">
    <CardHeader>
      <CardTitle>Reorder Engine</CardTitle>
      <CardDescription>
        Nine apps forecast your inventory. Not one sends the PO.
      </CardDescription>
    </CardHeader>
  </Card>
);
