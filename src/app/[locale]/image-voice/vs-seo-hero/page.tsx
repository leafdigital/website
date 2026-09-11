import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-seo-hero",
  route: "/image-voice/vs-seo-hero",
  description: `SEO HERO injects your SEO keywords into alt text, with 171 reviews and the Built for Shopify badge. \${APP_NAME} writes keywords only where they describe. Which one fits your store.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
