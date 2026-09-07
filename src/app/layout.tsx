import type { Metadata } from "next";
import "./globals.css";
import { siteSchema, serializeJsonLd } from "@/data/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://suzuki-taipei.com"),
  title: "Suzuki 汽車顧問｜張鈺漣 — 凱騰鈴木北投所 新車諮詢・試乘預約",
  description:
    "Suzuki 全車系（e VITARA・SWIFT・Jimny・VITARA・S-CROSS・CARRY）車款比較、預約試乘、購車諮詢與貸款試算。凱騰鈴木北投所｜張鈺漣 0987-629-773",
  openGraph: {
    title: "Suzuki 汽車顧問｜張鈺漣",
    description:
      "Suzuki 全車系 — e VITARA・SWIFT・Jimny・VITARA・S-CROSS・CARRY 車款比較、預約試乘、購車諮詢、貸款試算。凱騰鈴木北投所。",
    url: "https://suzuki-taipei.com",
    type: "website",
    locale: "zh_TW",
    siteName: "Suzuki 汽車顧問 張鈺漣",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suzuki 汽車顧問 張鈺漣 — 凱騰鈴木北投所",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: "https://suzuki-taipei.com" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteSchema) }} />
        {children}
      </body>
    </html>
  );
}
