import type { ReactNode } from "react";
import { translator } from "@/data/translations";
import { carCatalogNavigation, type SiteLocale } from "@/data/locales";
import Link from "next/link";
import { dealer } from "@/data/site";
import PrivacyNotice from "./PrivacyNotice";
import SiteFrame from "./SiteFrame";
import CompareBar from "./CompareBar";

export default function LocalizedShell({ children, hero, label, carId, locale }: { locale: SiteLocale; children: ReactNode; hero?: ReactNode; label?: string; carId?: string }) {
  const t = translator(locale);
  const chinese = locale === "zh-TW";
  return <><SiteFrame locale={locale} carId={carId}>
      <main className="pb-12">
        {hero}
        <div className={hero ? "px-[14px] pt-5 sm:px-11 sm:pt-[34px]" : "px-6 pt-6 sm:px-11 sm:pt-8"}>
          {label && <nav aria-label={chinese ? "麵包屑" : t("Breadcrumb")} className="mb-7 flex flex-wrap items-center gap-x-2 text-sm leading-6 text-[#666]">
            <Link href={chinese ? "/" : `/${locale}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{chinese ? "首頁" : t("Home")}</Link>
            <span aria-hidden="true">/</span>
            {carId && <><Link href={chinese ? "/cars" : `/${locale}/cars`} className="inline-flex min-h-11 items-center underline underline-offset-4">{carCatalogNavigation[locale].label}</Link><span aria-hidden="true">/</span></>}
            <span aria-current="page">{label}</span>
          </nav>}
          {children}
        </div>
      </main>
      <footer className="border-t border-[#ddd] px-6 py-6 text-center text-xs leading-6 text-[#666]">
        <PrivacyNotice locale={locale} />
        <p>{chinese ? `© 2026 SUZUKI 汽車顧問 ${dealer.fullName}｜凱騰鈴木北投所` : t("© 2026 SUZUKI Sales Advisor {name} · Beitou, Taipei", { name: dealer.fullName })}</p>
      </footer>
  </SiteFrame><CompareBar locale={locale} showContactActions={false} /></>;
}
