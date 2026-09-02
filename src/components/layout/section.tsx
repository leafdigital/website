import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * `default` — white ground, the page's normal band.
 * `wash`    — quiet green tint for sections that should feel like the brand.
 * `dark`    — full-bleed #0B120D for big statements (the problem/villain
 *             band, a final CTA). Max 1–2 per page, or it stops landing.
 */
export type SectionTone = "default" | "wash" | "dark";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
};

const toneClass: Record<SectionTone, string> = {
  default: "",
  wash: "bg-accent",
  /* The one surface where a below-800 green may carry text — the kicker.
   * Body copy on it is 60% white, headings full white. */
  dark: "bg-surface-dark text-on-dark-muted",
};

/**
 * Vertical rhythm primitive: every page section gets the same breathing room
 * and content column, so pages compose instead of re-measuring. `data-tone`
 * is on the element so nested pattern components can read the surface.
 */
export function Section({
  className,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("py-16 sm:py-24", toneClass[tone], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * The label that sits above a heading — 13/700, wide tracking, uppercase.
 * `SectionHeading` renders one for you; use this directly for the kickers
 * that sit above an h1 or inside a pattern component.
 */
export function Kicker({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-kicker uppercase",
        tone === "dark" ? "text-brand-on-dark" : "text-brand-800",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Consistent heading block: kicker, heading, optional sub. */
export function SectionHeading({
  kicker,
  title,
  sub,
  tone = "light",
  align = "center",
  className,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  /** `dark` when the block sits on a `Section tone="dark"` band. */
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {kicker ? <Kicker tone={tone}>{kicker}</Kicker> : null}
      <h2
        className={cn(
          "sm:text-h2 mt-3 text-3xl tracking-[-0.03em]",
          dark && "text-on-dark",
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-4 text-lg leading-[1.65]",
            dark ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
