import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Quiet green wash for the sections that should feel like the brand. */
  wash?: boolean;
};

/**
 * Vertical rhythm primitive: every page section gets the same breathing room
 * and content column, so pages compose instead of re-measuring.
 */
export function Section({ className, wash, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-16 sm:py-24", wash && "bg-accent", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Consistent heading block: kicker, heading, optional sub. */
export function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-[40px] sm:leading-[1.15]">
        {title}
      </h2>
      {sub ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
