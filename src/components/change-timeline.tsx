import { Kicker } from "@/components/layout/section";

export type Change = {
  /** When — "Same day", "Month two". */
  label: string;
  title: string;
  body: string;
};

/**
 * What changes for you, as a timeline rather than a grid.
 *
 * The Image Voice journey hangs eleven promises off four chapters. The audit
 * pages have one promise per moment, so the chapter rail and the beat
 * collapse into a single row: when, on the left; what, on the right, hung
 * off a drawn thread. Six rows, in the order they happen — and the order is
 * the argument, because the last one is "before any money moves".
 *
 * On a phone the label sits above the beat and the thread runs down the
 * left edge, which is the same layout the plan timeline on the homepage
 * falls back to.
 */
export function ChangeTimeline({ items }: { items: Change[] }) {
  return (
    <ol data-reveal-group className="mt-14 sm:mt-16">
      {items.map((item, i) => (
        <li
          key={item.label}
          className="grid gap-3 md:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] md:gap-12"
        >
          {/* The rail: when. Top-aligned with the beat's title. */}
          <div className="pt-1 md:pt-[22px]">
            <Kicker>{item.label}</Kicker>
          </div>
          {/* The beat, hung off a thread that runs the length of the list
              because every row draws its own segment — no gaps, no seams. */}
          <div className="border-hairline relative border-l pb-10 pl-9 last:pb-0 sm:pb-12 md:py-5 md:pl-11">
            <span
              aria-hidden="true"
              data-reveal
              data-motion="dot"
              className="bg-primary absolute top-[9px] -left-[5px] size-[9px] rounded-full shadow-[0_0_0_5px_var(--color-background)] md:top-[29px]"
              style={
                { "--reveal-delay": `${120 + i * 40}ms` } as React.CSSProperties
              }
            />
            <h3 className="text-[23px] leading-[1.2] tracking-[-0.02em] sm:text-[26px]">
              {item.title}
            </h3>
            <p className="text-muted-foreground mt-2.5 max-w-[560px] leading-[1.6]">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
