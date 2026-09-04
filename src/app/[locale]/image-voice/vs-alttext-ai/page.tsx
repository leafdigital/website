import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-alttext-ai",
  route: "/image-voice/vs-alttext-ai",
  description: `AltText.ai meters your catalogue by the image and counts covered fields. ${APP_NAME} sweeps the backlog up front and grades what is already there. An honest comparison, with their pricing and their reviews.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
