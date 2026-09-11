import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "image-voice-alternatives",
  route: "/image-voice/alternatives",
  description: `Leaving AltText.ai, AltKing, Pixc or another alt text app? Alternatives grouped by the reason you are switching — credits, templates, languages, no audit — including when ${APP_NAME} is not the answer.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
