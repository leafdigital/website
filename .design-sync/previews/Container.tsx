import { Container } from "leaf-website";

// Container is an invisible 1160px column, so each cell gives it a tinted body
// to make the column edges and gutters visible on the card.

/** The content column: centred, max 1160px, 28px gutters. */
export const ContentColumn = () => (
  <div className="bg-surface-muted py-6">
    <Container>
      <div className="border-hairline bg-card rounded-xl border p-6">
        <p className="text-muted-foreground">
          Everything on the site sits in this column, so headings, cards and
          footers all line up down the page.
        </p>
      </div>
    </Container>
  </div>
);

/** Used directly (not via Section) for bars — this is the header's own layout. */
export const AsBar = () => (
  <div className="border-hairline-soft bg-card border-y">
    <Container className="flex h-16 items-center justify-between">
      <span className="font-heading text-lg font-bold">Leaf Digital</span>
      <span className="text-muted-foreground text-sm">Apps · Free scan</span>
    </Container>
  </div>
);
