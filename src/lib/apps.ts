import type { AppCardData } from "@/components/app-card";
import { APP_NAME } from "./constants";

/**
 * The portfolio, one place. The two lab cards deliberately promise no dates
 * (homepage story AC).
 */
export const apps: AppCardData[] = [
  {
    name: APP_NAME,
    status: "live",
    description:
      "Sees every product image the way a shopper — or a shopping agent — does, and writes the alt text your catalog is missing. Scan free, taste the quality on 25 of your own images, stay for the auto-pilot.",
    href: "/apps/alt-text",
    cta: "See the app",
  },
  {
    name: "Catalog Readiness",
    status: "lab",
    description:
      "A readiness score for the agentic shelf: how legible are your products to the AI assistants your customers already ask? Attribute by attribute, with the fixes ranked.",
  },
  {
    name: "AI Answer Accuracy",
    status: "lab",
    description:
      "When ChatGPT talks about your products, is it right? Watch what the machines actually say about your store, and catch the answers that cost you sales.",
  },
];
