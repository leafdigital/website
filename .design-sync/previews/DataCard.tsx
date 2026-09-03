import { DataCard } from "leaf-website";

// The homepage hero's figures: SAMPLE.inventory in src/lib/constants.ts, the
// same SKU set counted by three systems on the same day. Never invent numbers
// here — the caption is what keeps them honest.
const inventoryRows = [
  { label: "Shopify", value: "12,480 units" },
  { label: "Your 3PL", value: "12,118 units" },
  { label: "Your spreadsheet", value: "12,940 units" },
];

/** As it ships in the hero: three plain rows, then the gap as the `result`. */
export const Default = () => (
  <div className="max-w-[440px]">
    <DataCard
      title="Inventory on hand · same SKU set, same day"
      rows={[
        ...inventoryRows,
        { label: "The gap", value: "822 units · ~$19,700", result: true },
      ]}
      caption="Sample data — your scan is built from your store."
    />
  </div>
);

/**
 * The same figures with no `result` row — every line weighs the same and the
 * card states three numbers without making a point. That tinted tile is the
 * argument; this is what dropping it costs.
 */
export const NoResultRow = () => (
  <div className="max-w-[440px]">
    <DataCard
      title="Inventory on hand · same SKU set, same day"
      rows={inventoryRows}
      caption="Sample data — your scan is built from your store."
    />
  </div>
);
