"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { registerPostHog, trackEvent } from "@/lib/analytics";
import { POSTHOG_ENABLED, POSTHOG_HOST, POSTHOG_KEY } from "@/lib/constants";
import { isGatedRegion, onConsentChange, readConsent } from "@/lib/consent";

const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

/** Where on the page a click happened, in words a report can group by. */
function sectionOf(el: Element) {
  const landmark = el.closest(
    "header, footer, nav, section[id], [data-section]",
  );
  if (!landmark) return "main";
  const tag = landmark.tagName.toLowerCase();
  if (tag === "header" || tag === "footer" || tag === "nav") return tag;
  return (landmark as HTMLElement).dataset.section ?? landmark.id;
}

function textOf(el: Element) {
  return (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
}

/**
 * Loads PostHog after first paint and applies the visitor's consent to it.
 *
 * Lazy on purpose: the Lighthouse budget (LCP 2.5s) is enforced in CI, and a
 * 50KB analytics bundle has no business competing with the hero. It waits for
 * the browser to be idle, and events fired before then queue in
 * `lib/analytics` rather than being lost.
 *
 * Consent is PostHog's own mechanism, not a wrapper around it:
 * `cookieless_mode: 'on_reject'` counts a visitor without storing anything on
 * their device whenever they are opted out, and `opt_out_capturing_by_default`
 * puts a visitor in a gated region there until they say yes. Declining keeps
 * the cookieless count, which is exactly what the banner tells them.
 */
function usePostHog() {
  useEffect(() => {
    if (!POSTHOG_ENABLED) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const load = async () => {
      const { default: posthog } = await import("posthog-js");
      if (cancelled) return;

      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: "2026-08-30",
        /* App Router navigations are History API changes, not page loads. */
        capture_pageview: "history_change",
        /* Page-leave events carry scroll depth — that is the scroll data. */
        capture_pageleave: true,
        autocapture: true,
        enable_heatmaps: true,
        /* No replay on this site — see POSTHOG_KEY in lib/constants. */
        disable_session_recording: true,
        person_profiles: "identified_only",
        cookieless_mode: "on_reject",
        opt_out_capturing_by_default: isGatedRegion(),
      });

      /* Bring PostHog's own record in line with the answer we hold. */
      const choice = readConsent();
      const status = posthog.get_explicit_consent_status();
      if (choice === "granted" && status !== "granted") {
        posthog.opt_in_capturing();
      } else if (choice === "denied" && status !== "denied") {
        posthog.opt_out_capturing();
      }

      unsubscribe = onConsentChange((next) => {
        if (next === "granted") posthog.opt_in_capturing();
        else posthog.opt_out_capturing();
      });

      registerPostHog(posthog);
    };

    /* Safari has no requestIdleCallback; a short timeout stands in for it. */
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(() => void load(), { timeout: 4000 })
      : window.setTimeout(() => void load(), 1500);

    return () => {
      cancelled = true;
      unsubscribe?.();
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);
}

/**
 * What GA4 does not see on its own: which internal links get clicked, which
 * FAQ questions get opened, and how far down a page people read. Enhanced
 * Measurement covers outbound clicks and page views; this covers the rest.
 *
 * Delegated listeners on the document rather than handlers on components, so
 * the zero-JS parts of the site (the FAQ is native <details>) stay zero-JS,
 * and a link added next month is tracked without anyone remembering to.
 */
function useBehaviourEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      /* Named CTAs already report themselves, with better names. */
      if (link.dataset.tracked !== undefined) return;
      const url = new URL(link.href, window.location.href);
      /* Outbound clicks are GA4 Enhanced Measurement's job. */
      if (url.origin !== window.location.origin) return;
      trackEvent(
        "internal_link_click",
        {
          link_url: `${url.pathname}${url.hash}`,
          link_text: textOf(link),
          section: sectionOf(link),
        },
        /* PostHog autocaptures every click already. */
        { posthog: false },
      );
    };

    /* `toggle` does not bubble; capture catches every <details> on the page. */
    const onToggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      const summary = details.querySelector("summary");
      /* No page param: GA4 and PostHog both attach the page URL to every
       * event on their own. */
      trackEvent("faq_open", { question: summary ? textOf(summary) : "" });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("toggle", onToggle, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("toggle", onToggle, { capture: true });
    };
  }, []);

  /* Scroll depth restarts with every page, so it is keyed on the path. */
  useEffect(() => {
    const reached = new Set<number>();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent(
            "scroll_depth",
            /* GA4's own parameter name, so it lands in the built-in
             * "Percent scrolled" dimension with no custom definition. */
            { percent_scrolled: milestone },
            /* PostHog records scroll depth on page leave. */
            { posthog: false },
          );
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);
}

/** Mounted once in the layout. Renders nothing. */
export function SiteAnalytics() {
  usePostHog();
  useBehaviourEvents();
  return null;
}
