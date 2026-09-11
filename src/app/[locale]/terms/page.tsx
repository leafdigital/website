import { APP_NAME, SITE_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

/**
 * English only, and published as a draft (the badge comes from the MDX
 * `meta.draft`). A contract should not be translated before counsel has
 * reviewed the English — five translations of an unreviewed clause are five
 * copies to redo — so every locale falls back to English and says so, the
 * same rule the document layer applies to any missing translation.
 */
const { generateMetadata, Page } = contentDocument({
  doc: "terms",
  route: "/terms",
  description: `The terms for ${APP_NAME} and the ${SITE_NAME} website: Shopify billing, published prices, approval before any change, a 30-day undo, and what we do and don't promise.`,
  breadcrumb: [],
});

export { generateMetadata };
export default Page;
