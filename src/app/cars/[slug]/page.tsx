import FaqList from "@/components/FaqList";
import { carFaqs } from "@/data/faq";
import ContactLinks from "@/components/ContactLinks";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, getCar, eVitaraPriceSource } from "@/data/site";
import { carPages, carTitle, carVersions } from "@/data/content";
import { getGuide } from "@/data/guides";
import { carSchema, pageMetadata, serializeJsonLd } from "@/data/seo";
import ContentShell, { ArticleSection } from "@/components/ContentShell";
import CarPageGallery from "@/components/CarPageGallery";
import PromotionNotice from "@/components/PromotionNotice";
import CarUsageSection from "@/components/CarUsageSection";
import { carUsage } from "@/data/car-usage";
import OwnerExperienceSection from "@/components/OwnerExperienceSection";
import { ownerExperiences } from "@/data/owner-experiences";
import ReferenceDetails from "@/components/ReferenceDetails";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return cars.map((car) => ({ slug: car.id })); }
export async function generateMetadata({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  return pageMetadata(`/cars/${car.id}`, carTitle(car.id), carPages[car.id].description, `/images/${car.id}.jpg`);
}

export default async function CarPage({ params }: Props) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const content = carPages[car.id];
  const focus = content.buyingFocus;
  const usage = carUsage[car.id];
  const ownerExperience = ownerExperiences[car.id];
  const priorityFaqs = focus?.faqIds.map((id) => carFaqs[car.id].find((item) => item.id === id)!) || [];
  const remainingFaqs = carFaqs[car.id].filter((item) => !focus?.faqIds.includes(item.id));
  const relatedGuides = content.relatedGuides.map(getGuide).filter((guide) => guide !== undefined);
  return <ContentShell label={`SUZUKI ${car.name}`} carId={car.id}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(carSchema(car)) }} />
    <div data-car-id={car.id} data-entry="car-page" className="grid items-start gap-6 lg:grid-cols-2 lg:gap-x-10">
      <div className="min-w-0">
        <p className="mb-3 text-sm font-bold tracking-widest text-[#b9000e]">{car.subtitle} · 台灣車款資訊</p>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">SUZUKI {car.name}{focus && <span className="mt-3 block text-xl leading-8 tracking-normal text-[#555] sm:text-2xl">{focus.heading}</span>}</h1>
        {!focus && <p className="mt-3 text-xl font-bold text-[#555]">{car.detail.tagline}</p>}
        <p className="mt-5 text-[15px] leading-8 text-[#555]">{content.introduction}</p>
        {car.detail.colors && car.detail.colors.length > 0 && <section aria-label="車色參考" className="mt-4">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-6 text-[#555]">
            <strong className="text-[#333]">車色參考</strong>
            {car.detail.colors.map((color) => <span key={color.name} className="inline-flex items-center gap-1.5 whitespace-nowrap">
              {color.name}
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 rounded-[3px] border border-black/20"
                style={{ background: color.secondaryHex ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)` : color.hex }}
              />
            </span>)}
          </p>
        </section>}
      </div>
      <div className="min-w-0">
        <CarPageGallery car={car} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e1dd] bg-white p-5 sm:px-6 lg:col-span-2">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-[#666]">建議售價 <strong className="text-3xl font-black text-[#b9000e]">{car.price}</strong></p>
        <ContactLinks carId={car.id} entry="car-page" />
      </div>
      <nav aria-label="車款選購重點" className="flex flex-wrap gap-2 border-t border-[#ddd] pt-5 text-sm font-bold text-[#9b000b] lg:col-span-2 [&_a]:rounded-lg [&_a]:bg-white [&_a]:px-3 [&_a]:py-2 [&_a]:ring-1 [&_a]:ring-[#e5e1dd] [&_a:hover]:bg-[#fff1f1] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2">
        <a href="#pricing">價格與報價</a>
        {focus && <a href={`#${focus.faqIds[0]}`}>{car.id === "jimny" ? "2026 改款差異" : "輕油電與選購重點"}</a>}
        <a href="#specifications">主要規格</a>
        <a href="#test-drive">試乘準備</a>
        {usage && <a href="#daily-use">{usage.label}</a>}
        {ownerExperience && <a href="#owner-experience">車主心得</a>}
        <a href="#faq">車型 QA</a>
        <Link href="/visit/beitou">北投交通與預約</Link>
      </nav>
    </div>
    <ArticleSection id="pricing" title={focus ? `${car.name} 台灣價格與報價確認` : "台灣版本與建議售價"}>
      <div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">{car.name} 台灣版本價格</caption><thead><tr className="border-b border-[#ddd]"><th scope="col" className="py-3 pr-4">版本</th><th scope="col" className="py-3">建議售價</th></tr></thead><tbody>
        {carVersions(car.id).map((version) => <tr key={version.name} className="border-b border-[#eee]"><th scope="row" className="py-3 pr-4 font-medium">{version.name}</th><td className="py-3 font-bold text-[#b9000e]">NT$ {version.priceTwd.toLocaleString("en-US")} 起</td></tr>)}
      </tbody></table></div>
      {focus && <p>{focus.priceNote}</p>}
    </ArticleSection>
    {focus && <section aria-labelledby="buying-focus-heading" className="mt-8">
      <h2 id="buying-focus-heading" className="mb-4 text-xl font-bold sm:text-2xl">{focus.faqHeading}</h2>
      <FaqList items={priorityFaqs} defaultOpenId={focus.faqIds[0]} />
    </section>}
    {usage && <CarUsageSection content={usage} />}
    <ArticleSection id="specifications" title="主要規格">
      <ul className="list-disc space-y-2 pl-5">{car.detail.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
    </ArticleSection>
    <ArticleSection title="適合誰？選車時看這些">
      <p>{car.detail.whoFor}。</p>
      <ul className="list-disc space-y-2 pl-5">{content.considerations.map((text) => <li key={text}>{text}</li>)}</ul>
    </ArticleSection>
    {ownerExperience && <OwnerExperienceSection content={ownerExperience} />}
    <ArticleSection id="test-drive" title={focus ? `${car.name} 台北北投賞車與試乘怎麼預約？` : "到店賞車與試乘觀察清單"}>
      <ul className="list-disc space-y-2 pl-5">{content.testDrive.map((text) => <li key={text}>{text}</li>)}</ul>
    </ArticleSection>
    <ArticleSection title="購車方案">
      <PromotionNotice promotion={car.detail.promotion} />
      <ReferenceDetails>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[#9b000b]">
          <a href={car.detail.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方車款介紹</a>
          <a href={car.detail.specUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方規配表（PDF）</a>
          {car.id === "e-vitara" && <a href={eVitaraPriceSource} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">e VITARA 官方上市價格</a>}
          {focus && <a href="https://www.taiwansuzuki.com.tw/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">官方建議售價</a>}
        </div>
      </ReferenceDetails>
    </ArticleSection>
    <section id="faq" aria-labelledby="car-faq-heading" className="mt-8 scroll-mt-6 rounded-2xl border border-[#e5e1dd] bg-white p-6 sm:p-8">
      <p className="text-sm font-bold text-[#b9000e]">車型常見 QA</p>
      <h2 id="car-faq-heading" className="mb-2 mt-2 text-2xl font-bold">{car.name}，你可能想問</h2>
      <FaqList items={remainingFaqs} />
      <div className="mt-4 border-t border-[#eee] pt-5"><p className="text-sm leading-7 text-[#666]">還有訂金、保險、交車或保養的問題？</p><Link href="/faq" className="mt-2 inline-block text-sm font-bold text-[#b9000e] underline underline-offset-4">查看通用購車 QA →</Link></div>
    </section>
    <ArticleSection title="延伸閱讀與相關車款">
      <ul className="space-y-3 text-[#b9000e]">
        {relatedGuides.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`} className="underline underline-offset-4">{guide.title}</Link></li>)}
        <li><Link href="/guides" className="underline underline-offset-4">購車指南：從預算到交車</Link></li>
        {content.relatedCars.map((id) => <li key={id}><Link href={`/cars/${id}`} className="underline underline-offset-4">了解 SUZUKI {getCar(id)!.name}</Link></li>)}
        <li><Link href="/visit/beitou" className="underline underline-offset-4">北投所交通與預約資訊</Link></li>
      </ul>
    </ArticleSection>
  </ContentShell>;
}
