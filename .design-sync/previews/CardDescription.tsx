import { Card, CardDescription, CardHeader, CardTitle } from "leaf-website";

// The muted supporting line under a CardTitle.

export const Default = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Hidden Margin</CardTitle>
      <CardDescription>
        One readiness score, gaps priced in dollars.
      </CardDescription>
    </CardHeader>
  </Card>
);

export const Wrapping = () => (
  <Card className="max-w-xs">
    <CardHeader>
      <CardTitle>Reorder Engine</CardTitle>
      <CardDescription>
        Nine apps forecast your inventory. Not one sends the PO. We’re building
        the missing last mile — proven in shadow first.
      </CardDescription>
    </CardHeader>
  </Card>
);
