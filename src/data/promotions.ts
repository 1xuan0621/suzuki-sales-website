export interface Promotion {
  title: string;
  summary: string;
  terms: string;
  startsAt: string;
  endsAt: string;
  periodLabel: string;
  sourceUrl: string;
}

// Explicit Taiwan offsets prevent the offer period from depending on visitor timezone.
export const septemberCampaign = {
  title: "2026 年 9 月購車禮遇",
  startsAt: "2026-09-01T00:00:00+08:00",
  endsAt: "2026-10-01T00:00:00+08:00",
  periodLabel: "2026/09/01–2026/09/30",
  sourceUrl: "https://www.taiwansuzuki.com.tw/news/606",
} as const;

export function isPromotionActive(promotion: Promotion, now: number): boolean {
  return now >= Date.parse(promotion.startsAt) && now < Date.parse(promotion.endsAt);
}
