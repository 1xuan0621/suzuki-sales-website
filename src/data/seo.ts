import { cars, dealer } from "./site";

const siteUrl = "https://suzuki-taipei.com";
const businessId = `${siteUrl}/#business`;

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutoDealer",
      "@id": businessId,
      name: dealer.location.split("｜")[0],
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      telephone: `+886${dealer.phone.replace(/\D/g, "").slice(1)}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "承德路六段337號",
        addressLocality: "北投區",
        addressRegion: "台北市",
        postalCode: "112",
        addressCountry: "TW",
      },
      employee: { "@type": "Person", name: dealer.name, jobTitle: "Suzuki 汽車顧問" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+886${dealer.phone.replace(/\D/g, "").slice(1)}`,
        contactType: "sales",
        availableLanguage: ["zh-TW"],
      },
      areaServed: "台北市北投區",
    },
    {
      "@type": "ItemList",
      name: "Suzuki 車款與建議起價",
      itemListElement: cars.map((car, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Car",
          name: car.name,
          description: car.description,
          image: `${siteUrl}/images/${car.id}.jpg`,
          brand: { "@type": "Brand", name: "Suzuki" },
          offers: {
            "@type": "Offer",
            price: Math.round(Number(car.price.replace(/[^0-9.]/g, "")) * 10000),
            priceCurrency: "TWD",
            url: `${siteUrl}/#cars`,
            seller: { "@id": businessId },
          },
        },
      })),
    },
  ],
};

// JSON-LD must not be able to terminate its containing script element.
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
