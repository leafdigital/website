import { cn } from "@/lib/utils";

export type DataRow = {
  label: string;
  value: string;
  /** The row the whole card exists to land — tinted, with a green hairline. */
  result?: boolean;
};

/**
 * The v3 hero/feature visual: a card of real numbers, not a photograph.
 * Rows are separated by hairlines, values are mono and tabular so the digits
 * line up, and one row can be marked `result` — the number we want the
 * visitor to feel.
 *
 * The card reconciles itself on load: the source rows arrive one after
 * another and the result row lands last, so a visitor watches three systems
 * disagree before being told what the disagreement costs. Time-based, not
 * scroll-triggered — it sits above the fold, so there is nothing to trigger
 * on, and the delays are keyed off the hero cascade that precedes it.
 *
 * `float` sets the card drifting once it has landed. Reserve it for a hero:
 * a card that keeps moving reads as live, and nothing below the fold needs
 * to say that about itself.
 *
 * `caption` is the 12px line underneath (what the figures are, where they
 * came from) — keep it honest, it is doing trust work.
 */
export function DataCard({
  title,
  rows,
  caption,
  float = false,
  className,
}: {
  title?: string;
  rows: DataRow[];
  caption?: React.ReactNode;
  float?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "border-hairline bg-card shadow-card rounded-2xl border p-7",
          float && "animate-float",
        )}
      >
        {title ? (
          <p className="text-fine text-ink-faint mb-[18px] font-semibold">
            {title}
          </p>
        ) : null}
        <dl>
          {rows.map((row, i) =>
            row.result ? (
              <div
                key={row.label}
                /* The verdict does not fade in with the evidence — it lands
                 * on top of it, a beat after the last source row. */
                className="border-brand-800/25 bg-brand-50 animate-result-pop mt-2.5 flex items-baseline justify-between gap-4 rounded-lg border px-[18px] py-4 shadow-[0_6px_20px_rgb(46_125_50/0.15)]"
              >
                <dt className="text-brand-900 text-[15px] font-bold">
                  {row.label}
                </dt>
                <dd className="text-brand-800 font-mono text-[15px] font-bold tabular-nums">
                  {row.value}
                </dd>
              </div>
            ) : (
              <div
                key={row.label}
                className="border-hairline-soft animate-fade-up flex items-baseline justify-between gap-4 border-t py-3.5"
                style={
                  {
                    animationDelay: `${520 + i * 140}ms`,
                  } as React.CSSProperties
                }
              >
                <dt className="text-[15px] font-semibold">{row.label}</dt>
                <dd className="font-mono text-[15px] tabular-nums">
                  {row.value}
                </dd>
              </div>
            ),
          )}
        </dl>
      </div>
      {caption ? (
        <figcaption className="text-caption text-ink-faint mt-3.5 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
