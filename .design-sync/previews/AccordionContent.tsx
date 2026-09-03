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
      <AccordionTrigger>Can it break my store?</AccordionTrigger>
      <AccordionContent>
        No. Every write is verified by reading it back, and every change has a
        30-day undo.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/** Multiple paragraphs and links — the content styles both. */
export const RichContent = () => (
  <Accordion type="single" collapsible defaultValue="a" className="max-w-lg">
    <AccordionItem value="a">
      <AccordionTrigger>Isn’t AI alt text spammy?</AccordionTrigger>
      <AccordionContent>
        <p>
          The spam reputation comes from tools that generate text from titles
          and filenames. Image Voice looks at every image.
        </p>
        <p>
          Judge it free on your own products before paying anything —{" "}
          <a href="https://apps.shopify.com/image-voice">
            install on the Shopify App Store
          </a>
          .
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
