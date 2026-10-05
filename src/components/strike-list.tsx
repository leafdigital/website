/**
 * What you stop doing — a list that crosses itself out.
 *
 * The strike is the same one the Image Voice to-do card draws through the
 * task that never gets done, used the other way round: there it marks
 * deferral, here it marks a job that is gone. Each line is struck a beat
 * after the one above it, so the list clears itself as you read down it.
 *
 * The struck text stays in the DOM at full contrast until the reveal fires,
 * and the strike is a painted background, so a screen reader gets the plain
 * list and the heading above it says what the list is.
 */
export function StrikeList({ items }: { items: string[] }) {
  return (
    <ul data-reveal-group className="border-hairline mt-12 border-b">
      {items.map((item, i) => (
        <li
          key={item}
          className="border-hairline flex items-start gap-4 border-t py-5 sm:items-center sm:py-6"
        >
          <span
            aria-hidden="true"
            className="bg-primary mt-1.5 flex size-[18px] flex-none items-center justify-center rounded-[5px] sm:mt-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5.5L4 8L8.5 2.5"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {/* Two spans: the outer is a flex item and would be blockified,
              and a blockified box has no line fragments for the strike to
              clone onto. The inner stays inline. */}
          <span className="text-muted-foreground text-lg leading-[1.5] sm:text-xl">
            <span
              data-reveal
              data-motion="strike-text"
              style={
                {
                  "--reveal-delay": `${200 + i * 160}ms`,
                } as React.CSSProperties
              }
            >
              {item}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
