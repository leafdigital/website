import { cn } from "@/lib/utils";

export type Step = {
  title: string;
  body: string;
};

/**
 * The numbered process row: columns divided by a hairline rule, not by gaps
 * and not by cards. Step one's chip is filled green — it is the only step
 * you actually have to take — and the rest are the quiet green wash.
 *
 * Renders an ordered list, so the steps read as a sequence to a screen
 * reader as well as to an eye. Headings default to h3; pass `headingLevel`
 * when the surrounding outline needs something else.
 */
export function StepsRow({
  steps,
  headingLevel: Heading = "h3",
  className,
}: {
  steps: Step[];
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
}) {
  return (
    <ol className={cn("grid gap-8 md:grid-cols-3 md:gap-0", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          /* The rule between columns is the layout — no card, no gap. */
          /* Top border on mobile, left border from md up: the rule always
           * runs between two steps, never around one. */
          className="border-hairline border-t pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:px-10 md:pt-0 md:first:border-l-0 md:first:pl-0"
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-11 items-center justify-center rounded-lg text-[17px] font-bold",
              i === 0
                ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgb(46_125_50/0.3)]"
                : "bg-brand-50 text-brand-800",
            )}
          >
            {i + 1}
          </span>
          <Heading className="mt-3.5 text-[21px] tracking-[-0.01em]">
            {step.title}
          </Heading>
          <p className="text-muted-foreground mt-3.5 leading-[1.6]">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
