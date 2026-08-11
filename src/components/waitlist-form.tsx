"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackCta } from "@/lib/analytics";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Lab-card email capture. Small on purpose: one field, honest promise,
 * first-person button (tested pattern), no gated content.
 */
export function WaitlistForm({ app }: { app: string }) {
  const [email, setEmail] = useState("");
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
      <p className="text-brand-800 text-sm font-medium" role="status">
        You’re on the list. We only write when there’s something to try.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <label htmlFor={`waitlist-${app}`} className="sr-only">
        Email for the {app} waitlist
      </label>
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
        <Input
          id={`waitlist-${app}`}
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
