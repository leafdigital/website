import { AppCard } from "@/components/app-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CoverageRing } from "@/components/coverage-ring";
import { WaitlistForm } from "@/components/waitlist-form";
import { Container } from "@/components/layout/container";
import { Kicker, Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { PillBadge } from "@/components/ui/pill-badge";
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
  { figure: "25 free", label: "taste the quality on your own images, forever" },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero. H1 is verbatim voice-of-customer. */}
      <Section className="text-center">
        <PillBadge className="mx-auto">A Shopify product studio</PillBadge>
        <h1 className="lg:text-hero mx-auto mt-6 max-w-4xl text-4xl tracking-[-0.045em] sm:text-5xl">
          The work your store needs done — handled,{" "}
          <span className="text-primary">correctly</span>.
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-[1.65]">
          Leaf makes Shopify apps that take on the jobs nobody on your team owns
          — starting with your product images — under written laws about what
          they’ll never touch, with an undo on everything they do.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button asChild size="lg">
            <TrackedLink
              href="/apps/alt-text#scan"
              event="cta_scan_click"
              eventProps={{ location: "home-hero" }}
            >
              Scan my store free
            </TrackedLink>
          </Button>
          <Button asChild size="lg" variant="secondary" className="shadow-none">
            <TrackedLink
              href="/apps"
              event="cta_app_view"
              eventProps={{ location: "home-hero-secondary" }}
            >
              See the apps
            </TrackedLink>
          </Button>
        </div>
        <p className="text-fine text-ink-faint mt-4">
          Free to scan · No card · Nothing written without your approval
        </p>
      </Section>

      {/* 2 — Truth strip: small-but-true numbers. */}
      <div className="border-border border-y">
        <Container>
          <ul className="grid gap-6 py-8 text-center sm:grid-cols-3">
            {truths.map((truth) => (
              <li key={truth.figure}>
                <p className="text-h3 font-mono tabular-nums">{truth.figure}</p>
                <p className="text-muted-foreground text-fine mt-1">
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
            <h2 className="sm:text-h2 text-3xl tracking-[-0.03em]">
              You didn’t build your store to babysit it.
            </h2>
            <p className="text-muted-foreground mt-4 leading-[1.65]">
              Alt text is the classic unowned job: it costs you image-search
              traffic, it’s an accessibility exposure, and no one on your team
              has it on their list. Our flagship app scans your catalog free and
              shows you your real number — graded, not just counted. We only
              ever touch the alt field.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5 sm:justify-start">
              <Button asChild size="lg">
                <TrackedLink
                  href="/apps/alt-text#scan"
                  event="cta_scan_click"
                  eventProps={{ location: "home-mirror" }}
                >
                  Scan my store free
                </TrackedLink>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 4 — The laws. Principles as content. */}
      <Section tone="wash">
        <SectionHeading
          kicker="The standard"
          title="It's your store. Software should act like it."
          sub="Every Leaf app ships a written law sheet before its first install — what it will never do, in plain words. These are the flagship's. Hold us to them."
        />
        <ol className="border-border mx-auto mt-12 max-w-2xl space-y-6 border-l pl-8">
          {laws.map((law, i) => (
            <li key={law}>
              <Kicker>Law {i + 1}</Kicker>
              <p className="text-h3 mt-1.5">{law}</p>
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
      <Section tone="wash">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading kicker="The maker" title="Who's behind this" />
          <p className="text-muted-foreground mt-6 leading-[1.65]">
            Leaf is run by an engineer who has shipped for dozens of DTC brands
            — the kind of stores where a broken theme costs real money before
            lunch. That’s where the laws come from: years of seeing what
            careless software does to other people’s stores. When you email
            support, the person who wrote the code answers.
          </p>
          <p className="text-muted-foreground text-fine mt-4 leading-[1.6]">
            Beyond the apps, we take on a small number of engagements — theme
            and app builds, custom integrations. If your store needs hands like
            that,{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-foreground hover:text-primary underline underline-offset-4 transition-colors duration-150"
            >
              write us
            </a>
            .
          </p>
        </div>
      </Section>

      {/* 8 — Closing CTA: the mirror hook, one last time. */}
      <Section tone="dark" className="text-center">
        <SectionHeading
          tone="dark"
          kicker="One minute"
          title="Your store has a number. It takes one minute to see it."
        />
        <div className="mt-9">
          <Button asChild size="lg">
            <TrackedLink
              href="/apps/alt-text#scan"
              event="cta_scan_click"
              eventProps={{ location: "home-closing" }}
            >
              Scan my store free
            </TrackedLink>
          </Button>
        </div>
        <p className="text-fine text-on-dark-muted mt-4">
          Free forever to scan · We only ever touch the alt field
        </p>
      </Section>

      {/* 9 — Early access: the one waitlist form; lab cards link here. */}
      <Section
        tone="wash"
        id="early-access"
        className="scroll-mt-16 text-center"
      >
        <SectionHeading
          kicker="The lab"
          title="Be first in line for what's next"
          sub="Catalog quality scoring and AI answer accuracy are in the works. Early-access merchants shape them — and never pay to look."
        />
        <div className="mt-10">
          <WaitlistForm />
        </div>
      </Section>
    </>
  );
}
