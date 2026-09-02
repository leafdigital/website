import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * v3 buttons: one 12px radius for every size, green fill for the single
 * action, white-with-a-hairline for everything else.
 *
 * Hover lifts. An earlier note here said it never should; the v3 handoff and
 * the reference HTML both specify the lift (−1px at nav size, −2px at hero
 * size, 200ms), and they win. It is a translate, so it costs no layout, and
 * `motion-reduce` drops it.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 motion-reduce:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-900",
        /* The v3 secondary: white ground, 1px ink hairline, ink text. */
        secondary:
          "border-hairline-strong bg-secondary text-secondary-foreground hover:border-ink/30 hover:bg-secondary aria-expanded:bg-ink-wash",
        /* Kept as an alias of secondary so existing call sites keep working
         * — v3 has one non-green button, not two. */
        outline:
          "border-hairline-strong bg-secondary text-secondary-foreground hover:bg-ink-wash aria-expanded:bg-ink-wash",
        /* On the dark band: white ground, brand-900 text, no hairline. The
         * green is the only colour left that reads as an action once the
         * ground is dark. */
        onDark:
          "bg-on-dark text-brand-900 hover:bg-on-dark/92 focus-visible:ring-on-dark/40",
        ghost:
          "hover:bg-ink-wash hover:text-foreground aria-expanded:bg-ink-wash aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /* Marketing-site scale. `lg` is the hero/key-CTA button and the only
       * one that carries the green glow; `sm` is the nav height. */
      size: {
        default: "h-11 gap-2 px-6 text-sm hover:-translate-y-px",
        sm: "h-[38px] gap-1.5 px-[18px] text-sm hover:-translate-y-px",
        /* The hero CTA: the biggest lift, and the shadow deepens with it so
         * the button reads as rising rather than sliding. */
        lg: "h-[52px] gap-2 px-7 text-base shadow-cta hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(46_125_50/0.4)]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
