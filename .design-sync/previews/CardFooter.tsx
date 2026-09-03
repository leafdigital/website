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
      <CardTitle>Image Voice</CardTitle>
      <CardDescription>Live on the Shopify App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">
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

export const Divided = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Hidden Margin</CardTitle>
      <CardDescription>
        One readiness score, gaps priced in dollars.
      </CardDescription>
    </CardHeader>
    <CardFooter className="border-t">
      <Button variant="ghost" size="sm">
        Join the waitlist
      </Button>
    </CardFooter>
  </Card>
);
