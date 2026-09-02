import { cn } from "@/lib/utils";

export type Statement = {
  /** The left column: a number ("01") or a micro-label ("LOST TRAFFIC"). */
  label: string;
  /** The line the row exists to make. 26px, white, semibold. */
  statement: string;
  /** Optional second line. The numbered rows on Home deliberately omit it. */
  body?: string;
};

/**
 * The body of a dark band: statements stacked on hairlines, not cards. The
 * hairlines are the layout — a card here would turn four related facts into
 * four separate things, which is exactly the wrong reading.
 *
 * `labelWidth` is the only variant: `narrow` for the numbered sequence on
 * Home, `wide` for the named prices on the app pages. On mobile the label
 * sits above the statement instead of beside it.
 */
export function StatementRows({
  items,
  labelWidth = "wide",
  className,
}: {
  items: Statement[];
  labelWidth?: "narrow" | "wide";
  className?: string;
}) {
  return (
    <dl
      className={cn("reveal-group mt-16 border-b border-white/12", className)}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "grid items-baseline gap-2 border-t border-white/12 py-6 sm:gap-6 sm:py-7",
            labelWidth === "narrow"
              ? "sm:grid-cols-[80px_1fr]"
              : "sm:grid-cols-[220px_1fr]",
          )}
        >
          <dt className="text-brand-on-dark text-[15px] font-bold tracking-[0.08em]">
            {item.label}
          </dt>
          <dd>
            <p className="text-on-dark text-xl leading-[1.35] font-semibold tracking-[-0.01em] sm:text-[26px]">
              {item.statement}
            </p>
            {item.body ? (
              <p className="mt-2 leading-[1.6] text-white/55">{item.body}</p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
