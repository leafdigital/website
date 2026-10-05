import { cn } from "@/lib/utils";

export type Field = {
  label: string;
  value: string;
  /** The field the card exists to land — green, and it pops in last. */
  result?: boolean;
};

/**
 * One record, shown as the machine would hold it: a label column and a mono
 * value column, nothing else. It is the audit pages' specimen — the dispute
 * line a 3PL receives, the three numbers one PO has — and the point of the
 * shape is what it leaves out. No sentence, no adjective, no colour until the
 * last row, which is the difference and is the only thing anyone will act on.
 *
 * The fields reveal as a group so the record assembles itself line by line,
 * and the result row is placed rather than faded in — same vocabulary as the
 * data card in the hero, so the two read as the same system.
 */
export function FieldCard({
  label,
  fields,
  caption,
  className,
}: {
  /** The mono eyebrow above the record. */
  label: string;
  fields: Field[];
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "mx-auto mt-14 flex max-w-[640px] flex-col gap-3.5 sm:mt-[68px]",
        className,
      )}
    >
      <div
        data-reveal
        className="border-hairline bg-card shadow-card-lifted rounded-2xl border p-8 sm:px-9"
      >
        <p className="text-ink-faint mb-4 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">
          {label}
        </p>
        <dl data-reveal-group>
          {fields.map((field) =>
            field.result ? (
              <div
                key={field.label}
                data-reveal
                data-motion="pop"
                className="border-brand-800/30 bg-brand-50 mt-3 flex items-baseline justify-between gap-4 rounded-lg border px-4 py-3.5 shadow-[0_6px_20px_rgb(46_125_50/0.15)] [--reveal-delay:240ms]"
              >
                <dt className="text-brand-900 text-[15px] font-bold">
                  {field.label}
                </dt>
                <dd className="text-brand-800 font-mono text-[15px] font-bold tabular-nums">
                  {field.value}
                </dd>
              </div>
            ) : (
              <div
                key={field.label}
                data-reveal
                className="border-hairline-soft flex items-baseline justify-between gap-4 border-t py-3"
              >
                <dt className="text-muted-foreground text-[15px]">
                  {field.label}
                </dt>
                <dd className="font-mono text-[14px] tabular-nums">
                  {field.value}
                </dd>
              </div>
            ),
          )}
        </dl>
      </div>
      {caption ? (
        <figcaption className="text-caption text-ink-faint text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
