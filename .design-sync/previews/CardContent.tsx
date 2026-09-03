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
      <CardTitle>Image Voice</CardTitle>
      <CardDescription>Live on the Shopify App Store.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground leading-relaxed">
        Your images are silent — to Google, to AI shoppers, to screen readers.
        Free scan, a real description for every image.
      </p>
    </CardContent>
  </Card>
);

/**
 * Content is a plain block, so it holds lists and stats as happily as prose.
 * Figures are the sample scan from src/lib/constants.ts.
 */
export const WithStats = () => (
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>Sample scan</CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="grid grid-cols-2 gap-3">
        <div>
          <dt className="text-muted-foreground">Images</dt>
          <dd className="font-mono text-lg font-semibold tabular-nums">
            3,102
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Silent</dt>
          <dd className="font-mono text-lg font-semibold tabular-nums">
            2,451
          </dd>
        </div>
      </dl>
    </CardContent>
  </Card>
);
