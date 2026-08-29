import { Container } from "leaf-website";

// Container is an invisible 1120px column, so each cell gives it a tinted body
// to make the column edges and gutters visible on the card.

/** The content column: centred, max 1120px, 24px gutters. */
export const ContentColumn = () => (
  <div className="bg-muted py-6">
    <Container>
      <div className="bg-card ring-foreground/10 rounded-lg p-6 ring-1">
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
  <div className="border-border bg-card border-y">
    <Container className="flex h-16 items-center justify-between">
      <span className="font-heading text-lg font-bold">Leaf digital</span>
      <span className="text-muted-foreground text-sm">
        Apps · Services · Blog
      </span>
    </Container>
  </div>
);
