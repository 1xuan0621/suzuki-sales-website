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
export const novemberCampaign = {
  title: "2026 年 11 月購車禮遇",
  reviewedAt: "2026-10-31",
  startsAt: "2026-10-31T00:00:00+08:00",
  // The official campaign includes November 30; December 1 is the exclusive end.
  endsAt: "2026-12-01T00:00:00+08:00",
  periodLabel: "2026/10/31–2026/11/30",
  sourceUrl: "https://www.taiwansuzuki.com.tw/news/671",
} as const;

export const swiftNovemberCampaign = {
  ...novemberCampaign,
  // SWIFT says "即日起" in its October 30 announcement; loan offers explicitly start October 31.
  startsAt: "2026-10-30T00:00:00+08:00",
  periodLabel: "2026/10/30–2026/11/30",
  sourceUrl: "https://www.taiwansuzuki.com.tw/news/665",
} as const;

export function isPromotionActive(promotion: Promotion, now: number): boolean {
  return now >= Date.parse(promotion.startsAt) && now < Date.parse(promotion.endsAt);
}
