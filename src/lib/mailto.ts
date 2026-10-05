import { SUPPORT_EMAIL } from "./constants";

/**
 * The free audits are asked for by email: forward last month's 3PL invoice,
 * send the last ten POs. There is nothing to install and no form that could
 * carry a PDF, so the button opens the visitor's own mail client addressed
 * to support with the subject already written — the subject is how the inbox
 * tells one audit from the other, and it comes from the message file so it
 * arrives in the visitor's language.
 */
export function mailto(subject: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
