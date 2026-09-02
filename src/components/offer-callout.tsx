import { cn } from "@/lib/utils";

/**
 * The founder-offer callout that sits inside a pricing card. The dashed
 * border is the whole point: it reads as a note pinned to the plan, not as
 * another plan. One label, one line — if it needs a paragraph it belongs
 * somewhere else.
 *
 * `children` is a single sentence; wrap the load-bearing words in
 * `<strong>` and they pick up ink at full weight against the muted line.
 */
export function OfferCallout({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "border-brand-800/45 bg-brand-50/60 rounded-lg border border-dashed px-4 py-3",
        className,
      )}
    >
      <p className="text-kicker text-brand-800 uppercase">{label}</p>
      <p className="text-muted-foreground [&_strong]:text-foreground mt-1.5 text-[13.5px] leading-[1.55] [&_strong]:font-semibold">
        {children}
      </p>
    </aside>
  );
}
