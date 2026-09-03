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
      <CardTitle>Image Voice</CardTitle>
      <CardDescription>Live on the Shopify App Store.</CardDescription>
      <CardAction>
        <Badge>LIVE</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
        Free scan, a real description for every image.
      </p>
    </CardContent>
  </Card>
);

export const WithButton = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Hidden Margin</CardTitle>
      <CardDescription>
        One readiness score, gaps priced in dollars.
      </CardDescription>
      <CardAction>
        <Button variant="ghost" size="sm">
          Details
        </Button>
      </CardAction>
    </CardHeader>
  </Card>
);
