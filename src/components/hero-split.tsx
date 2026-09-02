import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * The v3 hero: left-aligned, 7fr/5fr, 64px gutter, with a soft green glow
 * sitting behind the copy above the fold. Everything is a slot, because the
 * hero is the one place per page where the copy dictates the composition —
 * the component only guarantees the geometry and the glow.
 *
 * Compose it as: `badge` (a `PillBadge`), an h1 in `title` with exactly one
 * word in `text-primary`, `sub`, a `cta` row, and the `finePrint`
 * reassurance line. `visual` is the right column — a `DataCard`, not a
 * photograph.
 */
export function HeroSplit({
  badge,
  title,
  sub,
  cta,
  finePrint,
  visual,
  className,
}: {
  badge?: React.ReactNode;
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
        "relative isolate overflow-hidden py-16 sm:py-24",
        className,
      )}
    >
      {/* Decoration only — never announced, never interactive. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgb(67 160 71 / 0.18), transparent)",
        }}
      />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="text-left">
            {badge}
            <div className={badge ? "mt-6" : undefined}>{title}</div>
            {sub ? (
              <div className="text-muted-foreground mt-6 max-w-xl text-lg leading-[1.65]">
                {sub}
              </div>
            ) : null}
            {cta ? (
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                {cta}
              </div>
            ) : null}
            {finePrint ? (
              <p className="text-fine text-ink-faint mt-4">{finePrint}</p>
            ) : null}
          </div>
          {visual ? <div className="lg:justify-self-end">{visual}</div> : null}
        </div>
      </Container>
    </section>
  );
}
