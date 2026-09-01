import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "leaf-website";

// AccordionItem only renders correctly inside an Accordion, which supplies its
// open/closed context — so the preview shows it in that composition.

/** Two items: the first open, the second closed, so both states are on the card. */
export const InContext = () => (
  <Accordion type="single" collapsible defaultValue="open" className="max-w-lg">
    <AccordionItem value="open">
      <AccordionTrigger>An open item</AccordionTrigger>
      <AccordionContent>
        Open items take a muted background so the active row is obvious.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="closed">
      <AccordionTrigger>A closed item</AccordionTrigger>
      <AccordionContent>Hidden until this row is opened.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
