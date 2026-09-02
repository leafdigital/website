import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * v3 buttons: one 12px radius for every size, green fill for the single
 * action, white-with-a-hairline for everything else. Hover moves colour
 * only, in 150ms — nothing scales, nothing lifts.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-900",
        /* The v3 secondary: white ground, 1px ink hairline, ink text. */
        secondary:
          "border-hairline-strong bg-secondary text-secondary-foreground hover:bg-ink-wash aria-expanded:bg-ink-wash",
        /* Kept as an alias of secondary so existing call sites keep working
         * — v3 has one non-green button, not two. */
        outline:
          "border-hairline-strong bg-secondary text-secondary-foreground hover:bg-ink-wash aria-expanded:bg-ink-wash",
        /* On the dark band: white ground, ink text, no hairline needed. */
        onDark:
          "bg-on-dark text-ink hover:bg-on-dark/90 focus-visible:ring-brand-on-dark/40",
        ghost:
          "hover:bg-ink-wash hover:text-foreground aria-expanded:bg-ink-wash aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /* Marketing-site scale. `lg` is the hero/key-CTA button and the only
       * one that carries the green glow; `sm` is the nav height. */
      size: {
        default: "h-11 gap-2 px-6 text-sm",
        sm: "h-[38px] gap-1.5 px-[18px] text-sm",
        lg: "h-[52px] gap-2 px-7 text-base shadow-cta",
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
