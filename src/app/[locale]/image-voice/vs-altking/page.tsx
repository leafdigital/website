import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-altking",
  route: "/image-voice/vs-altking",
  description: `AltKing builds alt text from variables, free. ${APP_NAME} reads each image and writes a sentence for it. Which one your store needs depends on whether your photographs carry more than your product titles.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
