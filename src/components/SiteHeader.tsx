import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dealer } from "@/data/site";
import type { SiteLocale } from "@/data/locales";
import { translator } from "@/data/translations";

export default function SiteHeader({ carId, locale = "zh-TW" }: { carId?: string; locale?: SiteLocale }) {
  const foreign = locale !== "zh-TW";
  const t = translator(locale);
  const prefix = foreign ? `/${locale}` : "";
  const home = prefix || "/";
  const navigationLabel = { "zh-TW": "主要導覽", en: "Main navigation", ja: "メインナビゲーション", ko: "주 메뉴" }[locale];
  return <header className="border-b border-[#ddd] bg-white px-4 py-3 sm:px-11 sm:py-5">
    <nav aria-label={navigationLabel} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 lg:flex lg:flex-wrap lg:gap-x-5">
      <Link href={home} aria-label={foreign ? `${t("Home")} — ${t("SUZUKI Sales Advisor")} ${dealer.fullName}` : `回首頁 — SUZUKI 汽車顧問 ${dealer.fullName}`} className="inline-flex items-center gap-2 text-[#b9000e] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-3">
        <span className="text-sm font-bold leading-5 sm:text-lg sm:leading-6"><span className="block sm:inline">{foreign ? t("SUZUKI Sales Advisor") : "SUZUKI"}</span>{" "}<span className="whitespace-nowrap">{foreign ? "" : "汽車顧問 "}{dealer.fullName}</span></span>
      </Link>
      <div className="order-3 col-span-2 flex w-full flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[13px] font-medium leading-7 text-[#444] sm:gap-x-5 sm:text-sm lg:order-none lg:ml-auto lg:w-auto [&>a]:py-1">
        <Link href={`${home}#cars`}>{foreign ? t("Models") : "全車款介紹"}</Link><Link href={`${prefix}/visit/beitou`} aria-label={foreign ? t("Visit & test drive") : "台北到店試乘"}>{foreign ? t("Visit & test drive") : <><span className="hidden sm:inline">台北</span>到店試乘</>}</Link>{!foreign && <Link href="/guides">購車指南</Link>}<Link href={`${prefix}/faq`}>{foreign ? t("FAQs") : "常見 QA"}</Link><Link data-entry="content" data-car-id={carId} href={carId ? `${home}?car=${carId}#contact` : `${home}#contact`}>{foreign ? t("Contact") : "購車諮詢"}</Link>
      </div>
      <div className="order-2 justify-self-end lg:order-3"><LanguageSwitcher /></div>
    </nav>
  </header>;
}
