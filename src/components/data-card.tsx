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
      <div className="border-hairline bg-card shadow-card rounded-2xl border p-7">
        {title ? (
          <p className="text-fine text-ink-faint mb-[18px] font-semibold">
            {title}
          </p>
        ) : null}
        <dl>
          {rows.map((row) =>
            row.result ? (
              <div
                key={row.label}
                className="border-brand-800/25 bg-brand-50 mt-2.5 flex items-baseline justify-between gap-4 rounded-lg border px-[18px] py-4"
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
                className="border-hairline-soft flex items-baseline justify-between gap-4 border-t py-3.5"
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
