import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "leaf-website";

// The panel only has height when its item is open, so every cell opens one.

export const Prose = () => (
  <Accordion type="single" collapsible defaultValue="a" className="max-w-lg">
    <AccordionItem value="a">
      <AccordionTrigger>Do you store my product images?</AccordionTrigger>
      <AccordionContent>
        No. We read each image, write the alt text, and forget it.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/** Multiple paragraphs and links — the content styles both. */
export const RichContent = () => (
  <Accordion type="single" collapsible defaultValue="a" className="max-w-lg">
    <AccordionItem value="a">
      <AccordionTrigger>How is the alt text written?</AccordionTrigger>
      <AccordionContent>
        <p>
          Each image is described the way a shopper — or a shopping agent —
          would read it: what the product is, then what distinguishes it.
        </p>
        <p>
          You can review every line before anything is published. See the{" "}
          <a href="/apps/alt-text">app page</a> for examples.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
