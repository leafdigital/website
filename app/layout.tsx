import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Leaf Digital — Agentic Commerce for Shopify & DTC Brands",
    template: "%s — Leaf Digital",
  },
  description:
    "AI agents are becoming the shoppers. Leaf Digital builds the apps and services that make your catalog legible to machines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <header className="border-b border-neutral-200">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Leaf <span className="text-green-600">Digital</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <Link href="/apps/alt-text" className="hover:text-neutral-900">Apps</Link>
              <Link href="/support" className="hover:text-neutral-900">Support</Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-neutral-200">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
            <p>© 2026 Leaf Digital. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-neutral-900">Privacy</Link>
              <Link href="/support" className="hover:text-neutral-900">Support</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
