"use client";

import { useEffect, useState } from "react";
import { isPromotionActive, type Promotion } from "@/data/promotions";

export default function PromotionNotice({ promotion }: { promotion?: Promotion }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      if (!promotion) return;
      const nextBoundary = [promotion.startsAt, promotion.endsAt]
        .map(Date.parse)
        .find((boundary) => boundary > current);
      if (nextBoundary !== undefined) {
        timer = setTimeout(refresh, Math.min(nextBoundary - current, 2_147_483_647));
      }
    };
    refresh();
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [promotion]);

  // Do not prerender a time-sensitive offer into a potentially stale static page.
  if (now === null) return null;

  if (!promotion || !isPromotionActive(promotion, now)) {
    return <p className="mb-5 text-sm text-[#666]">最新購車方案與試乘安排，歡迎透過 LINE 洽詢。</p>;
  }

  return (
    <div className="mb-5 p-4 rounded-[10px] bg-[#fff5f5] border border-[#f3cccc] text-sm leading-relaxed">
      <p className="font-extrabold text-[#b9000e]">{promotion.title}</p>
      <p className="mt-1 text-[#666]">活動期間：{promotion.periodLabel}</p>
      <p className="mt-2 font-bold text-[#333]">{promotion.summary}</p>
      <p className="mt-2 text-xs text-[#666]">{promotion.terms}</p>
      <a className="inline-block mt-3 text-[#b9000e] underline underline-offset-4" href={promotion.sourceUrl} target="_blank" rel="noopener noreferrer">
        查看官方活動與完整條件
      </a>
    </div>
  );
}
