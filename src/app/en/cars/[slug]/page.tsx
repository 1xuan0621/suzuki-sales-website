import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactLinks from "@/components/ContactLinks";
import EnglishShell from "@/components/EnglishShell";
import { ArticleSection } from "@/components/ContentShell";
import { carPages, carVersions } from "@/data/content";
import { englishCars, englishCarDetails, englishVersionName } from "@/data/english";
import { englishRoutes } from "@/data/locales";
import { cars, dealer, eVitaraPriceSource, getCar } from "@/data/site";
import { carSchema, pageMetadata, serializeJsonLd } from "@/data/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return cars.map((car) => ({ slug: car.id })); }

export async function generateMetadata({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const path = `/en/cars/${car.id}`;
  return pageMetadata(path, englishRoutes.find((route) => route.path === path)!.title, englishCars[car.id].description, `/images/${car.id}.jpg`);
}

export default async function EnglishCarPage({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const content = englishCars[car.id];
  const detail = englishCarDetails[car.id];
  const sourceContent = carPages[car.id];
  const versions = carVersions(car.id);
  const images = car.detail.images || [car.id];

  return <EnglishShell label={`SUZUKI ${car.name}`} carId={car.id}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(carSchema(car, "en")) }} />
    <div data-car-id={car.id} data-entry="car-page" className="grid items-start gap-8 lg:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-bold tracking-wide text-[#b9000e]">{content.subtitle} · Taiwan model</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">SUZUKI {car.name}</h1>
        <p className="mt-5 text-[15px] leading-8 text-[#555]">{detail.introduction}</p>
        <p className="mb-5 mt-6 text-sm leading-7 text-[#666]">Recommended starting price<strong className="block text-3xl font-black text-[#b9000e]">NT$ {versions[0].priceTwd.toLocaleString("en-US")}</strong></p>
        <ContactLinks carId={car.id} entry="car-page" locale="en" />
        <Link data-entry="car-page" data-car-id={car.id} href={`/en?car=${car.id}#contact`} className="mt-4 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">Send a {car.name} enquiry →</Link>
        <nav aria-label="On this page" className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-[#b9000e]">
          <a href="#pricing" className="underline underline-offset-4">Prices</a>
          <a href="#specifications" className="underline underline-offset-4">Specifications</a>
          <a href="#test-drive" className="underline underline-offset-4">Test drive</a>
        </nav>
      </div>
      <div className="grid grid-cols-2 gap-3" aria-label={`${car.name} photos`}>
        {images.slice(0, 3).map((name, index) => <div key={name} className={`relative overflow-hidden rounded-xl bg-white ${index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}>
          <Image src={`/images/${name}.jpg`} alt={`SUZUKI ${car.name} ${index === 2 ? "interior" : index === 1 ? "exterior detail" : "exterior"}`} fill sizes={index === 0 ? "(min-width: 1024px) 500px, 90vw" : "(min-width: 1024px) 250px, 43vw"} className="object-contain" />
        </div>)}
      </div>
    </div>

    <ArticleSection id="pricing" title="Taiwan versions and prices">
      <div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">{car.name} recommended Taiwan prices in New Taiwan dollars</caption><thead><tr className="border-b border-[#ddd]"><th scope="col" className="py-3 pr-4">Version</th><th scope="col" className="py-3">Starting price</th></tr></thead><tbody>
        {versions.map((version) => <tr key={version.name} className="border-b border-[#eee]"><th scope="row" className="py-3 pr-4 font-medium">{englishVersionName(car.id, version.name)}</th><td className="py-3 font-bold text-[#b9000e]">NT$ {version.priceTwd.toLocaleString("en-US")}</td></tr>)}
      </tbody></table></div>
      <p>All amounts are in New Taiwan dollars (TWD). These are recommended starting prices. Confirm the agreed vehicle price, colour, options, insurance, registration and other costs in an itemised quotation. Available versions and delivery dates require confirmation.</p>
      <p>Prices last checked: <time dateTime={sourceContent.pricesReviewedAt}>{sourceContent.pricesReviewedAt}</time>.</p>
      {car.id === "e-vitara" && <a href={eVitaraPriceSource} target="_blank" rel="noopener noreferrer" className="text-[#b9000e] underline underline-offset-4">Official e VITARA launch prices (Chinese)</a>}
    </ArticleSection>

    <ArticleSection id="specifications" title="Key specifications">
      <ul className="list-disc space-y-2 pl-5">{detail.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
      <p>Fuel economy and range figures are official test results. Actual performance varies with roads, temperature, load and driving style. Specifications last checked: <time dateTime={sourceContent.specsReviewedAt}>{sourceContent.specsReviewedAt}</time>.</p>
    </ArticleSection>

    <ArticleSection title="Does it fit your everyday needs?">
      <ul className="list-disc space-y-3 pl-5">{content.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
    </ArticleSection>

    <ArticleSection id="test-drive" title="Plan a test drive in Beitou, Taipei">
      <ul className="list-disc space-y-3 pl-5">{detail.testDrive.map((item) => <li key={item}>{item}</li>)}</ul>
      <p>The vehicle, route and time slot need advance confirmation. Sending an enquiry does not confirm an appointment.</p>
      <Link href="/en/visit/beitou" className="inline-block font-bold text-[#b9000e] underline underline-offset-4">Showroom address, parking and booking →</Link>
    </ArticleSection>

    <ArticleSection title="Current offers and official sources">
      <p>Ask the advisor for current purchase offers. Campaign periods, eligibility and financing terms are confirmed individually.</p>
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-[#b9000e]"><a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Official model information (Chinese)</a><a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Official specification PDF (Chinese)</a></div>
      <p className="text-xs">Prepared by the <span lang="zh-Hant">{dealer.fullName}</span> purchase consultation website. Source content updated: <time dateTime={sourceContent.updatedAt}>{sourceContent.updatedAt}</time>.</p>
    </ArticleSection>

    <ArticleSection title="Continue exploring">
      <ul className="space-y-3 text-[#b9000e]">
        {sourceContent.relatedCars.map((id) => <li key={id}><Link href={`/en/cars/${id}`} className="underline underline-offset-4">Explore SUZUKI {getCar(id)!.name} →</Link></li>)}
        <li><Link href="/en/faq" className="underline underline-offset-4">Buying, quotations and delivery: common questions →</Link></li>
        <li><Link href="/en#cars" className="underline underline-offset-4">View all six models →</Link></li>
      </ul>
    </ArticleSection>
  </EnglishShell>;
}
