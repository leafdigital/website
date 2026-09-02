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
    <ol className={cn("grid gap-10 md:grid-cols-3 md:gap-0", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          /* The rule between columns is the layout — no card, no gap. */
          className="border-border md:border-l md:px-10 md:first:border-l-0 md:first:pl-0"
        >
          <span
            aria-hidden="true"
            className={cn(
              "text-h3 flex size-11 items-center justify-center rounded-lg font-mono tabular-nums",
              i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-brand-50 text-brand-800",
            )}
          >
            {i + 1}
          </span>
          <Heading className="text-h3 mt-5">{step.title}</Heading>
          <p className="text-muted-foreground mt-2 leading-[1.65]">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
