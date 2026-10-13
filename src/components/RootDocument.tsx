"use client";

import { usePathname } from "next/navigation";
import { localeForPath, type SiteLocale } from "@/data/locales";

export default function RootDocument({ children, schemas }: { children: React.ReactNode; schemas: Record<SiteLocale, string> }) {
  const locale = localeForPath(usePathname());
  return <html lang={locale}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemas[locale] }} />
    {children}
  </body></html>;
}
