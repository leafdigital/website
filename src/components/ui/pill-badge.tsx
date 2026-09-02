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
  tone = "brand",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  /** `neutral` for the lab apps: in the lab is a status, not an action. */
  tone?: "brand" | "neutral";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="pill-badge"
      className={cn(
        "text-fine inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 font-medium",
        tone === "brand"
          ? "border-brand-800/25 bg-brand-50/85 text-brand-900"
          : "border-hairline-strong text-muted-foreground bg-white/85",
        className,
      )}
      {...props}
    />
  );
}

export { PillBadge };
