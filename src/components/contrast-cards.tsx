/**
 * The two futures, side by side: the one the visitor is living, and the one
 * the page has spent itself arguing for.
 *
 * No reveal, deliberately. It lands after a page of things that draw and
 * slide themselves in, and two plain cards that are simply THERE is the
 * loudest thing left. It is also why they are cards at all — this is the one
 * place on a page where two blocks really are separate things.
 *
 * The "with" card is the only one that carries weight: a green hairline, the
 * brand wash, ink at full strength. The "without" card is deliberately
 * muted — it is a description of the status quo, not an offer.
 */
export function ContrastCards({
  withoutLabel,
  withoutBody,
  withLabel,
  withBody,
}: {
  withoutLabel: string;
  withoutBody: React.ReactNode;
  withLabel: string;
  withBody: React.ReactNode;
}) {
  return (
    <div className="grid gap-[18px] md:grid-cols-2">
      <div className="border-hairline bg-surface-muted rounded-xl border p-10">
        <p className="text-fine text-ink-faint font-bold tracking-[0.05em] uppercase">
          {withoutLabel}
        </p>
        <p className="text-muted-foreground mt-3 text-lg leading-[1.6]">
          {withoutBody}
        </p>
      </div>
      <div className="border-brand-800/35 shadow-featured from-brand-50 rounded-xl border-[1.5px] bg-linear-to-b to-white p-10">
        <p className="text-fine text-brand-800 font-bold tracking-[0.05em] uppercase">
          {withLabel}
        </p>
        <p className="mt-3 text-lg leading-[1.6]">{withBody}</p>
      </div>
    </div>
  );
}
