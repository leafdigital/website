import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SITE_INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Belt to robots.ts's braces: pre-cutover deploys must not be indexed.
  robots: SITE_INDEXABLE ? undefined : { index: false, follow: false },
  title: {
    default: `${SITE_NAME} — the work your store needs done, handled correctly`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Leaf makes Shopify apps that take on the jobs nobody on your team owns — under written laws about what they'll never touch, with an undo on everything they do.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
