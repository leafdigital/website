import { useTranslations } from "next-intl";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { AppRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

const apps: { key: string; name: string; href: AppRoute; live: boolean }[] = [
  { key: "imageVoice", name: "Image Voice", href: "/image-voice", live: true },
  {
    key: "hiddenMargin",
    name: "Hidden Margin",
    href: "/hidden-margin",
    live: false,
  },
  {
    key: "reorderEngine",
    name: "Reorder Engine",
    href: "/reorder-engine",
    live: false,
  },
];

/**
 * The portfolio as an index, not a card grid.
 *
 * Three cards side by side make three equal offers, and only one of these is
 * installable today. Numbered rows down a page put them in order and let the
 * live one lead without needing a green card to shout it — the LIVE pill
 * does that work in one word. There is no /apps route; this is the only
 * index of the portfolio, so it reads like a contents page.
 *
 * The whole row is the link. A row with a link inside it gives you a 90px
 * target inside a 1100px one, and every visitor aims at the row anyway.
 */
export function SuiteIndex() {
  const t = useTranslations("home.suite");

  return (
    <div className="mt-12 sm:mt-14">
      {apps.map((app, i) => (
        <TrackedLink
          key={app.key}
          href={app.href}
          data-reveal
          event="cta_app_view"
          eventProps={{ location: "suite-index", app: app.name }}
          style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          className="group hover:bg-brand-50/50 border-hairline relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 px-2 py-8 transition-colors duration-200 last:border-b md:grid-cols-[72px_minmax(0,4fr)_minmax(0,6fr)_40px] md:gap-7 md:py-[42px]"
        >
          {/* The row's own rule, drawn rather than printed — the index
              assembles itself line by line as you come down the page. */}
          <span
            aria-hidden="true"
            data-reveal
            data-motion="strike"
            className="bg-hairline absolute top-0 left-0 h-px w-full"
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          />
          <span className="text-ink-faint font-mono text-[13px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col items-start gap-2.5">
            <h3 className="text-[26px] tracking-[-0.025em] sm:text-[31px]">
              {app.name}
            </h3>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.06em]",
                app.live
                  ? "bg-primary text-primary-foreground"
                  : "border-ink/16 text-muted-foreground border",
              )}
            >
              {t(app.live ? "live" : "lab")}
            </span>
          </div>
          <p className="text-muted-foreground col-span-2 text-base leading-[1.6] md:col-span-1 md:text-[15.5px]">
            {t(`${app.key}.description`)}{" "}
            <span className="text-brand-800 font-semibold whitespace-nowrap">
              {t(`${app.key}.cta`)}
            </span>
          </p>
          <span
            aria-hidden="true"
            className="text-brand-800 col-span-2 text-2xl transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none md:col-span-1 md:justify-self-end"
          >
            {"\u2192"}
          </span>
        </TrackedLink>
      ))}
    </div>
  );
}
