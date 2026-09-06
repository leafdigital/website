import { cn } from "@/lib/utils";

export type Stat = {
  /** The figure, already formatted by ICU at the call site. */
  value: string;
  /** What it counts. One line — if it needs two, it is not a stat. */
  label: string;
  /**
   * The number the card exists to land, in brand green. Exactly one stat per
   * card should carry it: two accents is two arguments, which is none.
   */
  accent?: boolean;
};

/**
 * The hero visual for a page whose opening claim IS a number — the "one
 * number" beat that follows the headline.
 *
 * Stacked figures on hairlines rather than a chart, for the same reason
 * `StatementRows` uses hairlines: a chart implies a trend we have not
 * measured, and these are two facts about the market, not a series. The
 * caption underneath is doing trust work — say what the figures are and
 * where they came from, and never let it claim more than the page proves.
 *
 * `DataCard` is the sibling for when the numbers are rows of a reconciliation
 * (label on the left, value on the right); use this one when the figure is
 * the point and the words underneath it are the caption.
 */
export function StatCard({
  stats,
  caption,
  className,
}: {
  stats: Stat[];
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-hairline bg-card shadow-card flex w-full flex-col gap-[26px] rounded-2xl border p-9",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex flex-col gap-1.5">
          {/* The rule belongs BETWEEN stats, so the first one never gets it. */}
          {i > 0 ? (
            <span
              aria-hidden="true"
              className="border-hairline-soft -mt-[26px] mb-[26px] border-t"
            />
          ) : null}
          <span
            className={cn(
              "text-[54px] leading-none font-extrabold tracking-[-0.03em]",
              stat.accent && "text-primary",
            )}
          >
            {stat.value}
          </span>
          <p className="text-muted-foreground">{stat.label}</p>
        </div>
      ))}
      {caption ? (
        <figcaption className="border-hairline-soft text-fine text-ink-faint border-t pt-[18px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
