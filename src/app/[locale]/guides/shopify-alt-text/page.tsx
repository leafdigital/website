import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

/**
 * The one page here written to be useful whether or not anybody installs
 * anything. It answers the query the buying decision starts from, and it
 * carries the grading argument the two comparison pages then apply.
 */
const { generateMetadata, Page } = contentDocument({
  doc: "shopify-alt-text-guide",
  route: "/guides/shopify-alt-text",
  description: `What alt text is for, what a good one reads like, everywhere it hides in Shopify, and a ten-minute audit you can run by hand before you evaluate ${APP_NAME} or anything else.`,
  breadcrumb: [],
});

export { generateMetadata };
export default Page;
