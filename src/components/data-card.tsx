import { cn } from "@/lib/utils";

export type DataRow = {
  label: string;
  value: string;
  /** The row the whole card exists to land — tinted, with a green hairline. */
  result?: boolean;
};

/**
 * The v3 hero/feature visual: a card of real numbers, not a photograph.
 * Rows are separated by hairlines, values are mono and tabular so the
 * columns line up, and one row can be marked `result` — the number we want
 * the visitor to feel.
 *
 * `caption` is the 12px line underneath (what the figures are, where they
 * came from) — keep it honest, it is doing trust work.
 */
export function DataCard({
  title,
  rows,
  caption,
  className,
}: {
  title?: string;
  rows: DataRow[];
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="border-border bg-card shadow-card rounded-2xl border p-5">
        {title ? (
          <p className="text-fine text-ink-faint mb-4 font-semibold tracking-[0.04em] uppercase">
            {title}
          </p>
        ) : null}
        <dl>
          {rows.map((row) =>
            row.result ? (
              <div
                key={row.label}
                className="border-brand-800/25 bg-brand-50 mt-3 flex items-baseline justify-between gap-6 rounded-lg border px-4 py-3"
              >
                <dt className="text-brand-900 text-sm font-semibold">
                  {row.label}
                </dt>
                <dd className="text-brand-900 font-mono text-lg font-bold tabular-nums">
                  {row.value}
                </dd>
              </div>
            ) : (
              <div
                key={row.label}
                className="border-border flex items-baseline justify-between gap-6 border-b py-3 first:pt-0 last:border-b-0"
              >
                <dt className="text-muted-foreground text-sm">{row.label}</dt>
                <dd className="text-foreground font-mono text-sm font-semibold tabular-nums">
                  {row.value}
                </dd>
              </div>
            ),
          )}
        </dl>
      </div>
      {caption ? (
        <figcaption className="text-caption text-ink-faint mt-3 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
