import { Faq } from "leaf-website";

/**
 * Rows render closed — this is a native <details> list, so the closed state is
 * the honest default and is what a visitor first sees.
 */
export const Default = () => (
  <div className="max-w-2xl">
    <Faq
      items={[
        {
          q: "Do you store my product images?",
          a: "No. We read each image, write the alt text, and forget it. Nothing is kept after the scan finishes.",
        },
        {
          q: "Can I undo a bulk write?",
          a: "Yes — every write is reversible for 30 days from the history screen.",
        },
        {
          q: "Which languages are supported?",
          a: "Alt text is written in your store's primary language.",
        },
      ]}
    />
  </div>
);

export const TwoItems = () => (
  <div className="max-w-2xl">
    <Faq
      items={[
        {
          q: "What does the free scan cover?",
          a: "Every product image in your catalog, with 25 rewritten so you can judge the quality on your own products.",
        },
        {
          q: "What happens after the scan?",
          a: "Nothing automatic. You choose whether to turn on the auto-pilot.",
        },
      ]}
    />
  </div>
);

/**
 * The expanded state. Faq renders native <details> and takes no `open` prop, so
 * the card opens the first row through the DOM after mount — otherwise every
 * cell is a list of closed summaries and the answer styling is never visible.
 */
export const Opened = () => (
  <div
    className="max-w-2xl"
    ref={(el) => el?.querySelector("details")?.setAttribute("open", "")}
  >
    <Faq
      items={[
        {
          q: "Do you store my product images?",
          a: "No. We read each image, write the alt text, and forget it. Nothing is kept after the scan finishes.",
        },
        {
          q: "Can I undo a bulk write?",
          a: "Yes — every write is reversible for 30 days from the history screen.",
        },
      ]}
    />
  </div>
);
