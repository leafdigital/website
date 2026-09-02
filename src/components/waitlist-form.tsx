"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackCta } from "@/lib/analytics";

type Status = "idle" | "sending" | "done" | "error";

/**
 * One list, every app. The form takes an email and nothing else — a choice
 * of app would imply separate lists, and there is exactly one (see the API
 * route). `source` is which page it was submitted from, for the inbox.
 *
 * It only ever renders on the dark CTA band, so the styling is on-dark:
 * near-white input, white button, white status line.
 */
export function WaitlistForm({ source }: { source: string }) {
  const t = useTranslations("common.waitlist");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      trackCta("cta_waitlist_join", { source });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-on-dark font-semibold" role="status">
        {t("joined")}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-[440px]">
      <div className="flex gap-2">
        {/* Honeypot — hidden from real visitors, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <label htmlFor="waitlist-email" className="sr-only">
          {t("emailLabel")}
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="text-ink h-[50px] min-w-0 flex-1 rounded-lg border border-white/25 bg-white/95 px-4 text-[15px] outline-none focus:border-white focus:ring-3 focus:ring-white/25 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="text-brand-900 shadow-on-dark h-[50px] shrink-0 rounded-lg bg-white px-[22px] text-[15px] font-bold transition-[transform,box-shadow] duration-200 hover:-translate-y-px focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
      {status === "error" ? (
        <p className="mt-3 text-sm text-white/80" role="alert">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
