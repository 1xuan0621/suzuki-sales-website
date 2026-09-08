import type { Metadata } from "next";
import "./globals.css";
import { siteSchema, serializeJsonLd } from "@/data/seo";
import { siteUrl } from "@/data/content";
import SiteProviders from "@/components/SiteProviders";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SUZUKI 汽車顧問 張鈺漣",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};
export const viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-TW"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteSchema) }} />
    <SiteProviders>{children}</SiteProviders>
    <Analytics />
  </body></html>;
}
