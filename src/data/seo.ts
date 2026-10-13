import type { Metadata } from "next";
import { homeCars, dealer, type Car } from "./site";
import { siteUrl, showroom, carPages, carVersions, type Guide } from "./content";
import { languagePaths, localeForPath, type SiteLocale } from "./locales";
import { englishCars, englishVersionName } from "./english";

const businessId = `${siteUrl}/#business`;
const personId = `${siteUrl}/#advisor`;
const websiteId = `${siteUrl}/#website`;

export function pageMetadata(path: string, title: string, description: string, image = "/og-image.png", article = false): Metadata {
  const url = new URL(path, siteUrl).toString();
  const english = localeForPath(path) === "en";
  const paths = languagePaths(path);
  const languages = paths ? Object.fromEntries(Object.entries(paths).map(([locale, localizedPath]) => [locale, new URL(localizedPath, siteUrl).toString()])) : undefined;
  return {
    title, description, alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title, description, url, type: article ? "article" : "website", locale: english ? "en_TW" : "zh_TW", ...(paths ? { alternateLocale: english ? ["zh_TW"] : ["en_TW"] } : {}), siteName: english ? `SUZUKI Sales Advisor ${dealer.fullName}` : `SUZUKI 汽車顧問 ${dealer.fullName}`, images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": websiteId, url: `${siteUrl}/`, name: "SUZUKI 汽車顧問 張鈺漣", inLanguage: "zh-TW", publisher: { "@id": personId } },
    {
      "@type": "Person", "@id": personId, name: dealer.fullName, alternateName: dealer.name, jobTitle: "SUZUKI 汽車顧問",
      url: `${siteUrl}/`, image: `${siteUrl}/images/avatar.jpg`,
      telephone: `+886${dealer.phone.replace(/\D/g, "").slice(1)}`,
      description: dealer.biography,
      worksFor: { "@id": businessId },
    },
    {
      "@type": "AutoDealer", "@id": businessId, name: showroom.name, url: showroom.sourceUrl,
      telephone: "+886228211128",
      address: { "@type": "PostalAddress", streetAddress: "承德路六段337號", addressLocality: "北投區", addressRegion: "台北市", postalCode: "112", addressCountry: "TW" },
      employee: { "@id": personId },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "21:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
      ],
    },
    {
      "@type": "Service", "@id": `${siteUrl}/#consultation`, name: "SUZUKI 全台購車諮詢",
      serviceType: "購車諮詢", provider: { "@id": personId },
      areaServed: { "@type": "Country", name: "台灣" },
      description: "以台北為主要服務地區，提供全台購車諮詢與跨縣市購車、交車協助；交車地點、費用與時程依個案確認。到店賞車及試乘於北投所預約。",
      url: `${siteUrl}/#contact`,
    },
  ],
};

export const englishSiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${siteUrl}/en#website`, url: `${siteUrl}/en`, name: `SUZUKI Sales Advisor ${dealer.fullName}`, inLanguage: "en", publisher: { "@id": personId } },
    {
      "@type": "Person", "@id": personId, name: dealer.fullName, alternateName: dealer.name, jobTitle: "SUZUKI Sales Advisor",
      url: `${siteUrl}/en`, image: `${siteUrl}/images/avatar.jpg`, telephone: `+886${dealer.phone.replace(/\D/g, "").slice(1)}`,
      description: "Car sales advisor since 2018, with previous experience at Mazda, and with Suzuki since 2025.", worksFor: { "@id": businessId },
    },
    {
      ...siteSchema["@graph"][2],
      name: "SUZUKI Beitou Showroom",
      address: { "@type": "PostalAddress", streetAddress: "No. 337, Section 6, Chengde Road", addressLocality: "Beitou District", addressRegion: "Taipei City", postalCode: "112", addressCountry: "TW" },
    },
    {
      "@type": "Service", "@id": `${siteUrl}/#consultation`, name: "SUZUKI car-buying consultation in Taiwan",
      serviceType: "Car-buying consultation", provider: { "@id": personId }, areaServed: { "@type": "Country", name: "Taiwan" },
      description: "Based in Taipei, with car-buying consultation and delivery coordination for customers across Taiwan. Delivery locations, fees and timing are confirmed for each case. Showroom visits and test drives are arranged at Beitou by appointment.",
      url: `${siteUrl}/en#contact`,
    },
  ],
};

export const homeSchema = {
  "@context": "https://schema.org", "@type": "ItemList", name: "SUZUKI 車款介紹",
  itemListElement: homeCars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}/cars/${car.id}` })),
};

export function breadcrumbSchema(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: localeForPath(path) === "en" ? "Home" : "首頁", item: `${siteUrl}${localeForPath(path) === "en" ? "/en" : "/"}` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

export function carSchema(car: Car, locale: SiteLocale = "zh-TW") {
  const english = locale === "en";
  const path = `${english ? "/en" : ""}/cars/${car.id}`;
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Car", "@id": `${url}#car`, name: `SUZUKI ${car.name}`, url,
        description: english ? englishCars[car.id].description : carPages[car.id].description, image: (car.detail.images || [car.id]).map((name) => `${siteUrl}/images/${name}.jpg`),
        brand: { "@type": "Brand", name: "SUZUKI" },
        offers: carVersions(car.id).map((version) => ({
          "@type": "Offer", name: english ? englishVersionName(car.id, version.name) : version.name, price: version.priceTwd, priceCurrency: "TWD", url,
          description: english ? "Taiwan suggested retail price. Final terms and additional fees are confirmed separately." : "台灣建議售價；成交條件及其他費用另行確認。", seller: { "@id": businessId },
        })),
      }, breadcrumbSchema(path, `SUZUKI ${car.name}`),
    ],
  };
}

export function guideSchema(guide: Guide) {
  const path = `/guides/${guide.slug}`;
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Article", "@id": `${url}#article`, headline: guide.title, description: guide.description,
        url, mainEntityOfPage: url, author: { "@id": personId }, publisher: { "@id": personId },
        dateModified: guide.updatedAt, inLanguage: "zh-TW", image: `${siteUrl}/og-image.png`,
      }, {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "購車指南", item: `${siteUrl}/guides` },
          { "@type": "ListItem", position: 3, name: guide.audience, item: url },
        ],
      },
    ],
  };
}

// JSON-LD must not be able to terminate its containing script element.
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
