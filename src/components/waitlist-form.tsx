"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error";

const CHOICES = ["Both", "Catalog Readiness", "AI Answer Accuracy"] as const;

/**
 * The early-access form — one instance, in the homepage's bottom CTA
 * section (lab cards link here; no inline inputs on cards). One field, an
 * app choice, honest promise, first-person button (tested pattern).
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [app, setApp] = useState<(typeof CHOICES)[number]>("Both");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, app }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setMessage(data.error ?? "Something went wrong — try again?");
        setStatus("error");
        return;
      }
      trackCta("cta_waitlist_join", { app });
      setStatus("done");
    } catch {
      setMessage("Something went wrong — try again?");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-brand-800 font-medium" role="status">
        You’re on the list. We only write when there’s something to try.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-md flex-col gap-4">
      <fieldset>
        <legend className="sr-only">Which app are you interested in?</legend>
        <div className="flex flex-wrap justify-center gap-2">
          {CHOICES.map((choice) => (
            <label
              key={choice}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                app === choice
                  ? "border-brand-800 bg-brand-800 text-white"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="app"
                value={choice}
                checked={app === choice}
                onChange={() => setApp(choice)}
                className="sr-only"
              />
              {choice}
            </label>
          ))}
        </div>
      </fieldset>
      {/* Honeypot — hidden from real visitors, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          Email for early access
        </label>
        <Input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@yourstore.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
        />
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Joining…" : "Get early access"}
        </Button>
      </div>
      {status === "error" ? (
        <p className="text-destructive text-sm" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
