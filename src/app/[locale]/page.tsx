import { Suspense } from "react";
import { translator } from "@/data/translations";
import { requireForeignLocale } from "@/lib/site-locale";
import Image from "next/image";
import Link from "next/link";
import LocalizedShell from "@/components/LocalizedShell";
import LocalizedCarCards from "@/components/LocalizedCarCards";
import LocalizedConsultation from "@/components/LocalizedConsultation";
import ConsultationPrefill from "@/components/ConsultationPrefill";
import { ContactIcon } from "@/components/ContactLinks";
import { homeCars, dealer } from "@/data/site";
import { carVersions } from "@/data/content";
import { englishCars, englishFaqs } from "@/data/english";
import { pageMetadata, serializeJsonLd } from "@/data/seo";
import { siteUrl } from "@/data/content";
import { localizedRoutes } from "@/data/locales";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  const path = `/${locale}`;
  return pageMetadata(path, localizedRoutes.find((route) => route.path === path)!.title, t("Explore Suzuki models and Taiwan prices. Contact advisor 張鈺漣 for buying advice, quotes and a confirmed showroom or test-drive appointment in Beitou, Taipei."));
}

export default async function LocalizedPage({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  const models = homeCars.map((car) => ({ id: car.id, name: car.name, subtitle: t(englishCars[car.id].subtitle), description: t(englishCars[car.id].description), highlights: englishCars[car.id].highlights.map((text) => t(text)), priceTwd: Math.min(...carVersions(car.id).map((version) => version.priceTwd)) }));
  const contactCard = "flex min-w-0 items-center gap-3 rounded-2xl border border-[#e7e7e7] border-l-5 bg-white p-4 shadow-[0_6px_18px_rgba(20,20,20,0.05)]";
  const contactAction = "mt-2 inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";
  return <LocalizedShell locale={locale} hero={
    <section data-entry="hero" className="relative overflow-hidden px-11 pb-[54px] pt-[34px] text-white max-sm:px-[22px] max-sm:pb-10 max-sm:pt-6" style={{ background: "radial-gradient(circle at 85% 30%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(135deg, #e60012, #bd0010 70%, #9d000b)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-12 -left-[120px] h-[110px] w-[420px] skew-x-[-24deg] bg-white/8 max-sm:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[88px] -right-[100px] h-[160px] w-[360px] skew-x-[-24deg] bg-white/8 max-sm:hidden" />
      <div className="relative flex items-center gap-10 max-md:flex-col max-md:gap-6 max-md:text-center">
        <Image src="/images/avatar.jpg" alt={dealer.fullName} width={180} height={180} priority className="h-[140px] w-[140px] shrink-0 rounded-full border-4 border-white/70 object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,0.15)] max-sm:h-[120px] max-sm:w-[120px]" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/85">{t("SUZUKI · TAIPEI, TAIWAN")}</p>
          <h1 className="mt-3 whitespace-nowrap text-[clamp(23px,3.9vw,44px)] font-black leading-tight tracking-tight">{t("Your Suzuki in Taiwan.")}</h1>
          <p className="mt-[18px] inline-block border-b-2 border-white/80 pb-3 text-base font-bold sm:text-lg">{t("Your car advisor,")}{" "}<span lang="zh-TW">{dealer.fullName}</span></p>
          <p className="mt-3 max-w-[650px] text-[15px] leading-7 text-white max-md:mx-auto">{t("I'm")}{" "}<span lang="zh-TW">{dealer.name}</span>{t(", a car sales advisor since 2018. I worked at Mazda before joining Suzuki in 2025.")}</p>
          <p className="mt-2 max-w-[650px] text-sm leading-7 text-white/95 max-md:mx-auto">{t("Based in Taipei, serving buyers across Taiwan. Visits and test drives in Beitou are by appointment; delivery is arranged individually.")}</p>
          <a href="#cars" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#b9000e] no-underline hover:bg-red-50">{t("Explore the models ↓")}</a>
        </div>
      </div>
    </section>
  }>
    <Suspense fallback={null}><ConsultationPrefill /></Suspense>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@type": "ItemList", name: t("Suzuki models in Taiwan"), itemListElement: homeCars.map((car, index) => ({ "@type": "ListItem", position: index + 1, name: `SUZUKI ${car.name}`, url: `${siteUrl}/${locale}/cars/${car.id}` })) }) }} />
    <section data-entry="hero" aria-label={t("Contact and appointments")} className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      <article className={`${contactCard} border-l-[#e60012]`}>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e60012] text-white"><ContactIcon type="phone" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold leading-5 text-[#666]">{t("Phone enquiries")}</p>
          <h2 className="my-1 whitespace-nowrap text-[22px] font-semibold leading-7 text-[#e60012]">{dealer.phone}</h2>
          <a href={`tel:${dealer.phone.replace(/\D/g, "")}`} className={`${contactAction} border-[#e60012] text-[#e60012] hover:bg-[#e60012] hover:text-white`}>{t("Call now")}</a>
        </div>
      </article>
      <article className={`${contactCard} border-l-[#06C755]`}>
        <div aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#06C755] text-[11px] font-extrabold text-white">{t("LINE")}</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold leading-5 text-[#666]">{t("Chat on LINE")}</p>
          <h2 className="my-1 whitespace-nowrap text-[22px] font-semibold leading-7 text-[#06C755]">@{dealer.line}</h2>
          <a href={`https://line.me/R/ti/p/~${dealer.line}`} target="_blank" rel="noopener noreferrer" className={`${contactAction} border-[#06C755] text-[#06C755] hover:bg-[#06C755] hover:text-white`}>{t("Add on LINE")}</a>
        </div>
      </article>
      <article className={`${contactCard} border-l-[#e60012] sm:col-span-2 lg:col-span-1`}>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e60012] text-white"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold leading-5 text-[#666]">{t("Visit by appointment")}</p>
          <h2 className="my-1 text-lg font-semibold leading-7 text-[#e60012]">{t("Beitou showroom")}</h2>
          <div className="flex flex-wrap items-center gap-x-3">
            <Link href={`/${locale}/visit/beitou`} className={`${contactAction} border-[#e60012] text-[#e60012] hover:bg-[#e60012] hover:text-white`}>{t("Plan a visit")}</Link>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.location.replace(/｜.*/, ""))}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-10 items-center text-sm font-bold text-[#b9000e] underline underline-offset-4">{t("Map ↗")}</a>
          </div>
        </div>
      </article>
    </section>
    <section id="cars" className="mt-5 scroll-mt-6 border-t border-[#ddd] pt-[34px] sm:mt-[34px]" aria-labelledby="models-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-[#b9000e]">{t("THE TAIWAN LINEUP")}</p>
      <h2 id="models-heading" className="mt-2 text-[23px] font-bold leading-tight sm:text-[28px]">{t("Find your Suzuki")}</h2>
      <p className="mb-6 mt-3 text-sm leading-7 text-[#666]">{t("Start with your daily journeys, passengers, parking and cargo needs.")}</p>
      <LocalizedCarCards models={models} locale={locale} />
    </section>
    <section className="mt-10 rounded-2xl border border-[#e6d9d5] bg-[#fff8f4] p-6 sm:p-8" aria-labelledby="visit-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-[#b9000e]">{t("FROM SHORTLIST TO SHOWROOM")}</p>
      <h2 id="visit-heading" className="mt-2 text-2xl font-bold">{t("Plan your visit to Beitou")}</h2>
      <ol className="mt-5 grid list-inside list-decimal gap-5 text-sm leading-7 text-[#555] sm:grid-cols-3">
        <li><strong className="text-[#333]">{t("Share your plans.")}</strong><p>{t("Tell me the models you are considering, your preferred date and who will come with you.")}</p></li>
        <li><strong className="text-[#333]">{t("Wait for confirmation.")}</strong><p>{t("We’ll confirm the available car, appointment time and any test-drive requirements.")}</p></li>
        <li><strong className="text-[#333]">{t("Try what matters.")}</strong><p>{t("Check seating, luggage space and everyday use, then discuss a detailed quote.")}</p></li>
      </ol>
      <Link href={`/${locale}/visit/beitou`} className="mt-5 inline-block py-2 text-sm font-bold text-[#b9000e] underline underline-offset-4">{t("Address, hours & visit information →")}</Link>
    </section>
    <LocalizedConsultation locale={locale} />
    <section id="faq" aria-labelledby="questions-heading" className="mt-10 scroll-mt-6">
      <h2 id="questions-heading" className="text-2xl font-bold">{t("Before you get in touch")}</h2>
      <div className="mt-5 space-y-3">{englishFaqs.slice(0, 3).map((faq) => <details key={faq.id} className="rounded-xl border border-[#ddd] bg-white p-5"><summary className="cursor-pointer font-bold leading-7">{t(faq.question)}</summary><p className="mt-3 text-sm leading-7 text-[#555]">{t(faq.answer)}</p></details>)}</div>
      <Link href={`/${locale}/faq`} className="mt-5 inline-block py-2 text-sm font-bold text-[#b9000e] underline underline-offset-4">{t("More buying & booking questions →")}</Link>
    </section>
  </LocalizedShell>;
}
