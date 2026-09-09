import type { Metadata } from "next";
import { cars, dealer, type Car } from "./site";
import { siteUrl, showroom, carPages, carVersions, type Guide } from "./content";

const businessId = `${siteUrl}/#business`;
const personId = `${siteUrl}/#advisor`;
const websiteId = `${siteUrl}/#website`;

export function pageMetadata(path: string, title: string, description: string, image = "/og-image.png", article = false): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, type: article ? "article" : "website", locale: "zh_TW", siteName: "SUZUKI 汽車顧問 張鈺漣", images: [{ url: image, alt: title }] },
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

export const homeSchema = {
  "@context": "https://schema.org", "@type": "ItemList", name: "SUZUKI 車款介紹",
  itemListElement: cars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}/cars/${car.id}` })),
};

export function breadcrumbSchema(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

export function carSchema(car: Car) {
  const url = `${siteUrl}/cars/${car.id}`;
  return {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Car", "@id": `${url}#car`, name: `SUZUKI ${car.name}`, url,
        description: carPages[car.id].description, image: (car.detail.images || [car.id]).map((name) => `${siteUrl}/images/${name}.jpg`),
        brand: { "@type": "Brand", name: "SUZUKI" },
        offers: carVersions(car.id).map((version) => ({
          "@type": "Offer", name: version.name, price: version.priceTwd, priceCurrency: "TWD", url,
          description: "台灣建議售價；成交條件及其他費用另行確認。", seller: { "@id": businessId },
        })),
      }, breadcrumbSchema(`/cars/${car.id}`, `SUZUKI ${car.name}`),
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
