import CarCatalog from "@/components/CarCatalog";
import { carCatalogContent } from "@/data/car-catalog";
import { localizedRoutes } from "@/data/locales";
import { pageMetadata } from "@/data/seo";
import { requireForeignLocale } from "@/lib/site-locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const path = `/${locale}/cars`;
  return pageMetadata(path, localizedRoutes.find((route) => route.path === path)!.title, carCatalogContent[locale].description);
}

export default async function LocalizedCarsPage({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  return <CarCatalog locale={locale} />;
}
