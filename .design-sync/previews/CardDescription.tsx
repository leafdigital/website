import { Card, CardDescription, CardHeader, CardTitle } from "leaf-website";

// The muted supporting line under a CardTitle.

export const Default = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Catalog Readiness</CardTitle>
      <CardDescription>
        A readiness score for the agentic shelf.
      </CardDescription>
    </CardHeader>
  </Card>
);

export const Wrapping = () => (
  <Card className="max-w-xs">
    <CardHeader>
      <CardTitle>AI Answer Accuracy</CardTitle>
      <CardDescription>
        When ChatGPT talks about your products, is it right? Catch the answers
        that cost you sales.
      </CardDescription>
    </CardHeader>
  </Card>
);
