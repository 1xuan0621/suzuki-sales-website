import { cars, dealer } from "./site";

export type SiteLocale = "zh-TW" | "en";

export const englishRoutes = [
  { path: "/en", title: `SUZUKI Cars & Test Drives in Taipei | ${dealer.fullName}`, updatedAt: "2026-10-13" },
  ...cars.map((car) => ({ path: `/en/cars/${car.id}`, title: `SUZUKI ${car.name} Taiwan Prices & Test Drives | ${dealer.fullName}`, updatedAt: "2026-10-13" })),
  { path: "/en/visit/beitou", title: `Visit SUZUKI Beitou in Taipei | ${dealer.fullName}`, updatedAt: "2026-10-13" },
  { path: "/en/faq", title: `Buying a SUZUKI in Taiwan: FAQs | ${dealer.fullName}`, updatedAt: "2026-10-13" },
];

export function localeForPath(path: string): SiteLocale {
  return path === "/en" || path.startsWith("/en/") ? "en" : "zh-TW";
}

// Only published translations are language equivalents. Guides remain Chinese.
export function languagePaths(path: string) {
  const englishPath = localeForPath(path) === "en" ? path : path === "/" ? "/en" : `/en${path}`;
  if (!englishRoutes.some((route) => route.path === englishPath)) return undefined;
  return { "zh-TW": englishPath === "/en" ? "/" : englishPath.slice(3), en: englishPath };
}
