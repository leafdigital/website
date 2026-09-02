import { cn } from "@/lib/utils";

/** Page-width wrapper — v3's 1160px content column, 28px side gutters. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1160px] px-7", className)}
      {...props}
    />
  );
}
