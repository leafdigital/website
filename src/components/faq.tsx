import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * Zero-JS FAQ built on native <details>/<summary> — keyboard- and
 * screen-reader-accessible for free, and it ships no hydration cost (the
 * Radix accordion's script evaluation was the margin that pushed the
 * alt-text page past its LCP budget on throttled mobile).
 */
export function Faq({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <div
      className={cn("reveal-group divide-border divide-y border-y", className)}
    >
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="text-ink-faint transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
            >
              ⌄
            </span>
          </summary>
          <p className="text-muted-foreground mt-3 leading-[1.65]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
