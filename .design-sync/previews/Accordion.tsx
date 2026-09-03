import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "leaf-website";

// Real copy: the /image-voice FAQ from messages/en/imageVoice.json.

/** One row open by default so the panel styling is visible on the card. */
export const Single = () => (
  <Accordion
    type="single"
    collapsible
    defaultValue="break"
    className="max-w-lg"
  >
    <AccordionItem value="break">
      <AccordionTrigger>Can it break my store?</AccordionTrigger>
      <AccordionContent>
        No. It is structurally unable to touch anything but the alt field, every
        write is verified by reading it back, and every change has a 30-day undo
        on every plan.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="spam">
      <AccordionTrigger>Isn’t AI alt text spammy?</AccordionTrigger>
      <AccordionContent>
        Image Voice looks at every image. Descriptions are distinct per image,
        around 125 characters, and never start with “image of.”
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="languages">
      <AccordionTrigger>Which languages does it write in?</AccordionTrigger>
      <AccordionContent>
        Your store’s own language: English, German, French, Spanish, Italian,
        Dutch, and Portuguese.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

/** `type="multiple"` lets several rows stay open at once. */
export const Multiple = () => (
  <Accordion
    type="multiple"
    defaultValue={["compliance", "howLong"]}
    className="max-w-lg"
  >
    <AccordionItem value="compliance">
      <AccordionTrigger>
        Does this make me EAA / ADA compliant?
      </AccordionTrigger>
      <AccordionContent>
        No tool can promise that, and we won’t. What it does is close your most
        visible gap — thousands of unreadable images — with an audit trail to
        show for it.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="howLong">
      <AccordionTrigger>
        How long until my whole catalog is described?
      </AccordionTrigger>
      <AccordionContent>
        Days, not months. Paid plans include a First Sweep that writes your
        existing backlog up front.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
