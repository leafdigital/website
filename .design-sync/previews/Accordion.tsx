import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "leaf-website";

/** One row open by default so the panel styling is visible on the card. */
export const Single = () => (
  <Accordion
    type="single"
    collapsible
    defaultValue="images"
    className="max-w-lg"
  >
    <AccordionItem value="images">
      <AccordionTrigger>Do you store my product images?</AccordionTrigger>
      <AccordionContent>
        No. We read each image, write the alt text, and forget it. Nothing is
        kept after the scan finishes.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="undo">
      <AccordionTrigger>Can I undo a bulk write?</AccordionTrigger>
      <AccordionContent>
        Yes — every write is reversible for 30 days from the history screen.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="languages">
      <AccordionTrigger>Which languages are supported?</AccordionTrigger>
      <AccordionContent>
        Alt text is written in your store’s primary language.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/** `type="multiple"` lets several rows stay open at once. */
export const Multiple = () => (
  <Accordion
    type="multiple"
    defaultValue={["scan", "price"]}
    className="max-w-lg"
  >
    <AccordionItem value="scan">
      <AccordionTrigger>What does the free scan cover?</AccordionTrigger>
      <AccordionContent>
        Every product image in your catalog, with 25 rewritten so you can judge
        the quality on your own products.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="price">
      <AccordionTrigger>What happens after the scan?</AccordionTrigger>
      <AccordionContent>
        Nothing automatic. You choose whether to turn on the auto-pilot.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
