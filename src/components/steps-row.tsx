import { cn } from "@/lib/utils";

export type Step = {
  title: string;
  body: string;
};

/**
 * The numbered process row. Step one's chip is filled green — it is the only
 * step you actually have to take — and the rest are the quiet green wash.
 *
 * Two variants, and they are different arguments about the same three steps:
 *
 *   `divided`   — the v3 default. Columns separated by a hairline rule, not
 *                 by gaps and not by cards. Three things you get.
 *   `connected` — the Image Voice v2 cut. Centred columns threaded by a
 *                 single line that draws itself through the chips as the row
 *                 comes into view. One thing that happens, in three moves.
 *
 * Renders an ordered list, so the steps read as a sequence to a screen
 * reader as well as to an eye. Headings default to h3; pass `headingLevel`
 * when the surrounding outline needs something else.
 */
export function StepsRow({
  steps,
  variant = "divided",
  headingLevel: Heading = "h3",
  className,
}: {
  steps: Step[];
  variant?: "divided" | "connected";
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
}) {
  const connected = variant === "connected";

  return (
    <div
      className={cn(
        "relative",
        connected && "mx-auto max-w-[1020px]",
        className,
      )}
    >
      {connected ? (
        /*
         * The thread. It sits behind the chips and stops short of the outer
         * two, so it reads as running BETWEEN them rather than out of the
         * row; each chip's ring of page-ground is what masks it underneath.
         * Decoration only — the sequence is carried by the <ol>. Single
         * column on mobile has nothing to thread, so it is not drawn there.
         */
        <span
          aria-hidden="true"
          data-reveal
          data-motion="strike"
          className="absolute top-[22px] left-[14%] hidden h-px w-[72%] bg-linear-to-r from-[rgb(46_125_50/0.45)] to-[rgb(23_33_26/0.12)] md:block"
        />
      ) : null}
      <ol
        data-reveal-group
        className={cn(
          "relative grid gap-8 md:grid-cols-3",
          connected ? "md:gap-11" : "md:gap-0",
        )}
      >
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={cn(
              connected
                ? "flex flex-col items-center text-center"
                : /* The rule between columns is the layout — no card, no gap.
                   * Top border on mobile, left border from md up: the rule
                   * always runs between two steps, never around one. */
                  "border-hairline border-t pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:px-10 md:pt-0 md:first:border-l-0 md:first:pl-0",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex size-11 items-center justify-center rounded-lg text-[17px] font-bold",
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-brand-50 text-brand-800",
                connected
                  ? /* The ring paints the page ground over the thread for
                     * 8px around the chip, so the line reads as passing
                     * behind it rather than through it. */
                    "relative z-1 shadow-[0_0_0_8px_var(--color-background)]"
                  : i === 0 && "shadow-[0_4px_14px_rgb(46_125_50/0.3)]",
              )}
            >
              {i + 1}
            </span>
            <Heading className="mt-3.5 text-[21px] tracking-[-0.01em]">
              {step.title}
            </Heading>
            <p
              className={cn(
                "text-muted-foreground mt-3.5 leading-[1.6]",
                connected && "max-w-[300px]",
              )}
            >
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
