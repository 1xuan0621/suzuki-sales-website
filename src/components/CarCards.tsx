import Image from "next/image";
import Link from "next/link";
import { homeCars } from "@/data/site";
import { carVersions } from "@/data/content";
import { englishCars, englishCarDetails } from "@/data/english";
import type { SiteLocale } from "@/data/locales";
import { translator } from "@/data/translations";
import { getCarPreviewSpecifications } from "@/data/specifications";
import CarCompareButton from "./CarCompareButton";
import CarPreview from "./CarPreview";
import "./car-shapes.css";

export default function CarCards({ compact = false, locale = "zh-TW" }: { compact?: boolean; locale?: SiteLocale }) {
  const chinese = locale === "zh-TW";
  if (compact && chinese) {
    return <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {homeCars.map((car) => <CarPreview key={car.id} car={car} specifications={getCarPreviewSpecifications(car.id)} className="group flex min-w-0 cursor-pointer flex-col items-center rounded-[18px] border border-[#e7e7e7] bg-white px-3 py-5 text-center shadow-[0_12px_30px_rgba(20,20,20,0.08)] transition-shadow hover:shadow-[0_18px_36px_rgba(20,20,20,0.12)] sm:px-5 sm:py-[26px]">
        <div aria-hidden="true" className="flex h-24 w-full items-center justify-center sm:h-32">
          <div className="flex h-32 w-56 shrink-0 scale-[0.58] items-center justify-center sm:scale-100">
            <div className={`car-shape ${car.id} shrink-0`} />
          </div>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-6 text-[#202020] sm:text-[26px] sm:leading-8">{car.name}</h3>
        <p className="mt-1 text-[13px] font-bold leading-5 text-[#666]">{car.subtitle}</p>
        <p className="mt-1 text-sm leading-6 text-[#555]">{car.description}</p>
        <p className="mt-auto pt-4 text-lg font-extrabold leading-7 text-[#e60012]">{car.price}</p>
      </CarPreview>)}
    </div>;
  }
  const prefix = chinese ? "" : `/${locale}`;
  const t = translator(locale);
  const Heading = compact ? "h3" : "h2";

  return <div className={compact ? "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
    {homeCars.map((car) => {
      const cardClassName = `group rounded-2xl text-left text-[#252525] no-underline transition-colors hover:bg-[#fff8f6] ${compact ? "flex flex-1 flex-col" : "grid grid-cols-[104px_minmax(0,1fr)] items-start gap-3 p-4 sm:block sm:p-0"}`;
      const cardContent = <>
        <div className={`overflow-hidden bg-[#eee] ${compact ? "rounded-t-2xl" : "rounded-lg sm:rounded-none sm:rounded-t-2xl"}`}>
          <Image src={`/images/${car.id}.jpg`} alt={`SUZUKI ${car.name}`} width={800} height={450} sizes={compact ? "(min-width: 1180px) 348px, (min-width: 1024px) 30vw, 48vw" : "(min-width: 1180px) 348px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 104px"} className={`w-full object-cover ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`} />
        </div>
        <div className={`flex min-w-0 flex-1 flex-col ${compact ? "p-3 sm:p-4" : "sm:p-5"}`}>
          <Heading className={compact ? "text-lg font-bold leading-6 sm:text-2xl sm:leading-8" : "text-xl font-bold leading-7 sm:text-2xl sm:leading-8"}>{car.name}</Heading>
          <p className="mt-1 text-[13px] leading-6 text-[#555]">{chinese ? car.subtitle : t(englishCars[car.id].subtitle)}</p>
          <div className={`mt-auto flex items-end justify-between gap-2 ${compact ? "pt-3" : "pt-4"}`}>
            <p className="text-[#a9000d]">
              {!compact && <span className="mb-1 block text-xs leading-5 text-[#555]">{chinese ? "建議售價" : t("Suggested price from")}</span>}
              <strong className={compact ? "text-base font-extrabold sm:text-lg" : "text-xl font-extrabold"}>{chinese ? car.price : `NT$ ${Math.min(...carVersions(car.id).map((version) => version.priceTwd)).toLocaleString("en-US")}`}</strong>
              {!chinese && compact && <span className="block text-xs leading-5 text-[#555]">{t("Suggested price from")}</span>}
            </p>
            <span aria-hidden="true" className="shrink-0 text-xl text-[#a9000d] transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </>;
      return <article key={car.id} id={compact ? undefined : car.id} data-car-id={car.id} className="flex min-w-0 scroll-mt-6 flex-col rounded-2xl border border-[#ddd] bg-white">
      <Link href={`${prefix}/cars/${car.id}`} aria-label={chinese ? `查看 ${car.name} 完整介紹` : t("Explore {model}", { model: car.name })} className={cardClassName}>{cardContent}</Link>
      {!compact && <>
        <p className="flex-1 px-4 pb-4 text-sm leading-7 text-[#555] sm:px-5">{chinese ? car.detail.whoFor : t(englishCarDetails[car.id].introduction)}</p>
        <div className="px-4 pb-4 sm:px-5 sm:pb-5"><CarCompareButton car={car} locale={locale} /></div>
      </>}
    </article>;
    })}
  </div>;
}
