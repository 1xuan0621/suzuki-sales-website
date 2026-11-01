import Link from "next/link";
import { homeCars } from "@/data/site";
import { siteUrl } from "@/data/content";
import { carCatalogContent } from "@/data/car-catalog";
import { carCatalogNavigation, type SiteLocale } from "@/data/locales";
import { breadcrumbSchema, serializeJsonLd } from "@/data/seo";
import CarCards from "./CarCards";
import LocalizedShell from "./LocalizedShell";

export default function CarCatalog({ locale = "zh-TW" }: { locale?: SiteLocale }) {
  const chinese = locale === "zh-TW";
  const prefix = chinese ? "" : `/${locale}`;
  const path = `${prefix}/cars`;
  const label = carCatalogNavigation[locale].label;
  const content = carCatalogContent[locale];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: label, url: `${siteUrl}${path}`, description: content.description,
        mainEntity: { "@type": "ItemList", itemListElement: homeCars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}${path}/${car.id}` })) } },
      breadcrumbSchema(path, label),
    ],
  };
  return <LocalizedShell locale={locale} label={label}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <header className="mb-7">
      <h1 className="text-3xl font-black leading-tight sm:text-4xl">SUZUKI {label}</h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
        <p className="text-base leading-8 text-[#555]">{content.introduction}</p>
        {chinese && <Link href="/#loan-calculator" className="inline-flex min-h-11 items-center text-sm font-bold text-[#a9000d] underline underline-offset-4">貸款試算 →</Link>}
      </div>
    </header>
    <CarCards locale={locale} />
  </LocalizedShell>;
}
