import { APP_NAME } from "@/lib/constants";
import { contentDocument } from "@/lib/content-document";

const { generateMetadata, Page } = contentDocument({
  doc: "vs-alterator",
  route: "/image-voice/vs-alterator",
  description: `ALTerator scores alt text 0 to 100 and writes in 18 languages. \${APP_NAME} grades whether it describes the photograph. The closest comparison in the category, stated fairly.`,
  breadcrumb: [{ name: APP_NAME, route: "/image-voice" }],
});

export { generateMetadata };
export default Page;
