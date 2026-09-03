import { cn } from "@/lib/utils";
import { Container } from "./container";

/**
 * `default` — white ground, the page's normal band.
 * `wash`    — quiet green tint for sections that should feel like the brand.
 * `dark`    — full-bleed #101911 for big statements (the problem/villain
 *             band, a final CTA). Max 1–2 per page, or it stops landing.
 */
export type SectionTone = "default" | "wash" | "dark";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
  /**
   * A hairline rule above the content instead of a gap, for two light
   * sections that belong to the same argument. The rule sits inside the
   * content column, and the section loses its own top padding to it.
   */
  divided?: boolean;
  className?: string;
  containerClassName?: string;
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
  containerClassName,
  tone = "default",
  divided = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        divided ? "pt-0 pb-20 sm:pb-[110px]" : "py-20 sm:py-[110px]",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      <Container
        {...(divided ? { "data-rule": "" } : {})}
        className={cn(
          divided && "border-hairline-soft border-t pt-16 sm:pt-[90px]",
          containerClassName,
        )}
      >
        {children}
      </Container>
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
  align = "left",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  /** `dark` when the block sits on a `Section tone="dark"` band. */
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      data-reveal
      className={cn(
        /* Left is the v3 default: the reference sets every section heading
         * against the content column's left edge, not down its middle. */
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-[660px]",
        className,
      )}
    >
      {kicker ? <Kicker tone={tone}>{kicker}</Kicker> : null}
      <h2
        className={cn(
          dark ? "mt-[18px]" : "mt-3.5",
          "text-3xl leading-[1.1] tracking-[-0.03em]",
          /* Dark bands and the final CTA carry the heavier 48px cut. */
          dark ? "text-on-dark sm:text-h2-lg" : "sm:text-h2",
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            dark ? "mt-[18px]" : "mt-3.5",
            "text-lg leading-[1.6]",
            dark ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
