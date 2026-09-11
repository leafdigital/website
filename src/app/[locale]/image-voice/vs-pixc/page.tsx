import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-pixc",
  route: "/image-voice/vs-pixc",
  description: `Pixc writes alt text from your product data or a template, from \$8 a month. \${APP_NAME} reads each image. Their pricing, what their listing says, and where each one wins.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
