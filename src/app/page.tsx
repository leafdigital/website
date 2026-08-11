import { AppCard } from "@/components/app-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { apps } from "@/lib/apps";
import { MIRROR, SUPPORT_EMAIL } from "@/lib/constants";

/* Copy architecture: brand/POSITIONING.md (locked 2026-08-11). Headlines
 * are decided strings — change the doc first, then this file. */

/* The flagship's four product laws — verbatim, frozen. The homepage quotes
 * them as-is; the section framing explains each app ships its own sheet. */
const laws = [
  "Never touch anything but the alt field.",
  "Never write from the filename or product title.",
  "Never silently overwrite alt a human wrote.",
  "Never start alt with “image of”.",
];

const truths = [
  { figure: "30 days", label: "every change undoable, before → after kept" },
  { figure: "4 laws", label: "written down before the first install" },
  { figure: "1 engineer", label: "builds the apps and answers the email" },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero. H1 is verbatim voice-of-customer. */}
      <Section className="text-center">
        <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
          A Shopify product studio
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-[52px] sm:leading-[1.1]">
          The work your store needs done — handled, correctly.
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
          Leaf makes Shopify apps that take on the jobs nobody on your team owns
          — starting with your product images — under written laws about what
          they’ll never touch, with an undo on everything they do.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <TrackedLink
            href="/apps/alt-text#scan"
            event="cta_scan_click"
            eventProps={{ location: "home-hero" }}
            className={buttonVariants({ size: "lg" })}
          >
            Scan my store free
          </TrackedLink>
          <TrackedLink
            href="/apps"
            event="cta_app_view"
            eventProps={{ location: "home-hero-secondary" }}
            className="text-muted-foreground hover:text-foreground text-sm font-medium underline-offset-4 hover:underline"
          >
            See the apps
          </TrackedLink>
        </div>
      </Section>

      {/* 2 — Truth strip: small-but-true numbers. */}
      <div className="border-y">
        <Container>
          <ul className="grid gap-6 py-8 text-center sm:grid-cols-3">
            {truths.map((truth) => (
              <li key={truth.figure}>
                <p className="text-2xl font-extrabold tracking-tight">
                  {truth.figure}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {truth.label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* 3 — Flagship mirror. */}
      <Section>
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-2">
          <CoverageRing
            covered={MIRROR.needsAttention}
            total={MIRROR.total}
            label="images need attention"
            className="justify-self-center"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              You didn’t build your store to babysit it.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Alt text is the classic unowned job: it costs you image-search
              traffic, it’s an accessibility exposure, and no one on your team
              has it on their list. Our flagship app scans your catalog free and
              shows you your real number — graded, not just counted. We only
              ever touch the alt field.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
              <TrackedLink
                href="/apps/alt-text#scan"
                event="cta_scan_click"
                eventProps={{ location: "home-mirror" }}
                className={buttonVariants({ size: "lg" })}
              >
                Scan my store free
              </TrackedLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 4 — The laws. Principles as content. */}
      <Section wash>
        <SectionHeading
          kicker="The standard"
          title="It's your store. Software should act like it."
          sub="Every Leaf app ships a written law sheet before its first install — what it will never do, in plain words. These are the flagship's. Hold us to them."
        />
        <ol className="mx-auto mt-12 max-w-2xl space-y-6 border-l-2 pl-8">
          {laws.map((law, i) => (
            <li key={law}>
              <p className="text-brand-800 text-xs font-bold tracking-wider uppercase">
                Law {i + 1}
              </p>
              <p className="mt-1 text-lg font-bold">{law}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5 — Apps shelf; lab cards carry the waitlist capture. */}
      <Section>
        <SectionHeading
          kicker="The apps"
          title="One job at a time, done properly"
          sub="Images first. Catalog quality and AI answers are in the lab — get in before they ship."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {apps.map((app) => (
            <li key={app.name}>
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 6 — The maker. Services: aware, not sold.
       * 7 — Reviews slot reserved: first five App Store reviews go here. */}
      <Section wash>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading kicker="The maker" title="Who's behind this" />
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Leaf is run by an engineer who has shipped for dozens of DTC brands
            — the kind of stores where a broken theme costs real money before
            lunch. That’s where the laws come from: years of seeing what
            careless software does to other people’s stores. When you email
            support, the person who wrote the code answers.
          </p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Beyond the apps, we take on a small number of engagements — theme
            and app builds, custom integrations. If your store needs hands like
            that,{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-foreground underline underline-offset-4"
            >
              write us
            </a>
            .
          </p>
        </div>
      </Section>

      {/* 8 — Closing CTA: the mirror hook, one last time. */}
      <Section className="text-center">
        <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Your store has a number. It takes one minute to see it.
        </h2>
        <div className="mt-8">
          <TrackedLink
            href="/apps/alt-text#scan"
            event="cta_scan_click"
            eventProps={{ location: "home-closing" }}
            className={buttonVariants({ size: "lg" })}
          >
            Scan my store free
          </TrackedLink>
        </div>
      </Section>
    </>
  );
}
