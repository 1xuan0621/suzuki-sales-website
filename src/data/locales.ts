import { cars, dealer } from "./site";

export const foreignLocales = ["en", "ja", "ko"] as const;
export type ForeignLocale = typeof foreignLocales[number];
export type SiteLocale = "zh-TW" | ForeignLocale;
export const siteLocales = ["zh-TW", ...foreignLocales] as const;

export const languageOptions = [
  { locale: "zh-TW", name: "繁體中文", badge: "中" },
  { locale: "en", name: "English", badge: "EN" },
  { locale: "ja", name: "日本語", badge: "JP" },
  { locale: "ko", name: "한국어", badge: "KR" },
] as const;

const routeTitles = {
  en: {
    home: "SUZUKI Cars & Test Drives in Taipei",
    car: (name: string) => `SUZUKI ${name} Taiwan Prices & Test Drives`,
    visit: "Visit SUZUKI Beitou in Taipei",
    faq: "Buying a SUZUKI in Taiwan: FAQs",
  },
  ja: {
    home: "台湾・台北でSUZUKIを選ぶ・試乗する",
    car: (name: string) => `SUZUKI ${name} 台湾の価格・試乗案内`,
    visit: "台北 SUZUKI北投ショールームのご案内",
    faq: "台湾でSUZUKIを購入する際のよくある質問",
  },
  ko: {
    home: "대만 타이베이 SUZUKI 차량 안내 및 시승",
    car: (name: string) => `SUZUKI ${name} 대만 가격 및 시승 안내`,
    visit: "타이베이 SUZUKI 베이터우 전시장 방문 안내",
    faq: "대만 SUZUKI 구매 자주 묻는 질문",
  },
};

export const localizedRoutes = foreignLocales.flatMap((locale) => {
  const titles = routeTitles[locale];
  return [
    { path: `/${locale}`, title: titles.home },
    ...cars.map((car) => ({ path: `/${locale}/cars/${car.id}`, title: titles.car(car.name) })),
    { path: `/${locale}/visit/beitou`, title: titles.visit },
    { path: `/${locale}/faq`, title: titles.faq },
  ].map((route) => ({ ...route, title: `${route.title} | ${dealer.fullName}`, updatedAt: "2026-10-13" }));
});

export const englishRoutes = localizedRoutes.filter((route) => localeForPath(route.path) === "en");

export function localeForPath(path: string): SiteLocale {
  return foreignLocales.find((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)) || "zh-TW";
}

// Only published translations are language equivalents. Guides remain Chinese.
export function languagePaths(path: string): Record<SiteLocale, string> | undefined {
  const locale = localeForPath(path);
  const chinesePath = locale === "zh-TW" ? path : path.slice(locale.length + 1) || "/";
  const suffix = chinesePath === "/" ? "" : chinesePath;
  const englishPath = `/en${suffix}`;
  if (!englishRoutes.some((route) => route.path === englishPath)) return undefined;
  return { "zh-TW": chinesePath, en: englishPath, ja: `/ja${suffix}`, ko: `/ko${suffix}` };
}
