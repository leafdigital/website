import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-storeseo",
  route: "/image-voice/vs-storeseo",
  description: `StoreSEO is a full SEO suite with alt text as one feature among many. \${APP_NAME} does one job. When you need the suite, when you need the specialist, and when you want both.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
