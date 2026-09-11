import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-alttextgenerator",
  route: "/image-voice/vs-alttextgenerator",
  description: `Alt Text Generator AI sells credits that never expire. What its own listing says about pricing and billing, and how that compares with \${APP_NAME}.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
