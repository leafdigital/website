import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The one fully-round shape in v3 — pills and badges only, never a
 * container. Sits above a hero H1 ("A Shopify product studio") or inside a
 * card as a status marker.
 *
 * Green here is a border and a tint, never a fill behind white text: the
 * text is brand-900 on a near-white green wash, which clears AA.
 */
function PillBadge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="pill-badge"
      className={cn(
        "border-brand-800/25 bg-brand-50/85 text-brand-900 text-fine inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export { PillBadge };
