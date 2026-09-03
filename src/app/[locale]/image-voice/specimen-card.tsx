import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** A mono chip showing a literal alt attribute — the evidence, not a quote. */
function CodeChip({
  children,
  tone = "before",
  className,
  ...props
}: React.ComponentProps<"p"> & { tone?: "before" | "after" }) {
  return (
    <p
      {...props}
      className={cn(
        "relative rounded-md border p-3.5 font-mono text-[13px]",
        tone === "before"
          ? "border-hairline-soft bg-surface-muted text-ink-faint leading-[1.6]"
          : "border-brand-800/35 from-brand-50 border-[1.5px] bg-linear-to-b to-white leading-[1.7] shadow-[0_8px_24px_rgb(46_125_50/0.12)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** The label above each half of the specimen — the mono eyebrow, one down. */
function SpecimenLabel({
  children,
  tone = "before",
}: {
  children: React.ReactNode;
  tone?: "before" | "after";
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-semibold tracking-[0.16em] uppercase",
        tone === "before" ? "text-ink-faint" : "text-brand-800",
      )}
    >
      {children}
    </p>
  );
}

/**
 * One specimen, not a comparison table.
 *
 * The v1 cut of this section put "before" and "after" in two cards side by
 * side, which reads as two options. There is only one option: the junk gets
 * struck out — in red, the page's only — and the real description takes its
 * place on the same card, below an arrow pointing down. Same evidence, and
 * now it argues in one direction.
 */
export function SpecimenCard() {
  const t = useTranslations("imageVoice.checkbox");

  return (
    <div
      data-reveal
      className="border-hairline bg-card shadow-card-lifted mx-auto mt-14 flex max-w-[640px] flex-col gap-3.5 rounded-2xl border p-8 sm:mt-[68px] sm:px-9"
    >
      <SpecimenLabel>{t("beforeLabel")}</SpecimenLabel>
      {(["beforeOne", "beforeTwo"] as const).map((key, i) => (
        <CodeChip key={key}>
          <span
            data-reveal
            data-motion="strike-text"
            className="[--strike-line:var(--color-strike)]"
            style={
              { "--reveal-delay": `${200 + i * 200}ms` } as React.CSSProperties
            }
          >
            {t(key)}
          </span>
        </CodeChip>
      ))}
      <p className="text-ink-faint text-[13.5px] leading-[1.5]">
        {t("beforeCaption")}
      </p>
      <div aria-hidden="true" className="my-2.5 flex items-center gap-3.5">
        <span className="bg-hairline-strong h-px flex-1" />
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path
            d="M7 1v12M2.5 9.5L7 14l4.5-4.5"
            stroke="var(--color-brand-800)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="bg-hairline-strong h-px flex-1" />
      </div>
      <SpecimenLabel tone="after">{t("afterLabel")}</SpecimenLabel>
      <CodeChip
        tone="after"
        className="[--reveal-delay:640ms]"
        data-reveal
        data-motion="pop"
      >
        {t("afterCode")}
      </CodeChip>
      <p className="text-muted-foreground text-[13.5px] leading-[1.5]">
        {t("afterCaption")}
      </p>
    </div>
  );
}
