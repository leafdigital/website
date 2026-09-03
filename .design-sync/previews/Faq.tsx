import { Faq, Section, SectionHeading } from "leaf-website";

// Real copy: the /image-voice FAQ from messages/en/imageVoice.json.
const items = [
  {
    q: "Can it break my store?",
    a: "No. It is structurally unable to touch anything but the alt field, every write is verified by reading it back, and every change has a 30-day undo on every plan — with a full before → after trail.",
  },
  {
    q: "Isn’t AI alt text spammy?",
    a: "The spam reputation comes from tools that generate text from titles and filenames. Image Voice looks at every image. Descriptions are distinct per image, around 125 characters, and never start with “image of.”",
  },
  {
    q: "Which languages does it write in?",
    a: "Your store’s own language: English, German, French, Spanish, Italian, Dutch, and Portuguese. A German customer’s screen reader speaks German.",
  },
];

/**
 * Rows render closed — this is a native <details> list, so the closed state is
 * the honest default and is what a visitor first sees.
 */
export const Default = () => (
  <div className="max-w-[800px]">
    <Faq items={items} />
  </div>
);

/**
 * The expanded state. Faq takes no `open` prop, so the card opens the first row
 * through the DOM after mount — otherwise the answer styling is never visible.
 */
export const Opened = () => (
  <div
    className="max-w-[800px]"
    ref={(el) => el?.querySelector("details")?.setAttribute("open", "")}
  >
    <Faq items={items} />
  </div>
);

/** How it sits on a page: a divided section with the narrowed column. */
export const InSection = () => (
  <Section divided containerClassName="max-w-[800px]">
    <SectionHeading kicker="Due diligence" title="The questions we’d ask too" />
    <Faq className="mt-12" items={items} />
  </Section>
);
