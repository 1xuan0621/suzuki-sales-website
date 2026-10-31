import Image from "next/image";
import { translator } from "@/data/translations";
import { requireForeignLocale } from "@/lib/site-locale";
import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import LocalizedShell from "@/components/LocalizedShell";
import ReferenceDetails from "@/components/ReferenceDetails";
import { ArticleSection } from "@/components/ContentShell";
import { showroom } from "@/data/content";
import { localizedRoutes } from "@/data/locales";
import { cars, dealer } from "@/data/site";
import { breadcrumbSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  const path = `/${locale}/visit/beitou`;
  return pageMetadata(path, localizedRoutes.find((route) => route.path === path)!.title, t("Plan a SUZUKI showroom visit or test drive in Beitou, Taipei. Find the address, opening hours, parking information and how to confirm your appointment."));
}

export default async function LocalizedPage({ params }: Props) {
  const locale = requireForeignLocale((await params).locale);
  const t = translator(locale);
  return <LocalizedShell locale={locale} label={t("Visit Beitou")}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", ...breadcrumbSchema(`/${locale}/visit/beitou`, t("Visit Beitou")) }) }} />
    <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">{t("Visit Beitou, Taipei")}</p>
    <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">{t("See your next SUZUKI in Beitou")}</h1>
    <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#555]">{t("Meet the advisor at the Beitou showroom for car viewing and test drives. You can also discuss your purchase by LINE from anywhere in Taiwan.")}</p>
    <div className="mt-6"><ContactLinks entry="visit" locale={locale} /></div>
    <div className="grid gap-x-6 lg:grid-cols-2">
      <ArticleSection title={t("SUZUKI Beitou showroom")}>
        <p lang="zh-Hant" className="font-bold">{showroom.name}</p>
        <address className="not-italic">{t("No. 337, Section 6, Chengde Road, Beitou District, Taipei City, Taiwan")}<span lang="zh-Hant" className="mt-1 block text-sm">{showroom.address}</span></address>
        <p><strong>{t("Showroom phone:")}</strong> <a data-entry="visit" href={showroom.phoneHref} className="underline underline-offset-4">{showroom.phone}</a></p>
        <div><p className="font-bold">{t("Opening hours (Taiwan time)")}</p><p>{t("Monday–Friday: 08:30–21:00")}</p><p>{t("Saturday–Sunday: 09:00–21:00")}</p></div>
        <a data-entry="visit" href={showroom.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl bg-[#e60012] px-5 py-2 font-bold text-white no-underline">{t("Open directions")}</a>
      </ArticleSection>
      <ArticleSection title={t("Contact your sales advisor")}>
        <p><strong>{t("Advisor:")}</strong> <span lang="zh-Hant">{dealer.fullName}</span></p>
        <p><strong>{t("Mobile:")}</strong> <a data-entry="visit" href={`tel:${dealer.phone.replace(/\D/g, "")}`} className="underline underline-offset-4">{dealer.phone}</a></p>
        <p><strong>{t("LINE ID:")}</strong> {dealer.line}</p>
        <Link href={`/${locale}#contact`} className="font-bold text-[#b9000e] underline underline-offset-4">{t("Send a visit enquiry →")}</Link>
      </ArticleSection>
    </div>
    <ArticleSection title={t("Getting here and parking")}>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#f5f5f5]">
          <Image src="/images/beitou-exterior-entrance.jpg" alt={t("Front entrance of the SUZUKI Beitou showroom, with the street number 337 beside the entrance")} width={1200} height={675} sizes="(min-width: 1180px) 500px, (min-width: 1024px) 45vw, 90vw" className="h-auto w-full" />
          <figcaption className="px-4 py-3 text-xs leading-6 text-[#666]">{t("Look for the")}{" "}<span lang="zh-Hant">凱騰鈴木北投</span>{" "}{t("sign on arrival.")}</figcaption>
        </figure>
        <div className="space-y-4">
          <p>{t("Open directions for a route from your location by car, public transport or on foot.")}</p>
          <p>{t("Parking is free. Ask staff for a space on arrival, and mention any mobility assistance needs when booking.")}</p>
        </div>
      </div>
    </ArticleSection>
    <ArticleSection title={t("How to arrange your visit")}>
      <ol className="list-decimal space-y-3 pl-5">
        <li>{t("Send your preferred model, date and number of visitors.")}</li>
        <li>{t("Agree the available vehicle, time and documents to bring with the advisor before travelling.")}</li>
        <li>{t("Try the seats and luggage space, take the arranged test drive, then discuss your preferred version and quotation.")}</li>
      </ol>
    </ArticleSection>
    <ArticleSection title={t("Explore the models before visiting")}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <Link key={car.id} href={`/${locale}/cars/${car.id}`} className="rounded-xl border border-[#ddd] px-4 py-3 font-bold text-[#b9000e] no-underline hover:bg-red-50">{t("SUZUKI")}{" "}{car.name} →</Link>)}</div>
      <Link href={`/${locale}/faq`} className="inline-block text-[#b9000e] underline underline-offset-4">{t("Questions about purchasing and delivery →")}</Link>
    </ArticleSection>
    <ReferenceDetails label={t("Reference materials")} className="mt-6">
      <a href={showroom.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t("Official Taiwan Suzuki showroom information (Chinese)")}</a>
    </ReferenceDetails>
  </LocalizedShell>;
}
