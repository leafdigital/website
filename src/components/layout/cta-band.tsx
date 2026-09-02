import { Container } from "@/components/layout/container";

/**
 * The band every page ends on: a green-to-near-black gradient with a white
 * glow drifting behind it, and one centred 680px column. The page has spent
 * itself arguing by this point — so there is exactly one thing to do here,
 * and `action` is it (a button, or the waitlist form).
 *
 * `note` is the line under the action: the cross-link to the apps a visitor
 * did not come for. `offer` sits above the action when there is a founder
 * deal to state (Hidden Margin's frosted tile).
 */
export function CtaBand({
  id,
  title,
  sub,
  offer,
  action,
  note,
}: {
  id?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  offer?: React.ReactNode;
  action?: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="from-surface-deep via-brand-900 to-brand-800 relative isolate overflow-hidden bg-linear-[135deg] via-55%"
    >
      {/* Decoration only — never announced, never interactive. */}
      <div
        aria-hidden="true"
        className="animate-aurora-slow pointer-events-none absolute -top-44 left-1/2 -z-10 h-[460px] w-[800px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent_70%)]"
      />
      {/*
       * `reveal-group`, not `reveal`. This column is the last content on the
       * page, and with the offer tile and the form in it, it can stand
       * taller than a short phone's viewport — an element that never
       * finishes entering never finishes its reveal, and would sit part
       * faded at the bottom of the scroll. Revealing the children instead
       * keeps every animated box comfortably shorter than the fold.
       */}
      <Container
        data-reveal-group
        className="flex max-w-[736px] flex-col items-center gap-[22px] py-20 text-center sm:py-[110px]"
      >
        <h2 className="text-on-dark text-3xl leading-[1.06] tracking-[-0.03em] sm:text-[48px]">
          {title}
        </h2>
        {sub ? (
          <p className="text-lg leading-[1.6] text-white/82">{sub}</p>
        ) : null}
        {offer}
        {action}
        {note ? <p className="w-full text-sm text-white/70">{note}</p> : null}
      </Container>
    </section>
  );
}

/**
 * The founder-offer tile on a dark band — frosted glass, so it reads as
 * something laid on top of the CTA rather than another paragraph of it.
 * Its light-ground twin is `OfferCallout`.
 */
export function DarkOfferCallout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="w-full rounded-lg border border-white/20 bg-white/8 px-5 py-4 backdrop-blur-sm">
      <p className="text-kicker text-brand-on-dark uppercase">{label}</p>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-white/75 [&_strong]:font-semibold [&_strong]:text-white">
        {children}
      </p>
    </aside>
  );
}
