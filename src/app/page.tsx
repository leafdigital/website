import { AppCard } from "@/components/app-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Section, SectionHeading } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apps } from "@/lib/apps";
import { MIRROR } from "@/lib/constants";

const craft = [
  {
    title: "Built by a shipping engineer",
    body: "Not a growth team with a template — an engineer who has shipped for dozens of DTC brands and heard what breaks. You feel that in the details.",
  },
  {
    title: "Strict product laws",
    body: "Every app operates under written rules about what it will never touch. Read them before you install; hold us to them after.",
  },
  {
    title: "Auditable and reversible",
    body: "Every change shows its before and after, and every change can be undone. Trust isn't a promise here — it's a UI element.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero: one identity line, then the flagship takes over. */}
      <Section className="pb-0 text-center">
        <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
          A Shopify product studio
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-[52px] sm:leading-[1.1]">
          Leaf builds Shopify apps that make your store legible to AI
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
          AI agents are becoming the shoppers. When they look at your catalog,
          what do they see? Our flagship app starts with the picture most stores
          never check.
        </p>
      </Section>

      <Section className="pt-12">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <CoverageRing
            covered={MIRROR.needsAttention}
            total={MIRROR.total}
            label="images need attention"
            className="justify-self-center"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-balance">
              This is what a typical store scan sounds like: silence, where your
              images should be speaking.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Every image without real alt text is invisible to Google Images, a
              legal exposure, and a blank stare to the shopping agents your
              customers already ask. See your own number in about a minute —
              free, and we only ever touch the alt field.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
              <TrackedLink
                href="/apps/alt-text#scan"
                event="cta_scan_click"
                eventProps={{ location: "home-hero" }}
                className={buttonVariants({ size: "lg" })}
              >
                Scan my store free
              </TrackedLink>
            </div>
          </div>
        </div>
      </Section>

      <Section wash>
        <SectionHeading
          kicker="The apps"
          title="One narrative, app by app"
          sub="Make the catalog legible to machines — images first, attributes next, answers after that."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {apps.map((app) => (
            <li key={app.name}>
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading kicker="The craft" title="Why merchants stay" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {craft.map((tile) => (
            <li key={tile.title}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold">{tile.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {tile.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
