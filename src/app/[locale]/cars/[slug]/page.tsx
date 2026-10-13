import Image from "next/image";
import { translator } from "@/data/translations";
import { requireForeignLocale } from "@/lib/site-locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactLinks from "@/components/ContactLinks";
import LocalizedShell from "@/components/LocalizedShell";
import { ArticleSection } from "@/components/ContentShell";
import { carPages, carVersions } from "@/data/content";
import { englishCars, englishCarDetails } from "@/data/english";
import { getCarSpecificationMessages } from "@/data/specifications";
import { localizedRoutes } from "@/data/locales";
import { cars, dealer, eVitaraPriceSource, getCar } from "@/data/site";
import { carSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return cars.map((car) => ({ slug: car.id })); }

export async function generateMetadata({ params }: Props) {
  const { locale: requestedLocale, slug } = await params;
  const locale = requireForeignLocale(requestedLocale);
  const t = translator(locale);
  const car = getCar(slug);
  if (!car) notFound();
  const path = `/${locale}/cars/${car.id}`;
  return pageMetadata(path, localizedRoutes.find((route) => route.path === path)!.title, t(englishCars[car.id].description), `/images/${car.id}.jpg`);
}

export default async function LocalizedCarPage({ params }: Props) {
  const { locale: requestedLocale, slug } = await params;
  const locale = requireForeignLocale(requestedLocale);
  const t = translator(locale);
  const car = getCar(slug);
  if (!car) notFound();
  const content = englishCars[car.id];
  const detail = englishCarDetails[car.id];
  const sourceContent = carPages[car.id];
  const versions = carVersions(car.id);
  const images = car.detail.images || [car.id];

  return <LocalizedShell locale={locale} label={`SUZUKI ${car.name}`} carId={car.id}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(carSchema(car, locale)) }} />
    <div data-car-id={car.id} data-entry="car-page" className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">{t("{type} · Taiwan model", { type: t(content.subtitle) })}</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">{t("SUZUKI")}{" "}{car.name}</h1>
        <p className="mt-5 text-[15px] leading-8 text-[#555]">{t(detail.introduction)}</p>
        <p className="mb-5 mt-6 text-sm leading-7 text-[#666]">{t("Recommended starting price")}<strong className="block text-3xl font-black text-[#b9000e]">{t("NT$")}{" "}{versions[0].priceTwd.toLocaleString("en-US")}</strong></p>
        <ContactLinks carId={car.id} entry="car-page" locale={locale} />
        <Link data-entry="car-page" data-car-id={car.id} href={`/${locale}?car=${car.id}#contact`} className="mt-4 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">{t("Send a {model} enquiry →", { model: car.name })}</Link>
        <nav aria-label={t("On this page")} className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-[#b9000e]">
          <a href="#pricing" className="underline underline-offset-4">{t("Prices")}</a>
          <a href="#specifications" className="underline underline-offset-4">{t("Specifications")}</a>
          <a href="#test-drive" className="underline underline-offset-4">{t("Test drive")}</a>
        </nav>
      </div>
      <div className="grid grid-cols-2 gap-3" aria-label={t("{model} photos", { model: car.name })}>
        {images.slice(0, 3).map((name, index) => <div key={name} className={`relative overflow-hidden rounded-xl bg-white ${index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}>
          <Image src={`/images/${name}.jpg`} alt={t(index === 2 ? "SUZUKI {model} interior" : index === 1 ? "SUZUKI {model} exterior detail" : "SUZUKI {model} exterior", { model: car.name })} fill sizes={index === 0 ? "(min-width: 1024px) 500px, 90vw" : "(min-width: 1024px) 250px, 43vw"} className="object-contain" />
        </div>)}
      </div>
    </div>

    <ArticleSection id="pricing" title={t("Taiwan versions and prices")}>
      <div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">{car.name}{" "}{t("recommended Taiwan prices in New Taiwan dollars")}</caption><thead><tr className="border-b border-[#ddd]"><th scope="col" className="py-3 pr-4">{t("Version")}</th><th scope="col" className="py-3">{t("Starting price")}</th></tr></thead><tbody>
        {versions.map((version) => <tr key={version.name} className="border-b border-[#eee]"><th scope="row" className="py-3 pr-4 font-medium">{car.id === "e-vitara" ? version.name : `${car.name} ${t("Taiwan specification")}`}</th><td className="py-3 font-bold text-[#b9000e]">{t("NT$")}{" "}{version.priceTwd.toLocaleString("en-US")}</td></tr>)}
      </tbody></table></div>
      <p>{t("All amounts are in New Taiwan dollars (TWD). These are recommended starting prices. Confirm the agreed vehicle price, colour, options, insurance, registration and other costs in an itemised quotation. Available versions and delivery dates require confirmation.")}</p>
      <p>{t("Prices last checked:")}{" "}<time dateTime={sourceContent.pricesReviewedAt}>{sourceContent.pricesReviewedAt}</time>.</p>
      {car.id === "e-vitara" && <a href={eVitaraPriceSource} target="_blank" rel="noopener noreferrer" className="text-[#b9000e] underline underline-offset-4">{t("Official e VITARA launch prices (Chinese)")}</a>}
    </ArticleSection>

    <ArticleSection id="specifications" title={t("Key specifications")}>
      <ul className="list-disc space-y-2 pl-5">{getCarSpecificationMessages(car.id).map(({ template, values }) => <li key={template}>{t(template, values)}</li>)}</ul>
      <p>{t("Fuel economy and range figures are official test results. Actual performance varies with roads, temperature, load and driving style. Specifications last checked:")}{" "}<time dateTime={sourceContent.specsReviewedAt}>{sourceContent.specsReviewedAt}</time>.</p>
    </ArticleSection>

    <ArticleSection title={t("Does it fit your everyday needs?")}>
      <ul className="list-disc space-y-3 pl-5">{content.considerations.map((item) => <li key={item}>{t(item)}</li>)}</ul>
    </ArticleSection>

    <ArticleSection id="test-drive" title={t("Plan a test drive in Beitou, Taipei")}>
      <ul className="list-disc space-y-3 pl-5">{detail.testDrive.map((item) => <li key={item}>{t(item)}</li>)}</ul>
      <p>{t("The vehicle, route and time slot need advance confirmation. Sending an enquiry does not confirm an appointment.")}</p>
      <Link href={`/${locale}/visit/beitou`} className="inline-block font-bold text-[#b9000e] underline underline-offset-4">{t("Showroom address, parking and booking →")}</Link>
    </ArticleSection>

    <ArticleSection title={t("Current offers and official sources")}>
      <p>{t("Ask the advisor for current purchase offers. Campaign periods, eligibility and financing terms are confirmed individually.")}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-[#b9000e]"><a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t("Official model information (Chinese)")}</a><a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t("Official specification PDF (Chinese)")}</a></div>
      <p className="text-xs">{t("Prepared by the")}{" "}<span lang="zh-Hant">{dealer.fullName}</span>{" "}{t("purchase consultation website. Source content updated:")}{" "}<time dateTime={sourceContent.updatedAt}>{sourceContent.updatedAt}</time>.</p>
    </ArticleSection>

    <ArticleSection title={t("Continue exploring")}>
      <ul className="space-y-3 text-[#b9000e]">
        {sourceContent.relatedCars.map((id) => <li key={id}><Link href={`/${locale}/cars/${id}`} className="underline underline-offset-4">{t("Explore SUZUKI {model} →", { model: getCar(id)!.name })}</Link></li>)}
        <li><Link href={`/${locale}/faq`} className="underline underline-offset-4">{t("Buying, quotations and delivery: common questions →")}</Link></li>
        <li><Link href={`/${locale}#cars`} className="underline underline-offset-4">{t("View all six models →")}</Link></li>
      </ul>
    </ArticleSection>
  </LocalizedShell>;
}
