/**
 * The document nobody reads, as a file row.
 *
 * The to-do card on Image Voice shows a task that never gets done; this is
 * its twin for the audit pages — a file that gets dealt with without being
 * opened. A forty-page invoice stamped "Approved" at 11:42pm, a PO tracker
 * last touched six weeks ago. The row is deliberately small and ordinary:
 * the point is how unremarkable the moment the money leaves is.
 *
 * `stamp` pops in after the row has landed — the approval arriving on a bill
 * nobody read. A card without one (the stale tracker) just sits there, which
 * is also the point.
 */
export function DocumentCard({
  name,
  meta,
  stamp,
  caption,
}: {
  name: string;
  meta: string;
  stamp?: string;
  caption: string;
}) {
  return (
    <figure className="mx-auto mt-16 flex max-w-[520px] flex-col gap-3.5 sm:mt-[84px]">
      <div
        data-reveal
        className="border-hairline bg-card shadow-card-lifted flex items-center gap-4 rounded-xl border px-6 py-5"
      >
        <span
          aria-hidden="true"
          className="bg-surface-muted border-hairline-soft flex size-11 flex-none items-center justify-center rounded-lg border"
        >
          <svg
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            className="text-ink-faint"
          >
            <path
              d="M3 1h8l6 6v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M11 1v6h6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M5.5 12h7M5.5 15.5h7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-[15px] font-semibold">{name}</p>
          <p className="text-ink-faint font-mono text-[11.5px]">{meta}</p>
        </div>
        {stamp ? (
          <span
            data-reveal
            data-motion="pop"
            className="border-brand-800/30 bg-brand-50 text-brand-800 ml-auto flex flex-none items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11.5px] font-semibold shadow-[0_6px_20px_rgb(46_125_50/0.15)] [--reveal-delay:500ms]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5.5L4 8L8.5 2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {stamp}
          </span>
        ) : null}
      </div>
      <figcaption className="text-caption text-ink-faint text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
