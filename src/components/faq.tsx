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
    <div className={cn("divide-border divide-y border-y", className)}>
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md font-medium marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="text-muted-foreground transition-transform group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <p className="text-muted-foreground mt-3 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
