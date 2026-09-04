import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * The disclosure caret.
 *
 * An SVG rather than a "⌄" glyph, because this thing rotates: a text
 * character sits wherever its font's bearings put it inside the em box, so
 * flipping it 180° moves the visible mark off the line it was aligned to —
 * visibly wrong in one state, and usually in both. This path is centred on
 * its own viewBox, so a half turn maps it exactly onto itself.
 */
function Caret({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      className={cn(
        "size-3 shrink-0 transition-transform duration-150 motion-reduce:transition-none",
        className,
      )}
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One question. Every question in a list shares a `name`, which is what makes
 * the group behave as an accordion — the browser closes the open one when you
 * open another, with no script and no state. Browsers without support just
 * let several stand open, which is the old behaviour and is fine.
 */
function Question({ item, group }: { item: FaqItem; group: string }) {
  return (
    <details name={group} className="border-hairline group border-t py-5">
      <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
        {item.q}
        <Caret className="text-ink-faint group-open:rotate-180" />
      </summary>
      <p className="text-muted-foreground mt-3 leading-[1.65]">{item.a}</p>
    </details>
  );
}

/**
 * Zero-JS FAQ built on native <details>/<summary> — keyboard- and
 * screen-reader-accessible for free, and it ships no hydration cost (the
 * Radix accordion's script evaluation was the margin that pushed the
 * alt-text page past its LCP budget on throttled mobile).
 *
 * `collapseAfter` hides everything past the nth question behind one more
 * <details>, so a long list stops being a wall to scroll past on the way to
 * the page's last CTA. It is the same mechanism as the questions themselves,
 * for the same reason: the browser gives us the button role, the
 * `aria-expanded` state and the keyboard handling, and we ship no script to
 * get them. Every hidden question is still in the DOM, so in-page search and
 * crawlers see the whole list either way.
 *
 * Pass `moreLabel` / `lessLabel` from the call site — this component stays
 * free of message lookups, like the other pattern components.
 */
export function Faq({
  items,
  collapseAfter,
  moreLabel,
  lessLabel,
  /* The accordion group. Only ever needs overriding if a page grows a second
   * FAQ — two lists sharing a name would close each other's answers. */
  name = "faq",
  className,
}: {
  items: FaqItem[];
  /** Questions shown before the fold. Omit to render the whole list. */
  collapseAfter?: number;
  moreLabel?: string;
  lessLabel?: string;
  name?: string;
  className?: string;
}) {
  const collapses =
    collapseAfter !== undefined && items.length > collapseAfter && moreLabel;
  const shown = collapses ? items.slice(0, collapseAfter) : items;
  const hidden = collapses ? items.slice(collapseAfter) : [];

  return (
    <div
      data-reveal-group
      className={cn("border-hairline border-b", className)}
    >
      {shown.map((item) => (
        <Question key={item.q} item={item} group={name} />
      ))}
      {collapses ? (
        /* `flex-col` so the toggle can be ordered BELOW what it reveals.
         * A summary is always the first child in the DOM, and a "show
         * fewer" control stranded above the questions it collapses is a
         * control you have to scroll back up to find. */
        <details className="group/more flex flex-col">
          {/* Deliberately unnamed — if this shared the questions' group,
              opening any one of them would collapse the whole tail.
              The summary stays the FIRST DOM child, because that is what
              makes it the disclosure widget at all; `order` moves it
              visually and nothing else. */}
          <summary className="border-hairline text-brand-800 order-2 flex cursor-pointer list-none items-center justify-center gap-2 border-t py-5 text-[15px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="group-open/more:hidden">{moreLabel}</span>
            <span className="hidden group-open/more:inline">{lessLabel}</span>
            <Caret className="group-open/more:rotate-180" />
          </summary>
          <div className="order-1">
            {hidden.map((item) => (
              <Question key={item.q} item={item} group={name} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
