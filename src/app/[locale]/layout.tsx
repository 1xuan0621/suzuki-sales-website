import { foreignLocales } from "@/data/locales";
import { requireForeignLocale } from "@/lib/site-locale";

export const dynamicParams = false;
export function generateStaticParams() {
  return foreignLocales.map((locale) => ({ locale }));
}

export default async function LocalizedLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  requireForeignLocale((await params).locale);
  return children;
}
