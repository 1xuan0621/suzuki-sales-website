import type { Metadata } from "next";
import { homeCars, dealer, type Car } from "./site";
import { siteUrl, showroom, carPages, carVersions, type Guide } from "./content";
import { languagePaths, localeForPath, siteLocales, type ForeignLocale, type SiteLocale } from "./locales";
import { englishCars, englishVersionName } from "./english";
import { translator } from "./translations";

const businessId = `${siteUrl}/#business`;
const personId = `${siteUrl}/#advisor`;
const websiteId = `${siteUrl}/#website`;
const openGraphLocales: Record<SiteLocale, string> = { "zh-TW": "zh_TW", en: "en_TW", ja: "ja_JP", ko: "ko_KR" };
const advisorTitles: Record<SiteLocale, string> = { "zh-TW": "SUZUKI 汽車顧問", en: "SUZUKI Sales Advisor", ja: "SUZUKI カーアドバイザー", ko: "SUZUKI 자동차 구매 상담" };

export function pageMetadata(path: string, title: string, description: string, image = "/og-image.png", article = false): Metadata {
  const url = new URL(path, siteUrl).toString();
  const locale = localeForPath(path);
  const paths = languagePaths(path);
  const languages = paths ? Object.fromEntries(Object.entries(paths).map(([locale, localizedPath]) => [locale, new URL(localizedPath, siteUrl).toString()])) : undefined;
  return {
    title, description, alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: { title, description, url, type: article ? "article" : "website", locale: openGraphLocales[locale], ...(paths ? { alternateLocale: siteLocales.filter((value) => value !== locale).map((value) => openGraphLocales[value]) } : {}), siteName: `${advisorTitles[locale]} ${dealer.fullName}`, images: [{ url: image, alt: title }] },
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

const localizedSchemaText = {
  en: {
    biography: "Car sales advisor since 2018, with previous experience at Mazda, and with Suzuki since 2025.",
    showroom: "SUZUKI Beitou Showroom", street: "No. 337, Section 6, Chengde Road", district: "Beitou District", city: "Taipei City", country: "Taiwan",
    service: "SUZUKI car-buying consultation in Taiwan", serviceType: "Car-buying consultation",
    description: "Based in Taipei, with car-buying consultation and delivery coordination for customers across Taiwan. Delivery locations, fees and timing are confirmed for each case. Showroom visits and test drives are arranged at Beitou by appointment.",
  },
  ja: {
    biography: "2018年から自動車販売に携わり、マツダでの経験を経て2025年にスズキへ移りました。",
    showroom: "SUZUKI北投ショールーム", street: "承德路六段337號", district: "北投区", city: "台北市", country: "台湾",
    service: "台湾でのSUZUKI購入相談", serviceType: "自動車購入相談",
    description: "台北を拠点に、台湾各地のお客様の購入相談と納車の調整を承ります。納車場所・費用・時期は個別に確認します。北投ショールームの見学・試乗は事前予約制です。",
  },
  ko: {
    biography: "2018년부터 자동차 판매 상담을 해 왔으며, 마쓰다에서 경력을 쌓은 후 2025년 스즈키에 합류했습니다.",
    showroom: "SUZUKI 베이터우 전시장", street: "承德路六段337號", district: "베이터우구", city: "타이베이시", country: "대만",
    service: "대만 SUZUKI 구매 상담", serviceType: "자동차 구매 상담",
    description: "타이베이를 중심으로 대만 전역 고객의 차량 구매 상담과 인도를 조율합니다. 인도 장소, 비용, 일정은 개별적으로 확인하며, 베이터우 전시장 방문과 시승은 사전 예약이 필요합니다.",
  },
};

export function localizedSiteSchema(locale: ForeignLocale) {
  const text = localizedSchemaText[locale];
  const url = `${siteUrl}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${url}#website`, url, name: `${advisorTitles[locale]} ${dealer.fullName}`, inLanguage: locale, publisher: { "@id": personId } },
      {
        "@type": "Person", "@id": personId, name: dealer.fullName, alternateName: dealer.name, jobTitle: advisorTitles[locale],
        url, image: `${siteUrl}/images/avatar.jpg`, telephone: `+886${dealer.phone.replace(/\D/g, "").slice(1)}`,
        description: text.biography, worksFor: { "@id": businessId },
      },
      {
        ...siteSchema["@graph"][2], name: text.showroom,
        address: { "@type": "PostalAddress", streetAddress: text.street, addressLocality: text.district, addressRegion: text.city, postalCode: "112", addressCountry: "TW" },
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#consultation`, name: text.service,
        serviceType: text.serviceType, provider: { "@id": personId }, areaServed: { "@type": "Country", name: text.country },
        description: text.description, url: `${url}#contact`,
      },
    ],
  };
}

export const englishSiteSchema = localizedSiteSchema("en");

export const homeSchema = {
  "@context": "https://schema.org", "@type": "ItemList", name: "SUZUKI 車款介紹",
  itemListElement: homeCars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}/cars/${car.id}` })),
};

export function breadcrumbSchema(path: string, name: string) {
  const locale = localeForPath(path);
  const home = { "zh-TW": "首頁", en: "Home", ja: "ホーム", ko: "홈" }[locale];
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: `${siteUrl}${locale === "zh-TW" ? "/" : `/${locale}`}` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

export function carSchema(car: Car, locale: SiteLocale = "zh-TW") {
  const localized = locale !== "zh-TW";
  const path = `${localized ? `/${locale}` : ""}/cars/${car.id}`;
  const url = `${siteUrl}${path}`;
  const translate = translator(locale);
  const priceNotes = {
    "zh-TW": "台灣建議售價；成交條件及其他費用另行確認。",
    en: "Taiwan suggested retail price. Final terms and additional fees are confirmed separately.",
    ja: "台湾のメーカー希望小売価格です。最終的な条件と追加費用は別途確認します。",
    ko: "대만 권장 소비자 가격입니다. 최종 조건과 추가 비용은 별도로 확인합니다.",
  };
  const versionSuffix = { "zh-TW": "台灣規格", en: "Taiwan specification", ja: "台湾仕様", ko: "대만 사양" }[locale];
  return {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Car", "@id": `${url}#car`, name: `SUZUKI ${car.name}`, url,
        description: localized ? translate(englishCars[car.id].description) : carPages[car.id].description, image: (car.detail.images || [car.id]).map((name) => `${siteUrl}/images/${name}.jpg`),
        brand: { "@type": "Brand", name: "SUZUKI" },
        offers: carVersions(car.id).map((version) => ({
          "@type": "Offer", name: localized ? car.id === "e-vitara" ? englishVersionName(car.id, version.name) : `${car.name} ${versionSuffix}` : version.name, price: version.priceTwd, priceCurrency: "TWD", url,
          description: priceNotes[locale], seller: { "@id": businessId },
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
