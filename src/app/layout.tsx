import type { Metadata } from "next";
import "./globals.css";
import { siteSchema, englishSiteSchema, serializeJsonLd } from "@/data/seo";
import { contentRoutes, siteUrl } from "@/data/content";
import { englishRoutes } from "@/data/locales";
import SiteProviders from "@/components/SiteProviders";
import Analytics from "@/components/Analytics";
import RootDocument from "@/components/RootDocument";

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
  return <RootDocument schemas={{ "zh-TW": serializeJsonLd(siteSchema), en: serializeJsonLd(englishSiteSchema) }}>
    <SiteProviders>{children}</SiteProviders>
    <Analytics content={{ siteUrl, routes: [...contentRoutes, ...englishRoutes].map(({ path, title }) => ({ path, title })) }} />
  </RootDocument>;
}
