import { TrackedLink } from "@/components/analytics/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/layout/section";

// Interim homepage — the full v1 build (studio hero + flagship mirror) lands
// with the pages layer. This keeps the domain coherent in the meantime.
export default function Home() {
  return (
    <Section className="text-center">
      <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
        Agentic commerce
      </p>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        AI agents are becoming the shoppers. Make your store legible to
        machines.
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed">
        Leaf builds Shopify apps that get your store seen, understood, and
        recommended by AI — starting with your images.
      </p>
      <div className="mt-10">
        <TrackedLink
          href="/apps/alt-text"
          event="cta_install_click"
          eventProps={{ location: "interim-home" }}
          className={buttonVariants({ size: "lg" })}
        >
          See our first app
        </TrackedLink>
      </div>
    </Section>
  );
}
