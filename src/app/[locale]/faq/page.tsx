import Link from "next/link";
import { translator } from "@/data/translations";
import { requireForeignLocale } from "@/lib/site-locale";
import ContactLinks from "@/components/ContactLinks";
import LocalizedShell from "@/components/LocalizedShell";
import { englishFaqs } from "@/data/english";
import { localizedRoutes } from "@/data/locales";
import { cars } from "@/data/site";
import { breadcrumbSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  const path = `/${locale}/faq`;
  return pageMetadata(path, localizedRoutes.find((route) => route.path === path)!.title, t("Answers to common questions about SUZUKI prices in Taiwan, test-drive bookings in Taipei, financing enquiries, purchase documents and delivery arrangements."));
}

export default async function LocalizedPage({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  return <LocalizedShell locale={locale} label={t("Buying FAQ")}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumbSchema(`/${locale}/faq`, t("Buying FAQ")) }) }} />
    <div className="mx-auto max-w-3xl">
      <header>
        <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">{t("From first enquiry to delivery")}</p>
        <h1 className="text-3xl font-black leading-snug sm:text-4xl">{t("Your buying questions, answered")}</h1>
        <p className="mt-3 text-base leading-7 text-[#666]">{t("Start with the essentials, then confirm the details for your chosen model and circumstances with the advisor.")}</p>
        <div className="mt-5"><ContactLinks entry="content" locale={locale} /></div>
      </header>
      <div className="mt-8 space-y-3">
        {englishFaqs.map((item) => <details key={item.id} id={item.id} className="group scroll-mt-6 rounded-xl border border-[#e5e1dd] bg-white px-5 py-1">
          <summary className="cursor-pointer py-4 text-base font-bold leading-7 text-[#333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b9000e]">{t(item.question)}</summary>
          <p className="border-t border-[#eee] py-4 text-[15px] leading-8 text-[#555]">{t(item.answer)}</p>
        </details>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#b9000e]"><Link href={`/${locale}/visit/beitou`} className="underline underline-offset-4">{t("Plan a showroom visit →")}</Link><Link href={`/${locale}#contact`} className="underline underline-offset-4">{t("Send your question →")}</Link></div>
      <section className="mt-10 border-t border-[#ddd] pt-7">
        <h2 className="text-lg font-bold">{t("Explore each model")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/${locale}/cars/${car.id}`} className="flex items-center justify-between gap-2 border-b border-[#e3e0dc] py-4 text-sm font-medium no-underline hover:text-[#b9000e]">{car.name}<span aria-hidden="true">→</span></Link>)}</div>
        <Link href="/guides" hrefLang="zh-Hant" className="mt-7 inline-block text-sm font-medium text-[#333] underline underline-offset-4">{t("Read the full buying guides (Chinese) →")}</Link>
      </section>
    </div>
  </LocalizedShell>;
}
