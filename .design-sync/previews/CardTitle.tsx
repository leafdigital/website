import { Card, CardDescription, CardHeader, CardTitle } from "leaf-website";

// CardTitle is a div by design. Shown inside CardHeader, which is the only
// place its grid position is correct.

export const Default = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>AI Answer Accuracy</CardTitle>
      <CardDescription>
        Watch what the machines actually say about your store.
      </CardDescription>
    </CardHeader>
  </Card>
);

/** When the title belongs in the page outline, render a real heading with the
 *  site's heading treatment instead — this is what AppCard does. */
export const AsRealHeading = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <h3 className="font-heading text-xl font-bold">Leaf Alt Text</h3>
      <CardDescription>Appears in heading navigation.</CardDescription>
    </CardHeader>
  </Card>
);
