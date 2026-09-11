import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

/**
 * The security answers that were scattered across /support, the /image-voice
 * FAQ and the privacy policy, in one place a buyer can be sent. Every claim
 * is sourced from the app's compliance file, which is itself pinned to code
 * and tests — including the parts erasure does not reach yet. English only,
 * like the comparisons: the query it answers is typed in English.
 */
const { generateMetadata, Page } = contentDocument({
  doc: "security",
  route: "/security",
  description: `${APP_NAME} security: the six Shopify scopes it requests and why, what it can change, encryption and store isolation, AI processing, retention, and the erasure webhooks — including what erasure does not reach yet.`,
  breadcrumb: [],
});

export { generateMetadata };
export default Page;
