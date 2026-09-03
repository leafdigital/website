import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "leaf-website";

// The trigger is the clickable summary of an AccordionItem and renders its own
// chevron, which flips with the row's open state — shown here open vs closed.

export const OpenAndClosed = () => (
  <Accordion type="single" collapsible defaultValue="a" className="max-w-lg">
    <AccordionItem value="a">
      <AccordionTrigger>Expanded — chevron points up</AccordionTrigger>
      <AccordionContent>The panel this trigger controls.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger>Collapsed — chevron points down</AccordionTrigger>
      <AccordionContent>Hidden.</AccordionContent>
    </AccordionItem>
  </Accordion>
);

/** Long summaries wrap and keep the chevron pinned to the right. */
export const LongLabel = () => (
  <Accordion type="single" collapsible className="max-w-md">
    <AccordionItem value="a">
      <AccordionTrigger>
        How long until my whole catalog is described?
      </AccordionTrigger>
      <AccordionContent>Days, not months.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
