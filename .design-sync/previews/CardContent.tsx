import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "leaf-website";

// CardContent supplies the card's horizontal padding — add none of your own.

export const Prose = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Leaf Alt Text</CardTitle>
      <CardDescription>Live on the App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground leading-relaxed">
        Sees every product image the way a shopper — or a shopping agent — does,
        and writes the alt text your catalog is missing.
      </p>
    </CardContent>
  </Card>
);

/** Content is a plain block, so it holds lists and stats as happily as prose. */
export const WithStats = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Last scan</CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="grid grid-cols-2 gap-3">
        <div>
          <dt className="text-muted-foreground">Products</dt>
          <dd className="text-lg font-semibold tabular-nums">3,102</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Missing alt text</dt>
          <dd className="text-lg font-semibold tabular-nums">1,847</dd>
        </div>
      </dl>
    </CardContent>
  </Card>
);
