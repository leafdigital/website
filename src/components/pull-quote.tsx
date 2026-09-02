import { Container } from "@/components/layout/container";

/**
 * A centred beat between two arguing sections: the sentence a merchant
 * actually says to themselves, or the question the page has been circling.
 * No kicker, no CTA, nothing to click — it exists to be agreed with.
 */
export function PullQuote({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="py-20 sm:py-[110px]">
      <Container className="reveal max-w-[720px] text-center">
        <h2 className="text-3xl leading-[1.15] tracking-[-0.03em] sm:text-[40px]">
          {title}
        </h2>
        <p className="text-muted-foreground mt-5 text-lg leading-[1.65]">
          {sub}
        </p>
      </Container>
    </section>
  );
}
