import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "best-shopify-alt-text-apps",
  route: "/guides/best-shopify-alt-text-apps",
  description: `Eleven Shopify alt text apps, plus our own ${APP_NAME}, compared from their App Store listings — ratings, prices, how each writes alt text, and which store each one suits. Including where they beat ours.`,
  breadcrumb: [],
});

export { generateMetadata };
export default Page;
