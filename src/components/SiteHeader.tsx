import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { dealer } from "@/data/site";
import type { SiteLocale } from "@/data/locales";

export default function SiteHeader({ carId, locale = "zh-TW" }: { carId?: string; locale?: SiteLocale }) {
  const english = locale === "en";
  const home = english ? "/en" : "/";
  return <header className="border-b border-[#ddd] bg-white px-4 py-3 sm:px-11 sm:py-5">
    <nav aria-label={english ? "Main navigation" : "主要導覽"} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 lg:flex lg:flex-wrap lg:gap-x-5">
      <Link href={home} aria-label={english ? `Home — SUZUKI Sales Advisor ${dealer.fullName}` : `回首頁 — SUZUKI 汽車顧問 ${dealer.fullName}`} className="inline-flex items-center gap-2 text-[#b9000e] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-3">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><path d="m3 11 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></svg>
        <span className="text-sm font-bold leading-5 sm:text-lg sm:leading-6"><span className="block sm:inline">SUZUKI{english ? " Sales Advisor" : ""}</span>{" "}<span className="whitespace-nowrap">{english ? "" : "汽車顧問 "}{dealer.fullName}</span></span>
      </Link>
      <div className="order-3 col-span-2 flex w-full flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[13px] font-medium leading-7 text-[#444] sm:gap-x-5 sm:text-sm lg:order-none lg:ml-auto lg:w-auto [&>a]:py-1">
        <Link href={`${home}#cars`}>{english ? "Models" : "全車款介紹"}</Link><Link href={`${english ? "/en" : ""}/visit/beitou`} aria-label={english ? "Visit & test drive in Taipei" : "台北到店試乘"}>{english ? "Visit & test drive" : <><span className="hidden sm:inline">台北</span>到店試乘</>}</Link>{!english && <Link href="/guides">購車指南</Link>}<Link href={`${english ? "/en" : ""}/faq`}>{english ? "FAQs" : "常見 QA"}</Link><Link data-entry="content" data-car-id={carId} href={carId ? `${home}?car=${carId}#contact` : `${home}#contact`}>{english ? "Contact" : "購車諮詢"}</Link>
      </div>
      <div className="order-2 justify-self-end lg:order-3"><LanguageSwitcher /></div>
    </nav>
  </header>;
}
