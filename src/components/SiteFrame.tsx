import type { ReactNode } from "react";
import type { SiteLocale } from "@/data/locales";
import SiteHeader from "./SiteHeader";

export default function SiteFrame({ children, locale = "zh-TW", carId }: { children: ReactNode; locale?: SiteLocale; carId?: string }) {
  return <div lang={locale} className="min-h-screen bg-[#2f2f2f] py-7 text-[#252525] antialiased max-sm:py-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans TC", Arial, sans-serif', wordBreak: locale === "ko" ? "keep-all" : undefined, overflowWrap: "anywhere" }}>
    <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-[0_26px_80px_rgba(0,0,0,0.28)] max-sm:rounded-none max-sm:shadow-none">
      <SiteHeader locale={locale} carId={carId} />
      {children}
    </div>
  </div>;
}
