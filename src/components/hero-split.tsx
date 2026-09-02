import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * The v3 hero: left-aligned, 7fr/5fr, 64px gutter, with a soft green glow
 * drifting behind the copy above the fold. Everything is a slot, because the
 * hero is the one place per page where the copy dictates the composition —
 * the component only guarantees the geometry, the glow and the entrance.
 *
 * Compose it as: `badge` (a `PillBadge`), an optional `kicker`, an h1 in
 * `title` with exactly one word in `text-primary`, `sub`, a `cta` row, and
 * the `finePrint` reassurance line. `visual` is the right column — a card of
 * real numbers, not a photograph.
 */
export function HeroSplit({
  badge,
  kicker,
  title,
  sub,
  cta,
  finePrint,
  visual,
  className,
}: {
  badge?: React.ReactNode;
  kicker?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  cta?: React.ReactNode;
  finePrint?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-20 pb-24 sm:pt-[110px] sm:pb-[120px]",
        className,
      )}
    >
      {/* Decoration only — never announced, never interactive. */}
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute -top-[260px] left-1/2 -z-10 h-[640px] w-[1000px] -translate-x-1/2 rounded-[50%] blur-[44px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(67,160,71,0.13), rgba(240,253,244,0.5) 55%, transparent 75%)",
        }}
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/*
           * The column cascades rather than arriving as a block: each child
           * trails the one above it. The delays are keyed from the END of
           * the list, because the front of it varies — only some pages pass
           * a `kicker` — while sub / CTA / fine print are always the last
           * three. The headline stays at 0ms: it is the LCP element on
           * every one of these pages and must not wait on choreography.
           */}
          <div className="[&>*]:animate-fade-up flex flex-col items-start gap-6 text-left sm:gap-[26px] [&>*:nth-last-child(1)]:[animation-delay:220ms] [&>*:nth-last-child(2)]:[animation-delay:160ms] [&>*:nth-last-child(3)]:[animation-delay:80ms]">
            {badge}
            {kicker}
            {title}
            {sub ? (
              <div className="text-muted-foreground max-w-[520px] text-lg leading-[1.6] text-pretty sm:text-xl">
                {sub}
              </div>
            ) : null}
            {cta ? (
              <div className="mt-1.5 flex flex-wrap items-center gap-3.5">
                {cta}
              </div>
            ) : null}
            {finePrint ? (
              <p className="text-fine text-ink-faint">{finePrint}</p>
            ) : null}
          </div>
          {visual ? (
            /* The evidence lands after the claim — never before it. */
            <div className="animate-fade-up min-w-0 [animation-delay:140ms]">
              {visual}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
